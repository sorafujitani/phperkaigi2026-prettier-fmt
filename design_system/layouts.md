# レイアウトパターン

Slidev で使用できる主要なレイアウトパターンとその使い分けを説明します。

## 標準レイアウト一覧

### 1. デフォルトレイアウト

最も基本的なレイアウト。特に指定しない場合はこれが使用されます。

```md
---
# layout 指定なし（デフォルト）
---

# タイトル

コンテンツ
```

**特徴**:
- 左寄せ、垂直方向は中央寄せ
- padding: `2rem 4rem`
- 汎用性が高く、ほとんどのスライドで使用可能

**使用シーン**: 通常のコンテンツスライド、リスト、テキスト説明など

---

### 2. Two Columns レイアウト

コンテンツを2カラムに分割します。

```md
---
layout: two-cols
---

# 左側のコンテンツ

説明や箇条書き

::right::

# 右側のコンテンツ

画像やコード
```

**特徴**:
- 画面を左右に分割
- `::right::` で右側のコンテンツを定義
- 左右の比率は均等

**使用シーン**:
- コードと説明を並べる
- 画像とテキストを並べる
- Before/After の比較
- 自己紹介（プロフィール画像とテキスト）

**コンポーネント版**: `<TwoColumnLayout>` を使用すると、より柔軟に設定可能

```md
<TwoColumnLayout :gap="8">
  <template #left>左側</template>
  <template #right>右側</template>
</TwoColumnLayout>
```

---

### 3. Center レイアウト

コンテンツを画面中央に配置します。

```md
---
layout: center
---

# 中央に配置されるタイトル

コンテンツも中央揃え
```

**特徴**:
- 水平・垂直方向ともに中央寄せ
- テキストも中央揃え

**使用シーン**:
- セクションの区切りスライド
- シンプルなメッセージ
- クロージングスライド
- 質疑応答スライド

---

### 4. Cover レイアウト（カスタム）

表紙専用のレイアウト。`<CoverSlide>` コンポーネントで実装。

```md
<CoverSlide
  title="プレゼンテーションタイトル"
  subtitle="サブタイトル"
  event="イベント名"
  author="あなたの名前"
  :social="{ github: 'username', twitter: 'username' }"
/>
```

**特徴**:
- タイトルを大きく表示
- サブタイトル、イベント名、著者名を配置
- SNSリンクを右下に自動配置

**使用シーン**: プレゼンテーションの1ページ目（表紙）

---

## レイアウトの組み合わせ

### 背景グラデーション

全スライドに共通の背景グラデーション（上辺中央から横長に広がる青グラデーション）が自動適用されます。追加クラスは不要です。

```md
---
layout: center
---

# タイトル
```

---

### テキスト中央寄せ

```md
---
layout: center
class: text-center
---

# 中央寄せタイトル

すべてのテキストが中央に
```

---

## 手動レイアウト

Slidev の標準レイアウトを使わず、Tailwind CSS で手動レイアウトも可能です。

### Grid レイアウト

```md
<div class="grid grid-cols-2 gap-8">
  <div>左側</div>
  <div>右側</div>
</div>
```

### Flexbox レイアウト

```md
<div class="flex justify-between items-center">
  <div>左</div>
  <div>右</div>
</div>
```

### 3カラムレイアウト

```md
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

---

## レイアウト選択のガイドライン

| 用途 | 推奨レイアウト |
|------|---------------|
| 通常のコンテンツ | デフォルト |
| コードと説明 | two-cols |
| 画像とテキスト | two-cols |
| セクション区切り | center |
| 質疑応答 | center |
| 表紙 | CoverSlide コンポーネント |
| 最終ページ | center + text-center |

---

## よくある使用例

### 自己紹介スライド

```md
---
layout: two-cols
---

# 自己紹介

<div class="grid grid-cols-2 gap-8">
<div>

- 名前
- 所属
- 活動内容

</div>
<div>

<img src="プロフィール画像" class="w-80 h-80">

</div>
</div>

::right::

# スキル

- スキル1
- スキル2
```

**または**、手動で:

```md
<div class="grid grid-cols-2 gap-8">
  <div>
    - 名前
    - 所属
  </div>
  <div class="flex items-center justify-center">
    <img src="画像" class="w-80 h-80">
  </div>
</div>
```

---

### セクション開始スライド

```md
---
layout: center
---

# <span class="gradient-heading">次のセクション</span>

セクションの説明
```

**背景**: 全スライドに共通の背景グラデーションが自動適用されるため、追加クラスは不要

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

## トランジション

すべてのレイアウトに対して、トランジション効果を指定できます。

```md
---
layout: two-cols
transition: slide-left  # デフォルトで設定済み
---
```

**主なトランジション**:
- `slide-left` (デフォルト)
- `slide-up`
- `fade`
- `none`

---

## Tips

1. **余白の調整**: `mt-8`, `mb-12` などの Tailwind クラスで調整
2. **画像の配置**: `flex` や `grid` を活用
3. **レスポンシブ**: clamp() を使ったフォントサイズで自動調整
4. **一貫性**: 同じタイプのスライドには同じレイアウトを使用
