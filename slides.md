---
theme: default
background: false
class: text-center
highlighter: shiki
lineNumbers: true
shikiConfig:
  theme: 'nord'
drawings:
  persist: false
transition: slide-left
title: プレゼンテーションタイトル
mdc: true
fonts:
  sans: 'Roboto'
  serif: 'Roboto Slab'
  mono: 'Fira Code'
---

<CoverSlide
  title="プレゼンテーションタイトル"
  event="イベント名"
  author="fujitani sora"
/>

<!--
スピーカーノート: ここにプレゼンテーションノートを書きます
-->

---

<div style="padding: 0 8%">

## about me

<div class="grid grid-cols-[1fr_1fr] items-start gap-8">
  <div>
    <p class="text-2xl font-bold mb-4" style="color: oklch(0.7 0.15 215)">fujitani sora</p>
    <div class="flex flex-col gap-3 text-lg font-semibold">
      <div class="flex items-center gap-2">
        <carbon-building class="text-lg" />
        <span>toridori inc engineer</span>
      </div>
      <div class="flex items-center gap-2">
        <carbon-logo-x class="text-lg" />
        <a href="https://x.com/_fs0414">@_fs0414</a>
      </div>
      <div class="flex items-center gap-2">
        <carbon-logo-github class="text-lg" />
        <a href="https://github.com/fs0414">github.com/fs0414</a>
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

<div class="mt-6 text-sm text-gray-400">
  ここに最近のTipsを記載
</div>

</div>

---

# 見出しスライド

## サブ見出し

通常のテキストはこのように表示されます。oklch color spaceを使用した美しいカラーパレットが特徴です。

- <EmojiText emoji="✨">リスト項目1</EmojiText>
- <EmojiText emoji="🎨">リスト項目2</EmojiText>
  - ネストしたリスト
  - ネストしたリスト2
- <EmojiText emoji="🚀">リスト項目3</EmojiText>

> これは引用テキストです。
> 重要な情報を強調するのに便利です。

---

# コードハイライト

TypeScriptのコード例:

```ts {2-4|6-8|all}
// コードハイライトの例
interface User {
  name: string
  age: number
}

const user: User = {
  name: 'Taro',
  age: 25
}

console.log(user)
```

<v-click>

JetBrains Mono フォントでコードを見やすく表示

</v-click>

---
layout: two-cols
---

# 2カラムレイアウト

左側のコンテンツ

- <EmojiText emoji="📝">ポイント1</EmojiText>
- <EmojiText emoji="💡">ポイント2</EmojiText>
- <EmojiText emoji="🎯">ポイント3</EmojiText>

::right::

# 右側

右側のコンテンツ

```js
// コード例
const hello = 'world'
console.log(hello)
```

---

<GradientHeading :animated="true">
  グラデーション見出し
</GradientHeading>

アニメーション付きのグラデーション効果

<v-clicks>

- Purple to Blue のグラデーション
- アニメーションするテキストシャドウ
- oklch color space の活用

</v-clicks>

<br>

<div class="mt-8">

```css
.gradient-heading {
  background: linear-gradient(135deg,
    oklch(0.65 0.25 270) 0%,
    oklch(0.7 0.22 240) 50%,
    oklch(0.75 0.2 210) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

</div>

---

# 画像表示

<CenteredImage
  src="https://placehold.co/800x400"
  alt="サンプル画像"
  width="800px"
  caption="画像のキャプション"
/>

---
layout: center
---

# View Transition対応

<v-click>

<div class="text-6xl emoji">
🎬
</div>

</v-click>

<v-click>

モダンブラウザのView Transition APIに対応しています

</v-click>

---
layout: center
class: text-center
---

<h1 class="text-white text-4xl font-bold">see you later 👋</h1>
