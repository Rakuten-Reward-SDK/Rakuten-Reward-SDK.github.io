# RakutenReward

`RakutenReward` はReward SDKのメインクラスです。ミッション、ポイント、UI、リスナー管理のコアAPIを提供しています。

## プロパティ

| プロパティ | 説明 |
|---|---|
| `version` | 現在のReward SDKのバージョン文字列 |
| `user` | 現在のユーザーデータ（`RakutenRewardUser`） |
| `status` | 現在のSDKステータス（`RakutenRewardSDKStatus`） |
| `lastFailed` | 最後に失敗したAPI呼び出し（`RakutenRewardAPILastCalled`） |

## ミッション

| API | 説明 |
|---|---|
| `logAction(actionCode, onSuccess, onFailed)` | ミッションアクションを記録する |
| `getMissions(onSuccess, onFailed)` | ミッション一覧を取得する |
| `getMissionsLite(onSuccess, onFailed)` | 軽量版ミッション一覧を取得する |
| `getMissionDetails(actionCode, onSuccess, onFailed)` | 特定ミッションの詳細を取得する |
| `getUnclaimedItems(onSuccess, onFailed)` | 未獲得ミッション一覧を取得する |

## ポイント

| API | 説明 |
|---|---|
| `getPointHistory(onSuccess, onFailed)` | 直近3ヶ月のポイント履歴を取得する |
| `memberInfo(onSuccess, onFailed)` | サーバーから最新のメンバー情報を取得する |

## UI

| API | 説明 |
|---|---|
| `openSDKPortal(isPortalOpenedCallback, activityResultCallback)` | SDKポータルを開く |
| `openHelpPage()` | Reward SDKヘルプページを開く |
| `openTCPage()` | Reward SDK利用規約ページを開く |
| `openPrivacyPage()` | Reward SDKプライバシーポリシーページを開く |
| `forceClaimClose()` | クレームUIを強制的に閉じる |

## 同意

| API | 説明 |
|---|---|
| `requestForConsent(callback)` | ユーザーがまだ同意していない場合に同意ダイアログを表示する |
| `showConsentBanner(callback)` | ユーザーがまだ同意していない場合に同意通知バナーを表示する |

## リスナー

| API | 説明 |
|---|---|
| `addRakutenRewardListener(listener)` | `RakutenRewardListener` を登録する |
| `removeRakutenRewardListener(listener)` | `RakutenRewardListener` の登録を解除する |

## クッキー

| API | 説明 |
|---|---|
| `setRp(rp: String)` | Rpクッキーを設定する |
| `setRz(rz: String)` | Rzクッキーを設定する |
| `setRa(ra: String)` | Raクッキーを設定する |

## RakutenRewardSDKStatus

| ステータス | 説明 |
|---|---|
| `ONLINE` | SDKの準備完了。メンバー情報が利用可能 |
| `OFFLINE` | SDKの準備未完了または初期化失敗 |
| `APPCODEINVALID` | アプリコードが不正（初期化が400を返した） |
| `TOKENEXPIRED` | アクセストークンの有効期限切れ |
| `USER_NOT_CONSENT` | ユーザーがまだ同意していない |

## RakutenRewardAPIError

| エラー | 説明 |
|---|---|
| `NETWORKERROR` | ネットワーク接続エラー |
| `INVALIDREQUEST` | パラメーターが不正 |
| `TOKENEMPTY` | アクセストークンが未設定 |
| `SDKNOTACTIVE` | SDKが初期化されていない |
| `TOKENEXPIRE` | アクセストークンの有効期限切れ |
| `USER_NOT_CONSENT` | ユーザーが同意していない |
| `MISSION_REACHED_CAP` | ミッション達成上限に達した |
| `UNDER_MAINTENANCE` | メンテナンス中 |
| `UNKNOWN` | 不明なエラー |
