# Chrome DevTools MCP for Slidev - 使用ガイド

このガイドは、AI（Claude）がSlidevでスライドを作成・デバッグする際に、chrome-devtools-mcpを効率的に使用するためのものです。

---

## 📋 概要

chrome-devtools-mcpは、ブラウザの開発者ツールをプログラマティックに操作するためのツールセットです。Slidevでのスライド開発において、視覚的な確認、レイアウトの検証、デバッグを効率的に行うことができます。

### 主な用途

1. **ビジュアル確認**: スライドの見た目を確認
2. **レイアウトデバッグ**: 要素の配置、サイズ、位置の検証
3. **スタイル検証**: CSSの適用状態の確認
4. **インタラクション確認**: クリック、ホバーなどの動作確認
5. **コンソールエラー確認**: JavaScriptエラーやネットワークエラーの検出

---

## 🚀 基本ワークフロー

### 1. 開発サーバーの起動

```bash
# バックグラウンドでSlidevを起動
bun dev
```

通常、Slidevは `http://localhost:3030/` で起動します。

### 2. ブラウザでページを開く

```javascript
// 新しいページを開く
mcp__chrome-devtools__new_page({ url: "http://localhost:3030/" })

// または既存のページを選択
mcp__chrome-devtools__list_pages()
mcp__chrome-devtools__select_page({ pageIdx: 0 })
```

### 3. スライドの確認

```javascript
// テキストスナップショットを取得（推奨）
mcp__chrome-devtools__take_snapshot()

// スクリーンショットを取得
mcp__chrome-devtools__take_screenshot()

// フルページスクリーンショット
mcp__chrome-devtools__take_screenshot({ fullPage: true })
```

### 4. ページのリロード

```javascript
// 変更を反映するためにリロード
mcp__chrome-devtools__navigate_page({ type: "reload" })
```

---

## 🔧 主要ツールの使い分け

### スナップショット vs スクリーンショット

| ツール | 用途 | メリット | デメリット |
|-------|------|---------|----------|
| `take_snapshot` | DOMツリーの確認、要素の存在確認 | 軽量、テキストで確認可能、要素のUID取得可能 | 視覚的な確認はできない |
| `take_screenshot` | 視覚的な確認、レイアウトの確認 | 実際の見た目を確認できる | データ量が大きい |

**ベストプラクティス**:
1. まず `take_snapshot` で要素の存在とDOMツリーを確認
2. 必要に応じて `take_screenshot` で視覚的に確認

### JavaScriptの実行

```javascript
// DOMの情報を取得
mcp__chrome-devtools__evaluate_script({
  function: `() => {
    const element = document.querySelector('.cover-social');
    if (!element) return { found: false };

    const computed = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    return {
      found: true,
      computedStyles: {
        position: computed.position,
        display: computed.display,
        width: computed.width,
        height: computed.height,
      },
      boundingRect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
      viewportSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    };
  }`
})
```

**よく使うパターン**:
- 要素のスタイル情報取得（`getComputedStyle`）
- 要素の位置情報取得（`getBoundingClientRect`）
- ビューポートサイズの取得（`window.innerWidth/innerHeight`）
- 要素の存在確認（`querySelector`）

### コンソールメッセージの確認

```javascript
// コンソールメッセージ一覧を取得
mcp__chrome-devtools__list_console_messages()

// 特定のメッセージの詳細を取得
mcp__chrome-devtools__get_console_message({ msgid: 3 })
```

### ネットワークリクエストの確認

```javascript
// ネットワークリクエスト一覧を取得
mcp__chrome-devtools__list_network_requests({ pageSize: 50 })

// 失敗したリクエストのみをフィルタ
mcp__chrome-devtools__list_network_requests({
  resourceTypes: ["script", "stylesheet", "fetch"]
})
```

---

## 🎯 Slidev特有のデバッグパターン

### パターン1: 要素が表示されない問題

**手順**:
1. `take_snapshot` で要素がDOMに存在するか確認
2. `evaluate_script` で要素の位置とスタイルを確認
3. ビューポートサイズと要素の位置を比較
4. `overflow: hidden` や `position: absolute` の問題を特定

**例（今回のSNSアイコンの問題）**:
```javascript
// 要素の位置確認
const result = evaluate_script({
  function: `() => {
    const element = document.querySelector('.cover-social');
    const rect = element.getBoundingClientRect();
    return {
      elementTop: rect.top,
      viewportHeight: window.innerHeight,
      isVisible: rect.top < window.innerHeight
    };
  }`
})
// → elementTop: 1125, viewportHeight: 896 → 画面外！
```

### パターン2: レイアウトの崩れ

**手順**:
1. `take_screenshot` で視覚的に確認
2. `evaluate_script` で親要素と子要素のサイズ関係を確認
3. Flexbox/Gridのプロパティを確認
4. `height`, `min-height`, `max-height` の設定を確認

```javascript
// 親子のサイズ関係を確認
evaluate_script({
  function: `() => {
    const parent = document.querySelector('.cover-slide');
    const child = document.querySelector('.cover-content');

    return {
      parent: {
        height: parent.offsetHeight,
        scrollHeight: parent.scrollHeight,
        display: getComputedStyle(parent).display,
        flexDirection: getComputedStyle(parent).flexDirection,
      },
      child: {
        height: child.offsetHeight,
        flex: getComputedStyle(child).flex,
      }
    };
  }`
})
```

### パターン3: スタイルが適用されない

**手順**:
1. `take_snapshot` で要素のクラス名を確認
2. `evaluate_script` でcomputedStyleを確認
3. コンソールエラーを確認（CSSファイルの読み込み失敗など）
4. ネットワークリクエストを確認

```javascript
// スタイルの優先順位を確認
evaluate_script({
  function: `() => {
    const element = document.querySelector('.cover-social');
    const styles = getComputedStyle(element);

    return {
      position: styles.position,
      display: styles.display,
      marginTop: styles.marginTop,
      // スタイルの上書きを確認
      cssText: element.style.cssText,
    };
  }`
})
```

### パターン4: アニメーションの確認

**手順**:
1. 初期状態のスクリーンショットを撮影
2. `click` や `hover` でインタラクション
3. 変化後のスクリーンショットを撮影

```javascript
// 要素にホバー
mcp__chrome-devtools__hover({ uid: "1_6" })

// 少し待ってからスクリーンショット
// （Claudeは直接sleepできないので、ユーザーに確認を依頼）
mcp__chrome-devtools__take_screenshot()
```

---

## 📝 チェックリスト

### スライド作成・修正時

- [ ] `take_snapshot` でDOMツリーを確認
- [ ] `take_screenshot` で視覚的に確認
- [ ] コンソールエラーがないか確認
- [ ] 要素が表示範囲内にあるか確認
- [ ] レスポンシブ対応が必要な場合、異なるビューポートサイズでテスト

### デバッグ時

- [ ] 要素がDOMに存在するか（`take_snapshot`）
- [ ] 要素の位置とサイズ（`evaluate_script` + `getBoundingClientRect`）
- [ ] 要素のスタイル（`evaluate_script` + `getComputedStyle`）
- [ ] 親要素のoverflow設定
- [ ] ビューポートサイズとの関係
- [ ] コンソールエラー
- [ ] ネットワークエラー

---

## 💡 ベストプラクティス

### 1. スナップショットを優先する

```javascript
// Good: 軽量で情報が豊富
take_snapshot()

// Bad: 最初からスクリーンショットを撮る（データ量が大きい）
take_screenshot()
```

### 2. JavaScriptで複数の情報を一度に取得

```javascript
// Good: 一度に必要な情報を全て取得
evaluate_script({
  function: `() => {
    const element = document.querySelector('.target');
    const computed = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      styles: { /* ... */ },
      rect: { /* ... */ },
      viewport: { /* ... */ }
    };
  }`
})

// Bad: 複数回に分けて取得
evaluate_script({ function: `() => document.querySelector('.target').offsetWidth` })
evaluate_script({ function: `() => document.querySelector('.target').offsetHeight` })
```

### 3. エラーハンドリングを含める

```javascript
evaluate_script({
  function: `() => {
    const element = document.querySelector('.target');
    if (!element) {
      return { found: false, error: 'Element not found' };
    }

    try {
      // 処理
      return { found: true, data: /* ... */ };
    } catch (error) {
      return { found: true, error: error.message };
    }
  }`
})
```

### 4. ビューポートサイズを常に確認

Slidevでは、スライドのサイズが固定されているため、ビューポートとの関係を常に意識する必要があります。

```javascript
evaluate_script({
  function: `() => ({
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    element: {
      top: document.querySelector('.target').getBoundingClientRect().top,
      // 画面外かどうかを判定
      isVisible: document.querySelector('.target').getBoundingClientRect().top < window.innerHeight
    }
  })`
})
```

---

## 🛠️ トラブルシューティング

### 問題: 要素が見つからない

**確認事項**:
1. スナップショットでDOMツリーを確認
2. セレクタが正しいか確認
3. 要素の読み込みタイミング（ページが完全に読み込まれているか）

**解決策**:
```javascript
// 要素の存在を確認
evaluate_script({
  function: `() => {
    const element = document.querySelector('.target');
    return {
      exists: !!element,
      allElements: Array.from(document.querySelectorAll('[class*="target"]')).map(el => el.className)
    };
  }`
})
```

### 問題: 要素が画面外にある

**確認事項**:
1. 要素の位置（getBoundingClientRect）
2. ビューポートサイズ
3. 親要素のoverflow設定
4. position（absolute/fixed/relative）

**解決策**:
- Flexboxの `margin-top: auto` を使用
- `height: 100%` でSlidevのレイアウトに従う
- `position: absolute` → Flexboxレイアウトに変更

### 問題: スタイルが適用されない

**確認事項**:
1. CSSファイルが読み込まれているか（ネットワークリクエスト）
2. クラス名が正しいか
3. スタイルの優先順位（`!important` など）
4. scoped スタイルの影響

**解決策**:
```javascript
// スタイルの適用状態を確認
evaluate_script({
  function: `() => {
    const element = document.querySelector('.target');
    const computed = getComputedStyle(element);

    return {
      appliedStyles: {
        position: computed.position,
        display: computed.display,
        // 期待値と比較
      },
      inlineStyles: element.style.cssText,
      classes: element.className,
    };
  }`
})
```

---

## 🔐 設定：許可を求めない

chrome-devtools-mcpのツールを実行する際に許可を求めないようにするには、以下の設定を追加します。

### Claude Codeの設定

`.claude/settings.json` に以下を追加：

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "approvalRequired": false
    }
  }
}
```

**注意**: この設定により、chrome-devtools-mcpの全てのツールが自動的に実行されます。信頼できるプロジェクトでのみ使用してください。

---

## 📚 参考資料

### よく使うツール一覧

| ツール | 用途 | 頻度 |
|-------|------|------|
| `take_snapshot` | DOM構造の確認 | ⭐⭐⭐⭐⭐ |
| `take_screenshot` | 視覚的確認 | ⭐⭐⭐⭐ |
| `evaluate_script` | 要素の詳細情報取得 | ⭐⭐⭐⭐⭐ |
| `list_console_messages` | エラー確認 | ⭐⭐⭐ |
| `list_network_requests` | リソース読み込み確認 | ⭐⭐ |
| `navigate_page` | ページリロード | ⭐⭐⭐⭐ |
| `new_page` | 新規ページ作成 | ⭐⭐ |
| `click` | インタラクション | ⭐⭐ |
| `hover` | ホバー状態確認 | ⭐⭐ |

### Slidevのレイアウトシステム

Slidevは独自のレイアウトシステムを持っています：
- スライドのサイズは固定（通常 960x700px 程度）
- `overflow: hidden` が適用されることが多い
- `position: absolute` は慎重に使用する
- Flexbox/Gridレイアウトを優先

---

## 🎓 学習のヒント

### 段階的なデバッグ

1. **外側から内側へ**: 親要素 → 子要素の順に調査
2. **存在確認**: まずDOMに存在するか確認
3. **位置確認**: 画面内にあるか確認
4. **スタイル確認**: 期待通りのスタイルが適用されているか確認
5. **インタラクション確認**: クリックやホバーが機能するか確認

### 効率的な情報収集

```javascript
// 一度に全ての関連情報を取得するテンプレート
evaluate_script({
  function: `() => {
    const selector = '.your-selector';
    const element = document.querySelector(selector);

    if (!element) {
      return {
        found: false,
        availableElements: Array.from(document.querySelectorAll('[class*="your"]')).map(el => el.className)
      };
    }

    const computed = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const parent = element.parentElement;
    const parentComputed = parent ? getComputedStyle(parent) : null;

    return {
      found: true,
      element: {
        className: element.className,
        computedStyles: {
          position: computed.position,
          display: computed.display,
          width: computed.width,
          height: computed.height,
          margin: computed.margin,
          padding: computed.padding,
        },
        rect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
      },
      parent: parentComputed ? {
        display: parentComputed.display,
        overflow: parentComputed.overflow,
        height: parentComputed.height,
      } : null,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      isVisible: rect.top >= 0 && rect.top < window.innerHeight,
    };
  }`
})
```

---

## 📖 実例：SNSアイコン表示問題の解決

今回のSNSアイコン表示問題を例に、デバッグフローを示します。

### 1. 問題の発見
```javascript
take_screenshot()
// → SNSアイコンが見えない
```

### 2. 要素の存在確認
```javascript
take_snapshot()
// → GitHub, Twitter/X のリンクが存在
```

### 3. 位置の確認
```javascript
evaluate_script({
  function: `() => {
    const social = document.querySelector('.cover-social');
    const rect = social.getBoundingClientRect();
    return {
      elementTop: rect.top,
      viewportHeight: window.innerHeight,
      isVisible: rect.top < window.innerHeight
    };
  }`
})
// → top: 1125px, viewport: 896px → 画面外！
```

### 4. 原因の特定
```javascript
evaluate_script({
  function: `() => {
    const coverSlide = document.querySelector('.cover-slide');
    const computed = getComputedStyle(coverSlide);
    return {
      height: computed.height,
      minHeight: computed.minHeight,
      position: computed.position,
    };
  }`
})
// → min-height: 100vh (896px) だが、内容が溢れている
```

### 5. 解決
- `min-height: 100vh` → `height: 100%` に変更
- `position: absolute` → Flexboxレイアウトに変更
- `margin-top: auto` で下部に配置

### 6. 確認
```javascript
navigate_page({ type: "reload" })
take_screenshot()
// → SNSアイコンが表示された！
```

---

このガイドを参考に、効率的なデバッグとスライド開発を行ってください。
