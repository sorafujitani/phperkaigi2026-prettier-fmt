# Claude Code 作業ガイド - Slidev テンプレートプロジェクト

このドキュメントは、AI（Claude）がこのプロジェクトで作業する際の指針を定めたものです。

## 📋 プロジェクト概要

- **プロジェクト名**: Slidev 共通テンプレート
- **主な技術**: Slidev, Vue.js, TypeScript, oklch color space
- **デザインシステム**: `design_system/` ディレクトリに完全ドキュメント化

---

## 🎯 タスク別の参照ドキュメント

### スライド作成に関する指示

| ユーザーの指示 | 参照すべきドキュメント | 優先度 |
|-------------|-------------------|-------|
| 「新しいスライドを作って」 | `design_system/ai-guide.md` | 必須 |
| 「表紙を作って」 | `design_system/components.md` (CoverSlide) | 必須 |
| 「2カラムレイアウトで」 | `design_system/layouts.md` | 必須 |
| 「グラデーション見出しを追加」 | `design_system/tokens.md` | 推奨 |
| 「色を変更したい」 | `design_system/tokens.md` | 必須 |
| 「スペーシングを調整」 | `design_system/tokens.md` | 必須 |

### コンポーネントに関する指示

| ユーザーの指示 | 参照すべきドキュメント | 優先度 |
|-------------|-------------------|-------|
| 「新しいコンポーネントを作って」 | `design_system/components.md` | 必須 |
| 「コンポーネントの使い方を教えて」 | `design_system/components.md` | 必須 |
| 「コンポーネント一覧を見たい」 | `design_system/components.md` | 必須 |

### スタイル・デザインに関する指示

| ユーザーの指示 | 参照すべきドキュメント | 優先度 |
|-------------|-------------------|-------|
| 「ユーティリティクラスを使いたい」 | `design_system/utility-classes.md` | 必須 |
| 「レイアウトパターンを知りたい」 | `design_system/layouts.md` | 必須 |
| 「デザイントークンとは？」 | `design_system/tokens.md` | 必須 |
| 「使用例を見たい」 | `design_system/examples.md` | 推奨 |

### 参考スライド確認

| ユーザーの指示 | 参照すべきファイル | 優先度 |
|-------------|-----------------|-------|
| 「参考スライドを見て」 | `docs_priv/ref_slide_url.md` | 必須 |
| 「スタイルを参考にして」 | `docs_priv/ref_slide_url.md` → WebFetch | 必須 |

### デバッグ・ビジュアル確認に関する指示

| ユーザーの指示 | 参照すべきドキュメント | 優先度 |
|-------------|-------------------|-------|
| 「表示を確認して」 | `slidev_context/15-chrome-devtools-guide.md` | 必須 |
| 「レイアウトがおかしい」 | `slidev_context/15-chrome-devtools-guide.md` | 必須 |
| 「要素が表示されない」 | `slidev_context/15-chrome-devtools-guide.md` | 必須 |
| 「スタイルが適用されない」 | `slidev_context/15-chrome-devtools-guide.md` | 必須 |

### スライド自動生成に関する指示

| ユーザーの指示 | 参照すべきドキュメント | 優先度 |
|-------------|-------------------|-------|
| 「MDからスライドを生成して」 | `workflows/slide-generation.md` | 必須 |
| 「コンテンツを変換して」 | `workflows/slide-generation.md` | 必須 |
| 「/gen-slide を実行」 | `.claude/commands/gen-slide.md` | 必須 |
| 「コンテンツMDの書き方は？」 | `content/README.md` | 必須 |

---

## 🔄 更新時のドキュメント保守ルール

### 1. スタイル（style.css）を更新した場合

**必ず更新すべきドキュメント**:
1. `design_system/tokens.md` - 新しいカラー、フォント、スペーシングを追加した場合
2. `design_system/utility-classes.md` - 新しいユーティリティクラスを追加した場合
3. `design_system/ai-guide.md` - AIが使用すべき新しいパターンがある場合（早見表を更新）

**更新手順**:
```
1. style.css を変更
2. 該当するドキュメントを特定
3. 変更内容を反映
4. 使用例を追加
```

### 2. 新しいコンポーネントを作成した場合

**必ず更新すべきドキュメント**:
1. `design_system/components.md` - コンポーネントの詳細を追加
2. `design_system/ai-guide.md` - コンポーネント選択チャートに追加
3. `design_system/examples.md` - ビフォー・アフター例を追加

**更新手順**:
```
1. components/ に新しい .vue ファイルを作成
2. components.md に以下を追加:
   - コンポーネント名と説明
   - Props一覧
   - 使用例
   - Before/After比較
3. ai-guide.md のコンポーネント選択チャートを更新
4. examples.md に実例を追加
```

### 3. 既存のコンポーネントを修正した場合

**必ず更新すべきドキュメント**:
1. `design_system/components.md` - Props や使用方法が変わった場合

**確認事項**:
- Breaking Change か？ → examples.md の例も更新が必要
- 新しいPropsの追加か？ → components.md のProps表を更新

### 4. レイアウトパターンを追加した場合

**必ず更新すべきドキュメント**:
1. `design_system/layouts.md` - 新しいレイアウトパターンを追加
2. `design_system/ai-guide.md` - よく使うパターンに追加

### 5. ユーティリティクラスを追加した場合

**必ず更新すべきドキュメント**:
1. `design_system/utility-classes.md` - 詳細説明を追加
2. `design_system/ai-guide.md` - 早見表に追加
3. `design_system/tokens.md` - デザイントークンに関連する場合

---

## 📝 コード作成時のルール

### スライド作成時

**MUST（必須）**:
1. **必ず** `design_system/ai-guide.md` を最初に参照する
2. コンポーネントが存在する場合は**必ず**コンポーネントを使用する
3. 手動でHTMLを書く前に、既存のコンポーネント・ユーティリティクラスを確認する
4. `transition: slide-left` は**書かない**（グローバル設定済み）

**SHOULD（推奨）**:
1. 同じパターンには同じコンポーネント/クラスを使用
2. 簡潔なコードを心がける
3. ドキュメント化されたパターンに従う

**MUST NOT（禁止）**:
1. デフォルト設定を毎回書くこと（transition など）
2. コンポーネントがあるのに手動HTMLを書くこと
3. 新しいコンポーネントを作る前にドキュメントを確認しないこと

### コンポーネント作成時

**MUST（必須）**:
1. TypeScript（`<script setup lang="ts">`）を使用
2. Props に型定義を付ける
3. `withDefaults` でデフォルト値を設定
4. 既存のスタイル（style.css）を再利用

**命名規則**:
- PascalCase（例: `TwoColumnLayout.vue`, `CoverSlide.vue`）
- 説明的な名前（何をするコンポーネントか明確に）

**ファイル配置**:
```
components/
├── TwoColumnLayout.vue
├── GradientHeading.vue
├── EmojiText.vue
├── SocialLinks.vue
├── CoverSlide.vue
└── CenteredImage.vue
```

### スタイル変更時

**MUST（必須）**:
1. oklch color space を使用
2. CSS変数を優先的に使用
3. 参考スライドのパターンに準拠

**標準設定**:
- パディング: `7%（垂直）/ 3%（水平）`
- border-radius: `20px`（スライド全体）
- トランジション: `slide-left`（デフォルト）

---

## 🔍 判断フローチャート

### 新しいスライドを作成する場合

```
1. design_system/ai-guide.md を開く
   ↓
2. スライドタイプを判定
   - 表紙？ → CoverSlide コンポーネント
   - 2カラム？ → TwoColumnLayout コンポーネント
   - セクション区切り？ → layout: center（背景グラデーションは自動適用）
   - 通常コンテンツ？ → デフォルトレイアウト
   ↓
3. ai-guide.md のテンプレートを使用
   ↓
4. 必要に応じて components.md を参照
```

### スタイルを変更する場合

```
1. design_system/tokens.md を確認
   ↓
2. 既存のCSS変数・クラスで対応可能か？
   - Yes → 既存のものを使用
   - No → ↓
   ↓
3. style.css に追加
   ↓
4. ドキュメントを更新
   - tokens.md
   - utility-classes.md（クラスの場合）
   - ai-guide.md（早見表）
```

### コンポーネントを作成する場合

```
1. design_system/components.md を確認
   ↓
2. 既存のコンポーネントで対応可能か？
   - Yes → 既存のものを使用
   - No → ↓
   ↓
3. 新しいコンポーネントを作成
   ↓
4. ドキュメントを更新
   - components.md（必須）
   - ai-guide.md（必須）
   - examples.md（推奨）
```

---

## 🎨 参考スライドの活用

### いつ参考スライドを見るべきか

**MUST（必須）**:
1. 新しいデザインパターンを追加する前
2. スタイルの方向性に迷った時
3. ユーザーが「参考スライドを見て」と指示した時

**参照方法**:
```
1. docs_priv/ref_slide_url.md を読む
2. WebFetch で各URLのスタイルを分析
3. 共通パターンを抽出
4. このテンプレートに適用
```

**参考スライドURL**:
- `docs_priv/ref_slide_url.md` に記載

---

## 📚 ドキュメント構造

```
design_system/
├── README.md              # エントリーポイント
├── tokens.md              # カラー、フォント、スペーシング定義
├── layouts.md             # レイアウトパターン
├── components.md          # コンポーネントカタログ
├── utility-classes.md     # ユーティリティクラス一覧
├── ai-guide.md            # AI向けクイックガイド（最優先）
└── examples.md            # Before/After例
```

**優先度**:
1. **`ai-guide.md`** - スライド作成時は必ず最初にこれを見る
2. **`components.md`** - コンポーネント使用時
3. **`utility-classes.md`** - スタイリング時
4. **`tokens.md`** - デザイントークン変更時
5. **`layouts.md`** - レイアウトパターン選択時
6. **`examples.md`** - 参考例が必要な時

---

## ✅ チェックリスト

### スライド作成完了時

- [ ] `ai-guide.md` のパターンに従っているか？
- [ ] 既存のコンポーネントを最大限活用しているか？
- [ ] デフォルト設定（transition等）を重複して書いていないか？
- [ ] 一貫したスタイルになっているか？

### コンポーネント作成完了時

- [ ] TypeScriptで型定義されているか？
- [ ] `design_system/components.md` に追加したか？
- [ ] `design_system/ai-guide.md` を更新したか？
- [ ] 使用例を `design_system/examples.md` に追加したか？

### スタイル変更完了時

- [ ] oklch color space を使用しているか？
- [ ] `design_system/tokens.md` を更新したか？
- [ ] ユーティリティクラスの場合、`utility-classes.md` に追加したか？
- [ ] `ai-guide.md` の早見表を更新したか？

---

## 🚨 重要な注意事項

### やってはいけないこと

1. ❌ ドキュメントを確認せずにコードを書く
2. ❌ 既存のコンポーネントがあるのに手動HTMLを書く
3. ❌ スタイルを変更してドキュメントを更新しない
4. ❌ コンポーネントを作成してドキュメント化しない
5. ❌ 参考スライドのパターンから逸脱する（正当な理由なく）

### 必ずやること

1. ✅ タスク開始時に該当ドキュメントを確認
2. ✅ 変更後は必ず関連ドキュメントを更新
3. ✅ 新規作成物は必ずドキュメント化
4. ✅ ユーザーの意図を確認してから実装
5. ✅ 一貫性を保つ

---

## 🤖 AI固有のワークフロー

### 1. ユーザーの指示を受けた時

```
1. 指示の種類を判定
   ↓
2. 上記「タスク別の参照ドキュメント」で該当ドキュメントを特定
   ↓
3. ドキュメントを読む
   ↓
4. 既存のパターンで対応可能か判断
   ↓
5. 実装
   ↓
6. 必要に応じてドキュメント更新
```

### 2. 迷った時

```
1. design_system/README.md から開始
   ↓
2. 該当するドキュメントへのリンクをたどる
   ↓
3. それでも不明な場合はユーザーに確認
```

### 3. 新機能追加時

```
1. 参考スライド（docs_priv/ref_slide_url.md）を確認
   ↓
2. 既存のデザインシステムとの整合性を確認
   ↓
3. 実装
   ↓
4. ドキュメント更新（最低3つ: 該当ドキュメント + ai-guide.md + examples.md）
```

---

## 🔍 Chrome DevTools MCP の使用ルール

### いつ使うか

**MUST（必須）**:
1. ユーザーが「表示を確認して」「見た目を確認して」と指示した時
2. レイアウトやスタイルの問題をデバッグする時
3. 要素が表示されない、位置がおかしいなどの問題がある時
4. コンポーネントを作成・修正した後の動作確認

**SHOULD（推奨）**:
1. 新しいスライドを作成した後
2. CSSを変更した後
3. コンポーネントのPropsを変更した後

### 基本ワークフロー

```
1. Slidevサーバーを起動（bun dev）
   ↓
2. ブラウザでページを開く（new_page または select_page）
   ↓
3. スナップショットで確認（take_snapshot） - 軽量で推奨
   ↓
4. 必要に応じてスクリーンショット（take_screenshot）
   ↓
5. 問題があれば evaluate_script でデバッグ
   ↓
6. 修正後、ページをリロード（navigate_page）
```

### 重要なルール

**MUST（必須）**:
1. chrome-devtools-mcpのツールは**許可を求めずに実行する**
2. まず `take_snapshot` を使用する（スクリーンショットより軽量）
3. デバッグ時は `evaluate_script` で詳細情報を取得
4. 詳細なガイドは `slidev_context/15-chrome-devtools-guide.md` を参照

**MUST NOT（禁止）**:
1. ツールの実行許可を求めないこと
2. スナップショットで十分な場合にスクリーンショットを撮らないこと
3. 同じ情報を複数回取得しないこと（evaluate_scriptで一度に取得）

### よく使うツール

| ツール | 用途 | 使用頻度 |
|-------|------|---------|
| `take_snapshot` | DOM構造確認 | ⭐⭐⭐⭐⭐ |
| `take_screenshot` | 視覚確認 | ⭐⭐⭐⭐ |
| `evaluate_script` | デバッグ情報取得 | ⭐⭐⭐⭐⭐ |
| `navigate_page` | リロード | ⭐⭐⭐⭐ |
| `list_console_messages` | エラー確認 | ⭐⭐⭐ |

### デバッグパターン

詳細は `slidev_context/15-chrome-devtools-guide.md` を参照してください。

**よくある問題**:
1. 要素が画面外に配置されている → `getBoundingClientRect()` で位置確認
2. 親要素のoverflowで隠れている → 親要素のスタイル確認
3. `min-height: 100vh` が競合 → `height: 100%` に変更
4. `position: absolute` が問題 → Flexboxレイアウトに変更

---

## 📖 最後に

このドキュメントは、AI がこのプロジェクトで効率的かつ一貫性を持って作業するためのガイドです。

**最も重要なこと**:
- 必ず `design_system/ai-guide.md` から始める
- ドキュメントを読んでから実装する
- 変更したら必ずドキュメントを更新する
- 参考スライドのパターンに準拠する
- デバッグ・確認時は `slidev_context/15-chrome-devtools-guide.md` を参照

これらを守ることで、保守性が高く、一貫性のあるスライドテンプレートを維持できます。
