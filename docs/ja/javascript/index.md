# 基本セットアップ

## 要件

### ブラウザサポート

Mission JS SDKはブラウザのネイティブ `fetch` APIを使用し、以下のブラウザをサポートしています：

| ブラウザ | 最小バージョン |
|---|---|
| Chrome | 42以上 |
| Edge | 14以上 |
| Safari | 10.1以上 |
| Firefox | 39以上 |

古いブラウザをサポートする場合は、[`fetch` ポリフィル](https://www.npmjs.com/package/whatwg-fetch)をプロジェクトに追加してください。

### フロントエンドフレームワーク

Mission JS SDKはフレームワーク依存なしのVanilla JavaScriptで記述されています。React、Vue、Angular、または通常のHTMLなど、あらゆる技術スタックで動作します。

## インストール

> 最新のSDKバージョンは[こちら](https://github.com/rakuten-ads/Rakuten-Reward-JS/blob/main/CHANGELOG.md)をご参照ください。

### スクリプトタグ経由

以下の `<script>` タグをページの `<head>` タグ内に追加します：

```html
<script
    type="text/javascript"
    src="https://portal.reward.rakuten.co.jp/sdk-static/sdk/x.x.x/missionsdk.js">
</script>
```

読み込み後、SDKは `window` オブジェクト経由でアクセスできます：

```javascript
const rewardSDK = window.RewardMissionSDK || {};
```

### npm経由

```bash
npm install rakutenreward-js
```

インストール後、SDKをインポートして初期化します：

```javascript
import RewardMissionSDK from "rakutenreward-js";

RewardMissionSDK.init({
    appKey: "YOUR_APP_KEY",
});
```

::: info React
Reactプロジェクトでは、コンポーネントのマウント後に実行されるよう `useEffect` 内でSDKを初期化してください：

```javascript
import RewardMissionSDK from "rakutenreward-js";

useEffect(() => {
    RewardMissionSDK.init({
        appKey: "YOUR_APP_KEY",
        language: "ja",
        successCallback: () => {
            RewardMissionSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
        },
    });
}, []);
```
:::
