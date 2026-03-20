---
theme: default
title: prettier/plugin-phpの仕組みと、PHP code format
info: "PHPerKaigi 2026 / fujitani sora / 登壇資料"
class: text-center
colorSchema: dark
drawings:
  persist: false
seoMeta:
  ogImage: https://sorafujitani.github.io/phperkaigi2026-prettier-fmt/og-image.png
  twitterCard: summary_large_image
  twitterImage: https://sorafujitani.github.io/phperkaigi2026-prettier-fmt/og-image.png
---

<CoverSlide
  title="prettier/plugin-phpの仕組みと、<br>PHP code format"
  event="PHPerKaigi 2026 / Track C"
  author="fujitani sora"
/>

---

<div style="padding: 0 8%">

<div class="grid grid-cols-[1fr_1fr] items-start gap-8">
  <div>
    <p class="text-2xl font-bold mb-4" style="color: oklch(0.7 0.15 215)">fujitani sora</p>
    <div class="flex flex-col gap-3 text-lg font-semibold">
      <div class="flex items-center gap-2">
        <carbon-building class="text-lg" />
        <span>toridori Inc. engineer</span>
      </div>
      <div class="flex items-center gap-2">
        <carbon-events class="text-lg" />
        <span>TSKaigiの運営 / 技育CAMP 公式メンター</span>
      </div>
      <div class="flex items-center gap-2">
        <carbon-code class="text-lg" />
        <span>Maintenar: rfmt, Yamada UI ...</span>
      </div>
      <div class="flex items-center gap-2">
        <carbon-logo-x class="text-lg" />
        <a href="https://x.com/_fs0414">@_fs0414</a>
      </div>
      <div class="flex items-center gap-2">
        <carbon-globe class="text-lg" />
        <a href="https://sorafujitani.me/">sorafujitani.me</a>
      </div>
    </div>
  </div>
  <div class="flex justify-center" style="margin-top: -1.5rem">
    <CenteredImage
      src="https://raw.githubusercontent.com/fs0414/imgs/main/fs0414_dot_image.png"
      alt="プロフィール画像"
      width="280px"
    />
  </div>
</div>

<div class="mt-6 text-sm text-gray-100">
  最近のTips<br />
  神保町の喫茶「さぼうる」を溺愛している
</div>

</div>

---

```php
function
greet( $name,   $greeting="
Hello             " ){
                                echo   $greeting . ", " .  $name;
}
```

<div v-click>

```php
function greet($name, $greeting = "Hello")
{
    echo $greeting . ", " . $name;
}
```

</div>

---

# Table of Contents

1. Prettier
2. Prettier plugin system
3. PHP x Prettier

---

# Prettier

- **Code Formatter**: コードの「意味」を変えずに「見た目」を統一するツール
- https://github.com/prettier
- 🐘 `@prettier/plugin-php` で PHP にも対応
- https://github.com/prettier/plugin-php

---

# 変換パイプライン

```
テキスト → AST → Doc (中間表現) → テキスト
```
<br />

1. **Parse**: Input: source code, Output: AST
2. **PrintAstToDoc**: Input: AST, Output: DocIR
3. **PrintDocToString**: Input: DocIR, Output: Foamatterd String

---

# Parse

- フォーマッターはまず **Parse** (構文解析)を実行する
- コードに存在したスペースや改行の情報は消える

<TwoColumnLayout>
  <template #left>

```php
/**
 * phpdoc
 */
function greet($name) {
    echo $name;
}
```

  </template>
  <template #right>

```
program
└── function (name: "greet")
    ├── arguments: [parameter (name: "name")]
    └── body: block
        └── echo
            └── variable (name: "name")
```

```json
{
  kind: "function",
  loc: { start: {...}, end: {...} },
  name: "greet",
  arguments: [...],
  body: { kind: "block", ... }
}
```

  </template>
</TwoColumnLayout>

---

# kind

- prettier がノード固有のswitch文で処理

```
"echo"      → echo $x
"function"  → function f() {}    
"if"        → if () {} else {}   
"call"      → foo($a)
"class"     → class Foo {}       
"array"     → [$a, $b]
"variable"  → $name
"foreach"   → foreach () {}      
"assign"    → $a = 1
```

---

# loc

ノードが元コードのどこにあったかを示す位置情報

```php
echo $name;    // offset: 0〜11
```

```json
{ kind: "echo", loc: { start: { offset: 0 }, end: { offset: 11 } } }
```

---

# loc の用途②: 空行の保持

元コードにあった空行だけは残す → ノード間の offset 差で判定

```php
$a = 1;
                    // ← 空行がある
$b = 2;
```

```json
{
  kind: "expressionstatement",            // $a = 1;
  loc: { start: { offset: 0 },
         end:   { offset: 7 } } 
}

{ 
  kind: "expressionstatement",            // $b = 2;
  loc: { start: { offset: 9 },
         end:   { offset: 16 } } 
}
```

---

# loc の用途①: コメントの配置

コメントは AST の木に入らない → offset で最寄りのノードに紐付ける

```php
function greet($name)     // offset: 0〜21
{
    // コメントだよ       // ← AST に含まれない
    echo $name;            // offset: 51〜62
}
```

```json
{
  kind: "commentline", 
  value: "// コメントだよ",
  loc: { start: { offset: 28 }, 
    end: { offset: 42 } } 
}
```


---

# 同じ配列でも出力が2パターンある

```php
// パターン A
[$a, $b, $c]

// パターン B
[
    $a,
    $b,
    $c,
]
```

<span class="text-6xl">🤔</span>

---

# printWidth

- prettier の最も基本的な設定。デフォルトは **80 文字**
- この幅に収まるかどうかで、1行にするか改行するかが決まる

```
printWidth: 80
|<─────────────────── 80文字 ───────────────────>|
```

---

# 中身が短ければ1行、長ければ改行

```php
[$a, $b, $c]                              // 短い → 1行

[$longVariableName1, $longVariableName2]   // 長い → 改行
→ [
      $longVariableName1,
      $longVariableName2,
  ]
```

printWidth (行幅) に収まるかどうかで判断される

---

# ただし、中身の長さだけでは決まらない

- **外側が改行するかは内側の長さ次第。内側の結果は外側の判断次第。**

→ 出力内容を決める段階では、改行の判断を保留する必要がある


```php
$x = [$a, $b, $c];                          // 残り幅が十分 → 1行

$userNotificationPreferences = [$a, $b, $c]; // 残り幅が少ない → 改行するかも
```

---

# 解決策: Doc IR で判断を遅延させる

AST → テキストの間に **Doc IR** を挟み、2段階に分離する

- **printAstToDoc**: 「何を出力するか」と「改行してもいい場所」を宣言
- **printDocToString**: 行幅に基づいて改行するかを確定

---

# printDocToString の判断

- `group` — 1行に収めようとする単位。収まらなければ中の softline を改行に展開
- `softline` — 改行してもいい場所。1行なら消える
- `indent` — 改行したらインデントする

```php
[$a, $b]  →  group([ "[", indent([softline, "$a, $b"]), softline, "]" ])

// printWidth: 80 → group が収まる → softline は消える
[$a, $b]

// printWidth: 10 → 収まらない → softline が改行に展開
[
    $a,
    $b,
]
```

同じ Doc IR でも行幅で結果が変わる:


---

# 色々な構文で同じ仕組み

```php
group([ "User::where(", indent([softline, ...args]), softline, ")" ])

//   → 収まる → flat
$users = User::where('active', true)->orderBy('name')->get();

//   → 収まらない → softline が改行に展開
$users = User::where('active', true)
    ->whereNotNull('email_verified_at')
    ->orderBy('created_at', 'desc')
    ->paginate(20);
```

関数呼び出し・配列・メソッドチェーン、全て同じ group + softline で動いている

---

# Doc IR

```
plugin-php   → Doc IR ─┐
plugin-js    → Doc IR ─┤
plugin-css   → Doc IR ─┼─→ printDocToString() ─→ テキスト
plugin-html  → Doc IR ─┤
plugin-yaml  → Doc IR ─┘
```

全ての言語プラグインが Doc IR を出力するので、printDocToString の実装は1つだけでいい

---

# A prettier printer

- Philip Wadler, *"A prettier printer"* (2003)
- [`9b4535e`](https://github.com/prettier/prettier/commit/9b4535e9f) "Merge in forked recast printer that uses Wadler's algorithm"

---
layout: center
---

# <span class="gradient-heading">Prettier plugin system</span>

---

# prettier plugin の 5 つのインターフェース

- **languages** — どの拡張子を担当するか
- **parsers** — テキスト → AST
- **printers** — AST → Doc
- **options** — 言語固有の設定項目
- **defaultOptions** — デフォルト値の上書き

---

# pluginの解決

prettier は言語を知らない。拡張子からプラグインを探す:

```
.php → plugin-php
```

---

# パーサーの解決

`languages` が拡張子とパーサー名を紐付け、`parsers` から実装を取得:

```
".php" → languages.parsers: ["php"] → parsers["php"] (内部で php-parser を呼ぶ)
```

```json
  "dependencies": {
    "php-parser": "^3.2.5"
  },

```
<!-- --- -->
<!---->
<!-- # プリンターの解決 -->
<!---->
<!-- パーサーが `astFormat` を宣言し、対応するプリンターが選ばれる: -->
<!---->
<!-- ``` -->
<!-- parsers["php"].astFormat: "php" → printers["php"] -->
<!-- ``` -->

---

# オプションの解決

```
prettier デフォルト → plugin 上書き → ユーザー設定
(tabWidth: 2)        (tabWidth: 4)   (.prettierrc)
```

`options` と `defaultOptions` でデフォルト値を上書きできる

---
layout: center
---

# <span class="gradient-heading">PHP x Prettier</span>

---

# PER Coding Style

[PER Coding Style 3.0 §4.4](https://www.php-fig.org/per/coding-style/#44-methods-and-functions): 開き波括弧は次の行に置く

```php
// per-cs (デフォルト) — PHP の慣習
function greet($name)
{
    echo $name;
}

// 1tbs — JS の慣習
function greet($name) {
    echo $name;
}
```

> "Prettier has a few options because of history. But we won't add more of them."
> — docs/option-philosophy.md

---

# PER に従わない部分もある

[PER Coding Style 3.0 §5.1](https://www.php-fig.org/per/coding-style/#51-if-elseif-else): 論理演算子は行頭に置く

```php
// PER
if (
    $conditionA
    && $conditionB
    && $conditionC
) {

// Prettier: 行末に置く
if (
    $conditionA &&
    $conditionB &&
    $conditionC
) {
```

> "uses PER as guidance… but does not aim to be fully PER compliant"
> — plugin-php README

---

# glayzzle/php-parser

plugin-php は PHP 本体のパーサーではなく、JS で書かれた再実装に依存している

```json
"dependencies": {
  "php-parser": "^3.2.5"   // https://github.com/glayzzle/php-parser
}
```

- prettier の `parse()` は Node.js プロセス内で同期的に AST を返す必要がある
- PHP ネイティブパーサーは prettier に必要な詳細な位置情報が不足
- 2017年当時、JS で動く PHP パーサーはこれしかなかった
- [#1053](https://github.com/prettier/plugin-php/issues/1053) で自前パーサー構築が議論されたが未完

---

# php-parser のバグ例: new 演算子の優先順位

https://github.com/glayzzle/php-parser/issues/1177

```php
new Foo::$bar->baz();
```

PHP 本体はこれを `new (Foo::$bar->baz)()` と解釈するが、
glayzzle/php-parser は `new Foo::$bar()->baz()` と同じ AST を返してしまう

→ パーサーが間違った AST を返すと、フォーマッターの出力も意味が変わる

※ この問題は [PR #1196](https://github.com/glayzzle/php-parser/pull/1196) で修正済み (2026年3月 merge)

---

# PHP は HTML と混在する

```php
<h1>Hello</h1>
<?php echo $name; ?>
<p>Welcome</p>
```

- `<?php ... ?>` の中だけが PHP。間の HTML は plugin-php の管轄外
- HTML 部分は AST 上 `kind: "inline"`（中身を触らないノード）になる
- PHP と HTML が交互に来ると、改行やインデントの判断が難しい

> "mixed PHP and HTML is still considered unstable"
> — plugin-php README

---

# まとめ

```
prettier test.php
  │
  │  ".php" → plugin-php を解決
  │  オプション: prettier → plugin-php → .prettierrc
  │
  ▼  parse()            テキスト → AST            ← plugin-php
  ▼  printAstToDoc()    AST → Doc                 ← plugin-php
  ▼  printDocToString() Doc → テキスト             ← prettier コア
  │
  ▼  整形済み PHP コード
```

---
layout: center
class: text-center
---

<h1 class="text-white text-4xl font-bold">See you later 👋</h1>
