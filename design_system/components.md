# コンポーネントカタログ

再利用可能な Vue コンポーネントのカタログです。これらを使うことで、スライド作成が効率化されます。

## コンポーネント一覧

### 1. TwoColumnLayout

2カラムレイアウトを簡単に作成できるコンポーネント。

#### Props

| Prop | Type | Default | 説明 |
|------|------|---------|------|
| gap | Number | 8 | カラム間の間隔（Tailwind のスケール） |
| leftRatio | Number | 1 | 左カラムの幅比率 |
| rightRatio | Number | 1 | 右カラムの幅比率 |

#### 使用例

```vue
<TwoColumnLayout>
  <template #left>
    左側のコンテンツ
  </template>
  <template #right>
    右側のコンテンツ
  </template>
</TwoColumnLayout>
```

#### Before/After

**Before**:
```md
<div class="grid grid-cols-2 gap-8">
  <div>左</div>
  <div>右</div>
</div>
```

**After**:
```vue
<TwoColumnLayout :gap="8">
  <template #left>左</template>
  <template #right>右</template>
</TwoColumnLayout>
```

---

### 2. GradientHeading

グラデーション効果を持つ見出しコンポーネント。

#### Props

| Prop | Type | Default | 説明 |
|------|------|---------|------|
| animated | Boolean | false | アニメーション効果を有効化 |
| tag | String | 'h1' | 見出しのタグ (h1, h2, h3) |

#### 使用例

```vue
<GradientHeading>
  美しいグラデーション見出し
</GradientHeading>

<GradientHeading :animated="true" tag="h2">
  アニメーション付き
</GradientHeading>
```

#### Before/After

**Before**:
```md
# <span class="gradient-heading animated-shadow">見出し</span>
```

**After**:
```vue
<GradientHeading :animated="true">
  見出し
</GradientHeading>
```

---

### 3. EmojiText

絵文字付きテキストを簡単に作成。

#### Props

| Prop | Type | Default | 説明 |
|------|------|---------|------|
| emoji | String | '' | 表示する絵文字 |
| size | String | '1.2em' | 絵文字のサイズ |

#### 使用例

```vue
<EmojiText emoji="✨">キラキラした機能</EmojiText>
<EmojiText emoji="🎨" size="2em">大きなアイコン</EmojiText>
```

#### Before/After

**Before**:
```md
- <span class="emoji">✨</span> リスト項目1
- <span class="emoji">🎨</span> リスト項目2
```

**After**:
```vue
- <EmojiText emoji="✨">リスト項目1</EmojiText>
- <EmojiText emoji="🎨">リスト項目2</EmojiText>
```

---

### 4. SocialLinks

SNS リンク集を表示するコンポーネント。

#### Props

| Prop | Type | Default | 説明 |
|------|------|---------|------|
| github | String | '' | GitHub ユーザー名 |
| twitter | String | '' | Twitter/X ユーザー名 |
| linkedin | String | '' | LinkedIn ユーザー名 |
| size | String | '2xl' | アイコンサイズ（Tailwind） |
| gap | Number | 2 | アイコン間の間隔 |

#### 使用例

```vue
<SocialLinks
  github="fs0414"
  twitter="_fs0414"
  size="xl"
/>
```

#### Before/After

**Before**:
```md
<div class="flex gap-2">
  <a href="https://github.com/fs0414" target="_blank">
    <carbon:logo-github class="text-2xl" />
  </a>
  <a href="https://x.com/_fs0414" target="_blank">
    <carbon:logo-twitter class="text-2xl" />
  </a>
</div>
```

**After**:
```vue
<SocialLinks github="fs0414" twitter="_fs0414" />
```

---

### 5. CoverSlide

表紙専用のコンポーネント。すべての要素を一括で設定可能。

#### Props

| Prop | Type | Default | 説明 |
|------|------|---------|------|
| title | String | '' | タイトル |
| subtitle | String | '' | サブタイトル |
| event | String | '' | イベント名 |
| author | String | '' | 著者名 |
| social | Object | {} | SNS情報 { github, twitter, linkedin } |
| gradient | Boolean | true | グラデーション見出しを使用 |

#### デザインの特徴

- **タイトル**: 通常のh1より大きく表示（`clamp(2rem, 5vw, 3.5rem)`）
- **イベント名/著者名**: 右寄せで配置、控えめな灰色
- **SNSアイコン**: 右下に自動配置

#### 使用例

```vue
<CoverSlide
  title="プレゼンテーションタイトル"
  subtitle="サブタイトルや説明"
  event="イベント名"
  author="fujitani sora"
  :social="{ github: 'fs0414', twitter: '_fs0414' }"
/>
```

#### Before/After

**Before**:
```md
<div class="mt-20">

# <span class="gradient-heading">プレゼンテーションタイトル</span>

<div class="mt-8">
サブタイトルや簡単な説明
</div>

<div class="mt-16 text-sm text-gray-500">
イベント名 / fujitani sora
</div>

</div>

<div class="abs-br m-6 flex gap-2 text-xl">
  <a href="https://github.com/fs0414" target="_blank">
    <carbon:logo-github />
  </a>
  <a href="https://x.com/_fs0414" target="_blank">
    <carbon:logo-twitter />
  </a>
</div>
```

**After**:
```vue
<CoverSlide
  title="プレゼンテーションタイトル"
  subtitle="サブタイトルや簡単な説明"
  event="イベント名"
  author="fujitani sora"
  :social="{ github: 'fs0414', twitter: '_fs0414' }"
/>
```

---

### 6. CenteredImage

画像を中央配置し、シャドウ効果を追加するコンポーネント。

#### Props

| Prop | Type | Default | 説明 |
|------|------|---------|------|
| src | String | '' (必須) | 画像のURL |
| alt | String | '' | 代替テキスト |
| width | String | 'auto' | 幅 (例: '800px', '100%') |
| caption | String | '' | キャプション |
| rounded | String | 'xl' | 角丸のサイズ (Tailwind) |

#### 使用例

```vue
<CenteredImage
  src="https://example.com/image.png"
  alt="サンプル画像"
  width="800px"
  caption="画像の説明"
/>
```

#### Before/After

**Before**:
```md
<div class="flex justify-center">
  <img src="https://example.com/image.png" alt="サンプル" class="rounded-xl shadow-lg">
</div>

<div class="text-center mt-4 text-sm text-gray-500">
画像のキャプション
</div>
```

**After**:
```vue
<CenteredImage
  src="https://example.com/image.png"
  alt="サンプル"
  caption="画像のキャプション"
/>
```

---

## スタイルクラス

コンポーネントではなく、クラスとして提供されているユーティリティ。

### gradient-heading

グラデーション見出しクラス。

```md
# <span class="gradient-heading">タイトル</span>
```

### animated-shadow

アニメーションするテキストシャドウ。

```md
<span class="gradient-heading animated-shadow">タイトル</span>
```

### emoji

絵文字の表示を最適化。

```md
<span class="emoji">🎨</span>
```

---

## 組み合わせ例

### 自己紹介スライド

```vue
<TwoColumnLayout>
  <template #left>

- **fujitani sora** / @_fs0414
- <EmojiText emoji="🏢">株式会社トリドリ</EmojiText>
- <EmojiText emoji="🎤">TSKaigiの運営</EmojiText>
- <EmojiText emoji="💻">技育CAMPメンター</EmojiText>

  </template>
  <template #right>
    <CenteredImage
      src="https://your-image.png"
      alt="プロフィール"
      width="320px"
    />
  </template>
</TwoColumnLayout>
```

### 最終スライド

```vue
<div class="text-center">
  <GradientHeading tag="h1">
    ご清聴ありがとうございました
  </GradientHeading>

  <div class="mt-8">
    <SocialLinks
      github="fs0414"
      twitter="_fs0414"
    />
  </div>
</div>
```

---

## Tips

1. **Props の省略**: デフォルト値が適切な場合は省略可能
2. **スロット**: 多くのコンポーネントでスロットを活用
3. **組み合わせ**: 複数のコンポーネントを組み合わせて使用可能
4. **カスタマイズ**: クラスを追加して独自のスタイルも適用可能

---

## 追加予定のコンポーネント

- `CodeBlock` - コードブロックの拡張
- `Timeline` - タイムライン表示
- `CardGrid` - カードグリッドレイアウト
