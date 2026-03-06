# ユーティリティクラス

参考スライド準拠のユーティリティクラス一覧です。

## レイアウト

### カラムレイアウト

#### columns_h（水平カラム）

水平方向に自動で均等分割されるグリッドレイアウト。

```html
<div class="columns_h">
  <div>カラム1</div>
  <div>カラム2</div>
  <div>カラム3</div>
</div>
```

**特徴**:
- 自動で等幅のカラムを生成
- gap: 1rem でスペーシング

#### columns_v（垂直カラム）

垂直方向に配置されるグリッドレイアウト。

```html
<div class="columns_v">
  <div>行1</div>
  <div>行2</div>
  <div>行3</div>
</div>
```

**特徴**:
- 垂直方向に要素を配置
- gap: 1rem でスペーシング

---

## 配置

### center（中央配置）

要素を中央に配置します。

```html
<div class="center">
  中央配置されるコンテンツ
</div>
```

**適用される効果**:
- Flexboxで水平・垂直中央配置
- text-align: center

### right（右寄せ）

要素を右寄せで配置します。

```html
<div class="right">
  右寄せのコンテンツ
</div>
```

**適用される効果**:
- Flexboxで右寄せ
- text-align: right

### left（左寄せ）

要素を左寄せで配置します。

```html
<div class="left">
  左寄せのコンテンツ
</div>
```

**適用される効果**:
- Flexboxで左寄せ
- text-align: left

---

## アニメーション

### text-shine（テキストシャイン）

グラデーションが流れるテキストアニメーション。

```html
<h1 class="text-shine">輝くタイトル</h1>
```

**特徴**:
- Purple to Blue のグラデーション
- 3秒周期でアニメーション
- 無限ループ

### animated-shadow（アニメーションシャドウ）

テキストシャドウが脈打つようにアニメーション。

```html
<h1 class="animated-shadow">強調タイトル</h1>
```

**特徴**:
- 2秒周期で明滅
- oklch color spaceによる美しいシャドウ

---

## デザイン要素

### gradient-heading（グラデーション見出し）

グラデーションテキスト効果。

```html
<h1><span class="gradient-heading">グラデーション見出し</span></h1>
```

### curved-underline（曲線アンダーライン）

テキストに曲線のアンダーラインを追加。

```html
<span class="curved-underline">強調テキスト</span>
```

---

## 組み合わせ例

### 3カラムレイアウト

```html
<div class="columns_h">
  <div class="center">
    <h2>機能1</h2>
    <p>説明</p>
  </div>
  <div class="center">
    <h2>機能2</h2>
    <p>説明</p>
  </div>
  <div class="center">
    <h2>機能3</h2>
    <p>説明</p>
  </div>
</div>
```

### 輝くセンタータイトル

```html
<div class="center">
  <h1 class="text-shine">ご清聴ありがとうございました</h1>
</div>
```

### グラデーション + アニメーション

```html
<h1 class="gradient-heading animated-shadow">
  超強調タイトル
</h1>
```

---

## TailwindとVue/Slidevの違い

### 既存のTailwindクラス

Tailwindのユーティリティは引き続き使用できます：
- `flex`, `grid`
- `mt-8`, `mb-4`
- `text-center`, `text-xl`

### カスタムユーティリティ

このテンプレート独自のクラス：
- `columns_h` / `columns_v`
- `center` / `right` / `left`
- `text-shine`
- `animated-shadow`
- `gradient-heading`
- `curved-underline`

---

## ベストプラクティス

1. **シンプルに**: 複雑なレイアウトは避け、ユーティリティクラスで簡潔に
2. **組み合わせ**: 複数のクラスを組み合わせて効果を最大化
3. **一貫性**: 同じタイプの要素には同じクラスを使用
4. **パフォーマンス**: アニメーションクラスは控えめに使用

---

## 参考

- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Slidev Layouts](https://sli.dev/builtin/layouts.html)
