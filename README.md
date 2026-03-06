# Slidev Common Template

> デザインシステムを備えた、再利用可能なSlidevプレゼンテーションテンプレート

## 📖 概要

このプロジェクトは、[Slidev](https://sli.dev/)をベースとした共通テンプレートです。コンポーネントシステムとワークフローを提供し、技術プレゼンテーションの作成を効率化します。

### 主な特徴

- **統一されたデザインシステム**: `design_system/`に完全ドキュメント化された再利用可能なコンポーネント
- **カラースキーム**: oklch color spaceを使用したグラデーション
- **型安全性**: TypeScriptによる型定義とPropsバリデーション
- **パッケージ管理**: Bunによる依存関係管理とビルド
- **MCP連携**: Claude Code (serena, chrome-devtools) との統合開発環境
- **自動化ワークフロー**: Markdownからスライドを生成するワークフローを提供

## 🛠️ 技術スタック

| カテゴリ | 技術 | 用途 |
|---------|------|------|
| **プレゼンテーション** | [Slidev](https://sli.dev/) | Markdown駆動のスライド生成 |
| **フレームワーク** | [Vue.js 3](https://vuejs.org/) | コンポーネントベースのUI構築 |
| **言語** | [TypeScript](https://www.typescriptlang.org/) | 型安全な開発 |
| **パッケージ管理** | [Bun](https://bun.sh/) | 高速な依存関係管理・ランタイム |
| **スタイリング** | CSS (oklch color space) | カラーシステム |
| **シンタックスハイライト** | [Shiki](https://shiki.style/) | コードのシンタックスハイライト |
| **開発ツール (MCP)** | serena, chrome-devtools | Claude Codeとの統合 |
| **絵文字** | [Twemoji](https://twemoji.twitter.com/) | 統一された絵文字表示 |

## 📁 プロジェクト構造

```
slidev-template/
├── design_system/          # デザインシステムドキュメント
│   ├── ai-guide.md        # AI向けクイックガイド
│   ├── components.md      # コンポーネントカタログ
│   ├── layouts.md         # レイアウトパターン
│   ├── tokens.md          # デザイントークン定義
│   ├── utility-classes.md # ユーティリティクラス
│   └── examples.md        # 使用例
├── components/            # Vueコンポーネント
├── content/              # スライドコンテンツ（Markdown）
├── docs_priv/            # プライベートドキュメント・研究ノート
├── pages/                # カスタムページ
├── slidev_context/       # Slidev設定・コンテキスト
├── workflows/            # 自動化ワークフロー
├── note.md               # スライド生成元ノート（デフォルト）
├── slides.md             # メインスライドファイル
├── style.css             # グローバルスタイル
└── package.json          # 依存関係定義
```

## 🎨 デザインの特徴

- **oklch color space**: Purple to Blue gradientのカラーパレット
- **レスポンシブタイポグラフィ**: clamp()を使用した自動調整
- **グラデーション見出し**: アニメーション付き
- **曲線アンダーライン**: SVGベースのアンダーライン装飾
- **View Transition対応**: ブラウザのView Transition API対応
- **Emoji統合**: Twemoji対応
- **ダークモード**: 自動切り替え対応

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
bun install
```

### 2. 開発サーバーの起動

```bash
bun run dev
```

ブラウザで http://localhost:3030 が自動的に開きます。

### 3. スライド自動生成（ワークフロー）

`note.md`にスライド内容を執筆し、自動変換します。

```bash
# 1. note.md に内容を執筆（Markdown形式）
# 2. Claude Code で /gen-slide コマンドを実行
```

デフォルトで`note.md`をソースとして使用します。他のファイルを指定する場合は `/gen-slide content/example.md` のように指定できます。

詳細は `workflows/slide-generation.md` と `content/README.md` を参照してください。

### 4. ビルド

```bash
bun run build
```

静的ファイルが `dist/` ディレクトリに生成されます。

### 5. PDF/PPTX/PNG エクスポート

```bash
bun run export
```

初回実行時に playwright-chromium が自動インストールされます。

## 📝 カスタマイズ方法

### frontmatter設定（slides.mdの先頭）

```yaml
---
theme: seriph              # テーマ (seriph, default, geist)
title: タイトル             # プレゼンテーションタイトル
transition: slide-left     # トランジション効果
highlighter: shiki         # シンタックスハイライター
lineNumbers: false         # 行番号表示
download: true             # ダウンロード機能
mdc: true                  # MDC構文
---
```

### スタイルのカスタマイズ

`style.css`で以下の変数を変更できます:

```css
:root {
  --color-primary: oklch(0.6 0.2 270);     /* メインカラー */
  --color-secondary: oklch(0.65 0.2 240);  /* セカンダリカラー */
  --color-accent: oklch(0.7 0.18 210);     /* アクセントカラー */
}
```

## 🎯 よく使うスタイルクラス

### グラデーション見出し

```html
<h1 class="gradient-heading">美しいグラデーション</h1>
```

アニメーション付きのグラデーション効果を適用します。

### 曲線アンダーライン

```html
<span class="curved-underline">強調したいテキスト</span>
```

テキストに曲線のアンダーラインを追加します。

### アニメーション付きテキストシャドウ

```html
<h1 class="animated-shadow">輝くテキスト</h1>
```

テキストにパルスアニメーションのシャドウを追加します。

### スライド背景グラデーション

全スライドに共通の背景グラデーション（上辺中央から横長に広がる青グラデーション）が自動適用されます。追加クラスは不要です。

### Emoji

```html
<span class="emoji">👋</span>
```

絵文字を適切なサイズと配置で表示します。

## 📐 レイアウトパターン

### 2カラムレイアウト

```markdown
---
layout: two-cols
---

# 左側のコンテンツ

テキストやリストなど

::right::

# 右側のコンテンツ

コードやイメージなど
```

### センターレイアウト

```markdown
---
layout: center
class: text-center
---

# 中央に表示されるコンテンツ
```

### カスタムグリッド

```html
<div class="grid grid-cols-2 gap-8">
  <div>左側</div>
  <div>右側</div>
</div>
```

## 🎬 アニメーション

### v-click（クリックで表示）

```html
<v-click>

クリックで表示される内容

</v-click>
```

### v-clicks（複数要素を順次表示）

```html
<v-clicks>

- 項目1
- 項目2
- 項目3

</v-clicks>
```

### コードハイライト

```markdown
\`\`\`ts {2-4|6-8|all}
// 行2-4をハイライト → 行6-8 → 全体
const code = 'example'
\`\`\`
```

## 🎨 カラーパレット

テンプレートで使用している oklch カラー:

- **Primary**: Purple (270度)
- **Secondary**: Blue-Purple (240度)
- **Accent**: Blue (210度)

色相（hue）を変更することで、簡単にカラースキームをカスタマイズできます。

## 📚 参考資料

- [Slidev公式ドキュメント](https://ja.sli.dev/)
- [Slidevテーマギャラリー](https://sli.dev/themes/gallery.html)
- [MDC構文](https://sli.dev/features/mdc)
- [oklch color space](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)

## 🛠️ トラブルシューティング

### ポートが既に使用されている

```bash
# ポートを変更して起動
bun run dev -- --port 3031
```

### PDFエクスポートが失敗する

```bash
# playwright-chromiumを手動インストール
bunx playwright install chromium
```

### スタイルが反映されない

- ブラウザのキャッシュをクリア
- 開発サーバーを再起動

## 📄 ライセンス

このテンプレートはMITライセンスで提供されています。

---

Made with ❤️ using [Slidev](https://sli.dev/)
