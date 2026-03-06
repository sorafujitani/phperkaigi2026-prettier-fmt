# AI 向けスライド作成ガイド

このドキュメントは、AI がこのテンプレートを使用してスライドを生成する際の指針です。

## 基本原則

### 1. デフォルト設定を活用する

**トランジション**: デフォルトで `slide-left` が適用されるため、特に指定不要。

```md
---
# transition は自動で slide-left が適用される
---
```

### 2. コンポーネントを優先的に使用する

手動で HTML を書く代わりに、既存のコンポーネントを使用してください。

**❌ 避けるべき書き方**:
```md
<div class="grid grid-cols-2 gap-8">
  <div>左</div>
  <div>右</div>
</div>
```

**✅ 推奨される書き方**:
```vue
<TwoColumnLayout>
  <template #left>左</template>
  <template #right>右</template>
</TwoColumnLayout>
```

### 3. 簡潔に書く

スライドのコードは可能な限りシンプルに保つ。

### 4. 入力された情報のみを使用する

**重要**: スライドコンテンツには、提供された情報以外を追加しない。

**禁止事項**:
- ❌ 抽象的な表現を追加（モダンな、革新的な、美しい、素晴らしい）
- ❌ 誇張表現を追加（簡単に、劇的な、圧倒的な）
- ❌ 存在しない数値や実測値を捏造
- ❌ 提供されていない技術仕様や機能を推測して追加
- ❌ 文脈から推測した情報を補足

**原則**:
- ✅ 提供されたテキストをそのまま使用
- ✅ 提供された情報を正確に転記
- ✅ 不明な情報は追加せず、提供された範囲内でスライドを作成
- ✅ ユーザーが書いた表現を尊重し、言い換えない

---

## スライドタイプ別のテンプレート

### 表紙スライド

```vue
<CoverSlide
  title="プレゼンテーションタイトル"
  subtitle="サブタイトル"
  event="イベント名"
  author="著者名"
  :social="{ github: 'username', twitter: 'username' }"
/>
```

**重要**: 表紙は `CoverSlide` コンポーネントを必ず使用する。

---

### 通常のコンテンツスライド

```md
---
# デフォルトレイアウトを使用
---

# タイトル

コンテンツ
```

**使用シーン**: テキスト説明、リスト、通常の内容

---

### 2カラムスライド（コードと説明）

```vue
<TwoColumnLayout>
  <template #left>

# 説明

- ポイント1
- ポイント2

  </template>
  <template #right>

\`\`\`ts
// コード例
const example = 'code'
\`\`\`

  </template>
</TwoColumnLayout>
```

**使用シーン**: コードと説明、画像とテキスト、Before/After

---

### 2カラムスライド（自己紹介）

```vue
<TwoColumnLayout>
  <template #left>

- **名前** / @handle
- <EmojiText emoji="🏢">会社名</EmojiText>
- <EmojiText emoji="💻">活動内容</EmojiText>

  </template>
  <template #right>

<CenteredImage
  src="プロフィール画像URL"
  alt="プロフィール"
  width="320px"
/>

  </template>
</TwoColumnLayout>
```

---

### セクション区切りスライド

```md
---
layout: center
---

# <span class="gradient-heading">セクションタイトル</span>

セクションの説明
```

**使用シーン**: 大きなトピックの区切り、章の開始

**背景**: 全スライドに共通の背景グラデーション（上辺中央から横長に広がる青グラデーション）が自動適用されるため、追加クラスは不要

---

### 最終スライド

```md
---
layout: center
class: text-center
---

# <span class="gradient-heading">ご清聴ありがとうございました</span>

<div class="mt-8">
  <SocialLinks
    github="username"
    twitter="username"
  />
</div>
```

---

## よく使うパターン

### パターン1: 絵文字付きリスト

```md
- <EmojiText emoji="✨">ポイント1</EmojiText>
- <EmojiText emoji="🎨">ポイント2</EmojiText>
- <EmojiText emoji="🚀">ポイント3</EmojiText>
```

または、シンプルに:
```md
- ✨ ポイント1
- 🎨 ポイント2
- 🚀 ポイント3
```

### パターン2: 画像の表示

```vue
<CenteredImage
  src="画像URL"
  alt="説明"
  caption="キャプション"
/>
```

### パターン3: コードハイライト

```md
\`\`\`ts {2-4|6-8|all}
// 行ごとにハイライト
interface User {
  name: string
  age: number
}

const user: User = {
  name: 'Taro'
}
\`\`\`
```

**`{2-4|6-8|all}`**: クリックごとに2-4行目→6-8行目→全体の順でハイライト

---

## コンポーネント選択チャート

```
スライドを作成する際、以下の手順で判断:

1. 表紙か？
   → Yes: CoverSlide

2. 2カラムレイアウトか？
   → Yes: TwoColumnLayout

3. セクション区切りか？
   → Yes: layout: center

4. 画像を中央に表示？
   → Yes: CenteredImage

5. それ以外
   → デフォルトレイアウト
```

---

## スタイルクラス早見表

### デザイン・アニメーション

| 用途 | クラス | 使用例 |
|------|-------|--------|
| グラデーション見出し | `gradient-heading` | `<span class="gradient-heading">タイトル</span>` |
| アニメーションシャドウ | `animated-shadow` | `<span class="gradient-heading animated-shadow">タイトル</span>` |
| テキストシャイン | `text-shine` | `<h1 class="text-shine">輝くタイトル</h1>` |
| 曲線アンダーライン | `curved-underline` | `<span class="curved-underline">強調</span>` |
| 絵文字 | `emoji` | `<span class="emoji">🎨</span>` |

### レイアウト

| 用途 | クラス | 使用例 |
|------|-------|--------|
| 水平カラム | `columns_h` | `<div class="columns_h"><div>1</div><div>2</div></div>` |
| 垂直カラム | `columns_v` | `<div class="columns_v"><div>1</div><div>2</div></div>` |
| 中央配置 | `center` | `<div class="center">中央</div>` |
| 右寄せ | `right` | `<div class="right">右</div>` |
| 左寄せ | `left` | `<div class="left">左</div>` |

### スペーシング

| 用途 | クラス | 使用例 |
|------|-------|--------|
| 上余白（小） | `mt-4` | `<div class="mt-4">` |
| 上余白（中） | `mt-8` | `<div class="mt-8">` |
| 上余白（大） | `mt-12` | `<div class="mt-12">` |
| 上余白（特大） | `mt-20` | `<div class="mt-20">` |

---

## AI が避けるべきパターン

### ❌ 毎回 transition を書く

```md
---
transition: slide-left  # これは不要（デフォルトで設定済み）
---
```

### ❌ 手動で複雑なレイアウトを書く

```md
<!-- 避ける -->
<div class="grid grid-cols-2 gap-8">
  <div class="flex items-center justify-center">
    <div>...</div>
  </div>
</div>
```

**代わりに**: `TwoColumnLayout` を使用

### ❌ 表紙を手動で書く

```md
<!-- 避ける -->
<div class="mt-20">
  <h1><span class="gradient-heading">タイトル</span></h1>
  ...
</div>
```

**代わりに**: `CoverSlide` を使用

### ❌ emoji クラスを毎回書く

```md
<!-- 避ける -->
<span class="emoji">✨</span> テキスト
```

**代わりに**:
- `<EmojiText emoji="✨">テキスト</EmojiText>`
- または直接絵文字を書く: `✨ テキスト`

---

## 推奨フロー

スライドを生成する際は、以下の順序で考える:

1. **スライドの目的を特定**
   - 表紙、コンテンツ、区切り、最終？

2. **適切なレイアウトを選択**
   - デフォルト、2カラム、センター？

3. **コンポーネントを選択**
   - CoverSlide、TwoColumnLayout、CenteredImage など

4. **コンテンツを配置**
   - テキスト、画像、コードなど

5. **必要に応じてスタイルクラスを追加**
   - gradient-heading、animated-shadow など

---

## 具体例: スライドセットの生成

ユーザーが「自己紹介スライドを作って」と依頼した場合:

```vue
<TwoColumnLayout>
  <template #left>

# 自己紹介

- **名前** / @handle
- <EmojiText emoji="🏢">会社名・ソフトウェアエンジニア</EmojiText>
- <EmojiText emoji="🎤">活動1</EmojiText>
- <EmojiText emoji="💻">活動2</EmojiText>

<br>

👋 はじめまして！

  </template>
  <template #right>

<CenteredImage
  src="プロフィール画像URL"
  alt="プロフィール"
  width="320px"
/>

  </template>
</TwoColumnLayout>
```

---

## まとめ

- **コンポーネントを優先**: 手動 HTML より再利用可能なコンポーネント
- **デフォルトを活用**: transition などは明示不要
- **簡潔に**: 必要最小限のコード
- **一貫性**: 同じタイプのスライドには同じパターン
- **ドキュメント参照**: 迷ったら `components.md` や `layouts.md` を参照
