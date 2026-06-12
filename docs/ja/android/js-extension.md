# JavaScript拡張機能

ネイティブアプリ内のページには、`WebView` に表示されるWebベースのページが含まれる場合があります。JavaScript拡張ライブラリを使うと、そのようなWebページからReward SDK APIを呼び出すことができます。

## 依存関係の追加

モジュールの `build.gradle` に `rewardsdknative-ext` を追加します。BoMでバージョンが管理されるため、個別のバージョン指定は不要です。

```groovy
implementation platform('com.rakuten.android:rewardsdknative-bom:x.x.x')
implementation 'com.rakuten.android:rewardsdknative-ext'
```

## 初期化

`RewardJS.setupWebView` を呼び出してSDKとWebViewを連携させます。

```kotlin
RewardJS.setupWebView("<appCode>", "<domain>", webView)
```

| パラメータ | 説明 |
|---|---|
| `appCode` | 楽天リワード開発者ポータルのアプリケーションキー |
| `domain` | JS拡張機能が実装されているWebページのドメイン |
| `webView` | Webページを読み込む `WebView` インスタンス |

## サポートされているAPI

以下のReward SDK APIがJS拡張機能経由でWebページから呼び出せます。

- `logAction`
- `openSdkPortal`
- `getPointHistory`
- `getUserRewardPoint`

> WebViewがFragmentにある場合は、そのFragmentの親ActivityでSDKセッションを開始してください。[ActivityでSDKを開始する](./integration#activityでsdkを開始する)を参照してください。

JavaScript側の実装については、[JavaScriptガイド](/javascript/)を参照してください。
