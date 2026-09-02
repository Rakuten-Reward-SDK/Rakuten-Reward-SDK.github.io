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

## 同意処理について（2.1.1以降）

2.1.1以降、ユーザーがまだ楽天リワードの利用規約に同意していない場合、APIを呼び出すと自動的に同意ダイアログが表示されます。APIはユーザーが同意した場合のみ実行されます。ユーザーが拒否した場合、APIの呼び出しは実行されません。

## サポートされているAPI

| API | 説明 |
| --- | --- |
| `logAction(appKey, actionCode)` | ミッションアクションを記録する |
| `logAction(appKey, actionCode, callback)` | 結果コールバック付きでミッションアクションを記録する |
| `openSdkPortal(appKey)` | リワードSDKポータルを開く |
| `openSdkPortal(appKey, callback)` | 結果コールバック付きでリワードSDKポータルを開く |
| `openSpsPortal(appKey)` | SPSポータルを開く |
| `openSpsPortal(appKey, callback)` | 結果コールバック付きでSPSポータルを開く |
| `getUserRewardPoint(appKey, callback)` | ユーザーの現在のリワードポイント残高を取得する |
| `getPointHistory(appKey, callback)` | ユーザーのポイント履歴を取得する |
| `getMissionLite(appKey, callback)` | ミッションリストを取得する（ライト版・進捗なし） |
| `getMissionDetails(appKey, actionCode, callback)` | 進捗を含む単一ミッションの詳細を取得する |
| `getUnclaimList(appKey, callback)` | 未クレームのミッション達成リストを取得する |
| `claimMissionPoint(appKey, actionCode, achievedDate, callback)` | ミッション達成のポイントをクレームする |

> WebViewがFragmentにある場合は、そのFragmentの親ActivityでSDKセッションを開始してください。[ActivityでSDKを開始する](./integration#activityでsdkを開始する)を参照してください。

## バージョンマッピング

| BOM   | JS |
|-------| --- |
| 8.2.1 | 1.3.0 |
| 7.6.0 | 1.2.0 |
| 7.5.0 | 1.1.0 |
| 6.2.0 | 1.0.0 |

JavaScript側の実装については、[JavaScript拡張機能ガイド](/ja/javascript/js-extension)を参照してください。