# JavaScript拡張機能

JavaScript拡張機能ライブラリは、ネイティブのiOSまたはAndroidの `WebView` 内に読み込まれたWebページとネイティブのReward SDK APIを橋渡しします。これにより、WebベースのインターフェースからJavaScriptを通じてネイティブSDKの機能（アクションのログ記録やSDKポータルの起動など）を直接呼び出すことができます。

## インストール

以下の `<script>` タグをページの `<head>` タグ内に追加します：

```html
<script
    type="text/javascript"
    src="https://portal.reward.rakuten.co.jp/sdk-static/jsext/x.x.x/missionsdk-ext.js">
</script>
```

読み込み後、ライブラリは `window` オブジェクト経由でアクセスできます：

```javascript
const rewardSDKExt = window.RakutenRewardExt || {};
```

## セットアップ

APIを呼び出す前に、WebViewをホストするネイティブアプリに合わせてプラットフォームを設定します：

```javascript
// Android
rewardSDKExt.setPlatform('android');

// iOS
rewardSDKExt.setPlatform('ios');
```

## サポートAPI

### アクションのログ記録

```javascript
rewardSDKExt.logAction("YOUR_ACTION_CODE");
```

### SDKポータルを開く

```javascript
rewardSDKExt.openSdkPortal();
```

### ユーザーリワードポイントを取得する

```javascript
rewardSDKExt.getUserRewardPoint((points) => {
    console.log('リワードポイント:', points); // 例: 10
});
```

### ポイント履歴を取得する

```javascript
rewardSDKExt.getPointHistory((history) => {
    console.log('ポイント履歴:', history);
    // [{ points: 1, month: '202504' }, ...]
});
```

## APIリファレンス

| 関数 | パラメータ | 説明 |
|---|---|---|
| `setPlatform` | `'android' \| 'ios'` | API呼び出し前にプラットフォームを設定 |
| `logAction` | `actionCode: string` | ネイティブのアクションログAPIをトリガー |
| `openSdkPortal` | — | ネイティブのSDKポータル起動APIをトリガー |
| `getUserRewardPoint` | `callback<number>` | ユーザーの現在のリワードポイントを取得 |
| `getPointHistory` | `callback<PointHistory[]>` | ユーザーのポイント履歴を取得 |

### PointHistory

| キー | 型 | 説明 |
|---|---|---|
| `points` | `number` | その月に獲得したポイント |
| `month` | `string` | ポイントを獲得した月 — `YYYYMM` 形式（例：`202504`） |

::: info ネイティブ側のセットアップが必要です
ネイティブアプリ側でもWebViewのセットアップを完了する必要があります。[Android JavaScript拡張機能ガイド](/android/js-extension)または[iOS JavaScript拡張機能ガイド](/ios/js-extension)をご参照ください。
:::
