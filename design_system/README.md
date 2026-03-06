# Slidev テンプレート デザインシステム

このデザインシステムは、Slidevを使用したプレゼンテーションを効率的に作成するためのガイドラインとコンポーネント集です。

## 目的

- **一貫性**: すべてのスライドで統一されたデザインを実現
- **効率性**: 繰り返し使うパターンを抽象化し、記述量を削減
- **AI フレンドリー**: AI がスライドを生成する際に理解しやすいドキュメント構造

## ファイル構成

```
design_system/
├── README.md           # このファイル（概要）
├── tokens.md           # デザイントークン（色、フォント、スペーシング）
├── layouts.md          # レイアウトパターンガイド
├── components.md       # コンポーネントカタログ
├── utility-classes.md  # ユーティリティクラス一覧
├── ai-guide.md         # AI向け使用ガイド
└── examples.md         # 使用例集
```

## クイックスタート

### 1. 基本的なスライド作成

```md
---
# デフォルトで slide-left トランジションが適用されます
---

# スライドタイトル

通常のコンテンツ
```

### 2. コンポーネントの使用

```md
<TwoColumnLayout>
  <template #left>
    左側のコンテンツ
  </template>
  <template #right>
    右側のコンテンツ
  </template>
</TwoColumnLayout>
```

### 3. 表紙スライド

```md
<CoverSlide
  title="プレゼンテーションタイトル"
  subtitle="サブタイトル"
  event="イベント名"
  author="あなたの名前"
  :social="{ github: 'username', twitter: 'username' }"
/>
```

## 主要な概念

### デザイントークン

oklch color space を使用した美しいカラーパレットと、一貫したスペーシングシステムを提供します。
詳細は [tokens.md](./tokens.md) を参照してください。

### レイアウトパターン

よく使われるレイアウトパターンを標準化しています。
詳細は [layouts.md](./layouts.md) を参照してください。

### 再利用可能なコンポーネント

Vue コンポーネントとして実装された、すぐに使えるUIパーツを提供します。
詳細は [components.md](./components.md) を参照してください。

### ユーティリティクラス

参考スライド準拠のユーティリティクラスを提供します。
詳細は [utility-classes.md](./utility-classes.md) を参照してください。

主なユーティリティ：
- **レイアウト**: `columns_h`, `columns_v`
- **配置**: `center`, `right`, `left`
- **アニメーション**: `text-shine`, `animated-shadow`

## AI を使用する場合

AI にスライドを生成させる際は、[ai-guide.md](./ai-guide.md) を参照してください。
このガイドには、AI が理解しやすい形でのパターンや推奨事項が記載されています。

## 貢献

このデザインシステムは継続的に改善されます。新しいパターンやコンポーネントの提案を歓迎します。
