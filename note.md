# 20分セッション: 「Prettier はどうやって PHP コードを整形しているのか」

> prettier と plugin-php を題材に、コードフォーマッターの仕組みを知る
>
> 参考: **"A Prettier Printer"** (Wadler, 2003)
> https://homepages.inf.ed.ac.uk/wadler/papers/prettier/prettier.pdf

---

## 1. Prettier とは (2分)

- **コードフォーマッター**: コードの「意味」を変えずに「見た目」を統一するツール
- 設定項目が極端に少ない — 「議論の余地をなくす」が設計思想
- `@prettier/plugin-php` で PHP にも対応

```php
// before
function  greet( $name,   $greeting="Hello" ){
echo   $greeting . ", " .  $name;
}

// after
function greet($name, $greeting = "Hello")
{
    echo $greeting . ", " . $name;
}
```

---

## 2. コードフォーマッターの仕組み (6分)

### 2-1. パース: コードを AST に変換する

- フォーマッターが最初にやることは **パース** (構文解析)
- コードを **AST (Abstract Syntax Tree: 抽象構文木)** に変換する

```php
function greet($name) {
    echo $name;
}
```
↓ パース
```
program
└── function (name: "greet")
    ├── arguments: [parameter (name: "name")]
    └── body: block
        └── echo
            └── variable (name: "name")
```

- AST にはスペースや改行の情報がない — 「抽象」とはそういう意味
- スペースが 1 つでも 10 でも、この木は同じになる
- **元の見た目が消えるから、ゼロから作り直すしかない → 誰が書いても同じ結果になる**

### 2-3. AST ノードの持つ情報

**kind** — 「これは何?」
- `"function"`, `"variable"`, `"if"`, `"array"` ... (100 種類以上)
- フォーマッターはこの値で出力方法を決める

**loc** — 「元のコードのどこにあった?」
```
loc: {
  start: { line: 3, column: 4, offset: 28 },
  end:   { line: 5, column: 1, offset: 67 },
}
```
- `offset`: ファイル先頭から何バイト目か

「見た目を全部捨てるのに、なぜ位置情報が必要?」
1. **コメントの配置**: コメントは AST の木に入らない → offset で最寄りのノードに紐付ける
2. **空行の保持**: 元コードの空行だけは残す → ノード間の offset 差で判定

### 2-4. kind ごとにプロパティが違う

```
$foo                → kind: "variable", name: "foo"  ($ は含まない)
function f($x) {}   → kind: "function", name, arguments, body
if ($x) {} else {}  → kind: "if", test, body, alternate
[$a, $b]            → kind: "array", items, shortForm ([] か array() か)
```

### 2-5. 変換パイプラインと役割分担

```
① テキスト ──parse──→ ② AST ──print──→ ③ 中間表現 (Doc) ──layout──→ ④ テキスト
           plugin-php        plugin-php              prettier コア
```

- ①→②: テキストを木構造に。**スペースや改行が全て消える**
- ②→③: 各ノードを「どう出力するか」に変換。**改行するかはまだ決めない**
- ③→④: 行幅に基づいて**改行位置を確定**

prettier 本体が担うのは ③→④ だけ。
①→② と ②→③ は plugin-php の仕事。JS / CSS / HTML もそれぞれプラグインが担当。

なぜ ②→④ に直接行かない?
- 「1行に収まるか」は中身の長さ次第、ネストすると内外が影響し合う
- 「何を出力するか」と「改行するか」を分離するために ③ を挟む

---

## 3. Prettier のプラグインシステム (3分)

### 3-1. プラグインが渡す 5 つの情報

prettier 本体は言語を知らない。プラグインが自己紹介として 5 つの情報を渡す:

| 渡すもの | 役割 |
|---------|------|
| **languages** | `.php` ファイルを担当します |
| **parsers** | テキスト → AST (①→②) |
| **printers** | AST → Doc (②→③) |
| **options** | PHP 固有の設定項目 |
| **defaultOptions** | tabWidth: 4 (コアの 2 を上書き) |

### 3-2. 名前で繋がる

prettier とプラグインは「名前」で間接的に繋がっている:

```
".php"  ──→  "php"  ──→  "php"
 拡張子      パーサー名    AST 形式名 (astFormat)
```

1. 拡張子 `.php` → languages から パーサー名 `"php"` を得る
2. パーサー名 `"php"` → `parsers["php"]` を取得
3. パーサーの `astFormat: "php"` → `printers["php"]` を取得

名前で間接的に繋ぐことで、パーサーやプリンターを独立して差し替え可能

### 3-3. 設定の優先順位

```
弱い ──────────────────────────────→ 強い

prettier デフォルト → plugin 上書き → ユーザー設定
(tabWidth: 2)     (tabWidth: 4)   (.prettierrc)
```

---

## 4. 行幅に応じたフォーマット (3分)

### 4-1. 同じコードでも行幅で出力が変わる

```php
// 短い → 1行
[$a, $b, $c]

// 長い → 改行+インデント+末尾カンマ
[
    $longName1,
    $longName2,
    $longName3,
]
```

printer (plugin-php) は「改行してもいい場所」を宣言するだけ。
実際に改行するかどうかは prettier コアが行幅に基づいて決める。

### 4-2. ネストした構造は独立して判断される

```php
[
    [1, 2, 3],     ← 内側は短いので 1 行
    [4, 5, 6],
]
```

外側が改行しても、内側が行幅に収まれば内側は 1 行のまま。
構造ごとに独立して判断されるから、ちょうどいい改行位置が自動的に決まる。

### 4-3. 色々な構文で同じように動く

```php
foo($a, $b)                    // 短い → 1行
foo(
    $longArg1,
    $longArg2,                 // 長い → 改行
)

if ($x && $y) {                // 短い → 1行
if (
    $longCondition1
    && $longCondition2         // 長い → 条件部分だけ改行
) {

$obj->a()->b()->c()            // 短い → 1行
$obj
    ->a()
    ->b()
    ->c()                      // 長い → 各呼び出しで改行
```

配列も関数引数もメソッドチェーンも、全て同じ仕組みで動いている

---

## 5. PHP ならではのフォーマット事情 (3分)

### 5-1. 波括弧の位置

```php
// PSR-12 (per-cs) — PHP コミュニティの慣習
function greet($name)
{
    echo $name;
}

// 1tbs — JS でよく見るスタイル
function greet($name) {
    echo $name;
}
```

`braceStyle` オプションで切り替え。行幅ではなく設定で確定。

### 5-2. trailing comma と phpVersion

```php
foo($a, $b)        // 1行 → カンマなし

foo(
    $a,
    $b,            // 改行 → 末尾カンマ
)
```

trailing comma を使える場所は PHP バージョンで異なる:
- 配列: 最初から
- 関数引数: 7.3+
- closure use: 8.0+

PHP 8.4 では `new` 式の括弧も不要に:
```php
(new Foo())->method()   // 8.3 以前
new Foo()->method()     // 8.4+
```

バージョンの決め方:
```
"auto" → composer.json の require.php を読む → なければ最新版 (8.4)
```

### 5-3. コメント配置

- コメントは AST の木に入らない → offset で最寄りのノードに紐付け
- leading / trailing / dangling の 3 種類
- prettier コアが大まかに判定 → plugin-php が PHP 固有ケースを補正
- PHP 固有の特殊ケースが 30 以上 — フォーマッターで最も泥臭い部分

---

## 6. まとめ (2分)

```
prettier test.php
  │
  │  ".php" → plugin-php に決定
  │  設定マージ: prettier → plugin-php → ユーザー
  │  phpVersion: composer.json → 自動解決
  │
  ▼  テキスト → AST (スペース・改行が消える)         ← plugin-php
  ▼  AST → Doc (改行してもいい場所を宣言)           ← plugin-php
  ▼  Doc → テキスト (行幅で改行位置を確定)           ← prettier コア
  │
  ▼  整形済み PHP コード
```

- コードフォーマッターは「全部捨ててゼロから作り直す」
- コードは AST に変換される。`kind` が種類、`loc` が元の位置
- prettier は Doc を挟んで「出力内容」と「改行判断」を分離
- 言語対応はプラグインが担う。名前で間接的に繋がる
- PHP 固有の事情 (波括弧・trailing comma・バージョン) をプラグインが吸収

---

## 時間配分

| # | セクション | 時間 |
|---|-----------|------|
| 1 | Prettier とは | 2分 |
| 2 | コードフォーマッターの仕組み (AST・loc・パイプライン・役割分担) | 6分 |
| 3 | プラグインシステム (名前解決・設定マージ) | 3分 |
| 4 | 行幅に応じたフォーマット | 3分 |
| 5 | PHP ならではの事情 | 4分 |
| 6 | まとめ | 2分 |
| | **合計** | **20分** |

