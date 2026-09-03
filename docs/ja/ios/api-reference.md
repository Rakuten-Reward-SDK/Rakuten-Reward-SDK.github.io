# APIリファレンス

## RakutenReward

すべてのSDK操作のメインエントリーポイントです。`RakutenReward.shared` 経由でアクセスします。

### 初期化

| メソッド | 説明 |
|---|---|
| `initSdkThirdParty(appCode:)` | RakutenAuth（SDK提供のログイン）で初期化 |

### 認証

| メソッド | 説明 |
|---|---|
| `openLoginPage(_:)` | SDK提供のログインページを表示 |
| `isLogin()` | ユーザーがログイン済みかつトークンが有効な場合 `true` を返します |
| `logout(_:)` | ログアウトしてセッションをクリアします |

### ミッションAPI

| メソッド | 説明 |
|---|---|
| `logAction(actionCode:completionHandler:)` | ミッションに向けたユーザーアクションを記録します |
| `getMissionListWithProgress(completion:)` | ユーザーの進捗とキャップ状態を含むミッションを取得します |
| `getMissionLiteList(completion:)` | 進捗なしのミッションを取得します（軽量版） |
| `getMissionDetails(actionCode:completion:)` | 単一ミッションの詳細を取得します |
| `getUnclaimedMission(completion:)` | ポイント申請待ちの達成済みミッションを取得します |
| `claim(unclaimedItem:completion:)` | 未申請の達成に対して申請UIを表示します |
| `missionList` | 最後に取得したミッションリストの同期キャッシュ |

### ポイント & ユーザーデータ

| メソッド / プロパティ | 説明 |
|---|---|
| `user` | 現在の `SDKUser` オブジェクト（オフライン時は `nil` の場合あり） |
| `loadMemberInfoRank(_:)` | サーバーから会員ポイントとランクを再取得します |
| `getPointHistory(completion:)` | 3ヶ月分のポイント履歴を取得します |

### ポータル

| メソッド | 説明 |
|---|---|
| `openPortal(completionHandler:)` | SDKポータルを開きます |
| `openSpsPortal(rzCookie:completionHandler:)` | SPS ポータルを開く（v8.5.0 以降） |
| `openSpsPortal(rzCookie:deeplink:completionHandler:)` | ディープリンクで特定の画面を指定して SPS ポータルを開く |
| `openSupportPage(_:)` | 内蔵ミニブラウザでヘルプ/法的ページを開きます |

### ユーザー同意

| メソッド | 説明 |
|---|---|
| `requestForConsent(_:)` | ユーザーの同意をリクエストします（未同意の場合ダイアログを表示） |
| `showConsentBanner(_:)` | 同意通知バナーを表示します |

### コールバック

| プロパティ | トリガー |
|---|---|
| `didUpdateUser: ((SDKUser) -> Void)?` | ユーザーデータが更新されたときに発火 |
| `didUpdateStatus: ((RakutenRewardStatus) -> Void)?` | SDKステータスが変化したときに発火 |
| `didUpdateUnclaimedAchievement: ((UnclaimedItem) -> Void)?` | ミッションが達成されたときに発火 |
| `didUpdateIsPortalPresentedStatus: ((Bool) -> Void)?` | ポータルが表示/非表示になったときに発火 |
| `didPresentConsentUI: (() -> Void)?` | 同意ダイアログが表示されたときに発火 |
| `didDismissConsentUI: (() -> Void)?` | 同意ダイアログが閉じられたときに発火 |
| `RakutenReward.userUpdatedNotification` | ユーザーが更新されたときに通知される `NotificationCenter` 通知 |

### プロパティ

| プロパティ | 説明 |
|---|---|
| `status` | 現在の `RakutenRewardStatus` |
| `appCode` | アプリケーションコード（初期化後は読み取り専用） |
| `tokenType` | トークンタイプ（`.rakutenAuth`） |
| `region` | SDKリージョン（`.japan`） |

---

## RewardConfiguration

設定の完全なリファレンスは[設定](./configuration)をご参照ください。

---

## 列挙型

### RakutenRewardStatus

| ケース | 説明 |
|---|---|
| `.online` | SDKの準備完了；ユーザーデータは最新 |
| `.offline` | SDKが初期化されていないか初期化に失敗 |
| `.appcodeInvalid` | アプリケーションコードが間違っています |
| `.tokenExpired` | トークンの有効期限切れ — 再ログインを促してください |
| `.userNotConsent` | ユーザーが利用規約に同意していません |

### RakutenRewardConsentStatus

| ケース | 説明 |
|---|---|
| `.consentProvided` | 同意が得られました |
| `.consentNotProvided` | まだ同意が得られていません |
| `.consentUIAlreadyPresented` | 同意UIがすでに表示中です |
| `.consentFailed` | 同意確認中にAPIエラーが発生しました |
| `.consentProvidedRestartSessionFailed` | 同意は得られましたがセッション再起動に失敗しました |

### LoginPageCompletion

| ケース | 説明 |
|---|---|
| `.logInCompleted` | ユーザーが正常にログインしました |
| `.dismissByUser` | ユーザーがログインページを閉じました |
| `.failToShowLoginPage` | ログインUIを表示できませんでした |

### PointClaimScreenEvent

| ケース | 説明 |
|---|---|
| `.willPresent` | 申請画面が表示されようとしています |
| `.didFailToShow(error:)` | 申請画面を表示できませんでした |
| `.didDismiss` | 申請画面が閉じられました（理由を問わず） |
| `.didSelfDismiss` | 申請画面が自動的に閉じられました |
| `.didDismissByUser` | ユーザーが申請画面を閉じました |
| `.didFailToClaim(error:)` | ポイント申請リクエストが失敗しました |
| `.didClaimSuccessfully(item:)` | ポイントが正常に申請されました |
| `.didTriggerIchibaDeeplink(url:)` | 楽天市場のディープリンクが発火しました |

### SupportPage

| ケース | 説明 |
|---|---|
| `.help` | Reward SDKヘルプページ |
| `.termsCondition` | Rewardの利用規約 |
| `.privacyPolicy` | Rewardのプライバシーポリシー |

---

## データモデル

### SDKUser

| プロパティ / メソッド | 説明 |
|---|---|
| `signIn` | ユーザーがサインイン済みの場合 `true` |
| `point` | Reward SDKポイント残高 |
| `unclaimedMissionCount` | 未申請の達成数 |
| `getName()` | ユーザーの表示名 |
| `currentPointRank()` | 会員ポイントとランクを含む `MemberPointRank` を返します |

### Mission

| プロパティ | 型 | 説明 |
|---|---|---|
| `name` | `String` | ミッション名 |
| `actionCode` | `String` | アクションキー |
| `iconurl` | `String` | ミッションアイコンURL |
| `instruction` | `String` | ユーザーへの説明 |
| `condition` | `String` | 達成上限の説明 |
| `notificationtype` | `NotificationType` | `NONE`, `BANNER`, `MODAL`, `CUSTOM`, `BANNER_50`, `BANNER_250` |
| `point` | `Int` | 付与ポイント数 |
| `enddatestr` | `String` | 終了日の文字列 |
| `till` | `String` | 残り日数 |
| `reachedCap` | `Bool` | 達成上限に達しているかどうか |
| `times` | `Int` | 必要なアクション回数 |
| `progress` | `Int` | 現在のアクション回数 |
| `unclaimed` | `Int` | 未申請の達成数 |

### MissionLite

`progress` と `reachedCap` を除いた `Mission` の軽量版です。その他のプロパティはすべて共通です。

### UnclaimedItem

| プロパティ | 型 | 説明 |
|---|---|---|
| `name` | `String` | ミッション名 |
| `iconurl` | `String` | ミッションアイコンURL |
| `instruction` | `String` | ミッションの説明 |
| `actionCode` | `String` | ミッションのアクションコード |
| `notificationtype` | `NotificationType` | 通知タイプ |
| `point` | `Int` | 申請可能なポイント合計 |
| `pointsPerClaim` | `Int` | 1回の申請あたりのポイント |
| `unclaimedTimes` | `Int` | 未申請の達成回数 |
| `getAchievedDate()` | `Date?` | 達成日 |

### MemberPointRank

| プロパティ | 型 | 説明 |
|---|---|---|
| `memberPoints` | `Int` | ユーザーの楽天会員ポイント合計 |
| `memberRank` | `String` | ユーザーの楽天会員ランク |

### PointHistory / PointRecord

`PointHistory` は `getPointHistory()` 経由でアクセスする `PointRecord` オブジェクトのリストをラップします。

| `PointRecord` プロパティ | 説明 |
|---|---|
| `point` | 獲得ポイント |
| `month` | 月の文字列 |

---

## エラー

### SDKError

| ケース | 説明 |
|---|---|
| `noMissionFound` | ミッションリストが空です |
| `missionReachedCap` | ミッションはすでに上限まで達成されています |
| `noUnclaimedItemFound` | 未申請のミッションはありません |
| `sessionNotInitialized` | SDKが初期化されていません |
| `featureDisabledByUser` | ユーザーがオプトアウトしています |
| `sdkStatusNotOnline` | SDKのステータスが `.online` ではありません |
| `sdkStatusUserNotConsent` | ユーザーが同意していません |
| `unexpectedError(message:)` | 説明付きの予期しないエラー |
| `onMaintenanceMode` | SDKは現在メンテナンスモードです |

### RPGRequestError

| ケース | 説明 |
|---|---|
| `tokenExpire` | アクセストークンの有効期限切れ |
| `serverError` | サーバーに到達できません |
| `badRequest` | リクエストの形式が不正です |
| `unavailableForLegalReasons` | ユーザーが同意していません（法的ブロック） |

### RewardSDKSessionError

| ケース | 説明 |
|---|---|
| `userNotFound` | セッション開始失敗 — ユーザーが見つかりません |
| `appcodeInvalid` | SDKのステータスが `appcodeInvalid` です |
| `bundleError` | パラメータが間違っています |
| `loginRequired` | 先にログインが必要です |
| `cannotRetrieveSessionToken` | セッショントークンを取得できませんでした — セッションを再起動してください |