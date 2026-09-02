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

## 同意処理について（バージョン2.1.1以降）

バージョン2.1.1以降では、ユーザーが楽天リワードの利用規約に同意していない場合、API呼び出し時に自動的に同意ダイアログが表示されます。ユーザーが同意した場合のみAPIが実行され、拒否した場合は実行されません。

## サポートされているAPI

以下のReward SDK APIがJS拡張機能経由でWebページから呼び出せます。

- `logAction(appKey, actionCode)` - ミッションアクションを記録
- `logAction(appKey, actionCode, callback)` - コールバック付きでミッションアクションを記録
- `openSdkPortal(appKey)` - リワードSDKポータルを開く
- `openSdkPortal(appKey, callback)` - コールバック付きでリワードSDKポータルを開く
- `openSpsPortal(appKey)` - SPSポータルを開く
- `openSpsPortal(appKey, callback)` - コールバック付きでSPSポータルを開く
- `getUserRewardPoint(appKey, callback)` - ユーザーの現在のリワードポイント残高を取得
- `getPointHistory(appKey, callback)` - ユーザーのポイント履歴を取得
- `getMissionLite(appKey, callback)` - ミッションリストを取得（ライト版・進捗なし）
- `getMissionDetails(appKey, actionCode, callback)` - 進捗を含む単一ミッションの詳細を取得
- `getUnclaimList(appKey, callback)` - 未クレームのミッション達成リストを取得
- `claimMissionPoint(appKey, actionCode, achievedDate, callback)` - ミッション達成のポイントをクレーム

## バージョン互換性

| BOMバージョン | JS拡張機能バージョン |
|--------------|---------------------|
| 8.2.1        | 1.3.0               |
| 7.6.0        | 1.2.0               |
| 7.5.0        | 1.1.0               |
| 6.2.0        | 1.0.0               |

> WebViewがFragmentにある場合は、そのFragmentの親ActivityでSDKセッションを開始してください。[ActivityでSDKを開始する](./integration#activityでsdkを開始する)を参照してください。

JavaScript側の実装については、[JavaScript拡張機能ガイド](/ja/javascript/js-extension)を参照してください。