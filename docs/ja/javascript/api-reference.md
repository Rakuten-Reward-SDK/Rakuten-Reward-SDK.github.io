# APIリファレンス

## 初期化

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `init` | Yes | `SDKInitParams` | `void` | Mission SDKを初期化します |

### SDKInitParams

| キー | 型 | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| `appKey` | `string` | 必須 | | Developer PortalのアプリケーションKey |
| `language` | `string` | 任意 | `'ja'` | UI言語（`'ja'`, `'en'`, `'zh-TW'`, `'zh-CN'`, `'ko-KR'`） |
| `uiEnabled` | `boolean` | 任意 | `true` | ミッション達成通知UIの表示/非表示 |
| `sdkPortalEnabled` | `boolean` | 任意 | `true` | SDKポータルUIの有効/無効 |
| `featureEnabled` | `boolean` | 任意 | `true` | すべてのSDK機能の有効/無効 |
| `adId` | `string` | 任意 | `''` | 広告ターゲティング用のデバイス広告ID |
| `successCallback` | `function` | 任意 | | SDKの初期化完了後に呼び出される関数 |

---

## 認証

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `getLoginUrl` | No | — | `string` | 楽天ログインURLを返します |
| `openLoginUrl` | No | — | `void` | 楽天ログインページへリダイレクトします |
| `hasUserSignedIn` | Yes | — | `boolean` | ユーザーのログイン状態を返します |
| `logout` | Yes | `options?` | `void` | ログアウトしてセッションをクリアします |
| `startSession` | Yes | `options?` | `UserPointInformation` | セッションを開始またはアクセストークンをリフレッシュします |
| `setUIEnabled` | No | `boolean` | `void` | 通知UIの有効/無効を設定します |
| `setSDKPortalEnabled` | No | `boolean` | `void` | SDKポータルの有効/無効を設定します |
| `setFeatureEnabled` | No | `boolean` | `void` | すべてのSDK機能の有効/無効を設定します |
| `displayLoginButton` | No | `elementId: string` | `void` | コンテナにSDKログインボタンをレンダリングします |

---

## ユーザー

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `getUserName` | No | — | `string` | ユーザーのフルネームを返します |
| `getUserInfo` | Yes | `options?` | `UserPointInformation` | ユーザー情報と現在のポイントを返します |
| `getMemberInfo` | Yes | `options?` | `MemberInformation` | 楽天会員ポイントとランクを返します |
| `getIsUserConsent` | No | — | `boolean` | ユーザーの同意状態を返します |
| `displayLoginElement` | No | `elementId: string` | `void` | コンテナにユーザー情報またはログインボタンをレンダリングします |

---

## ユーザー同意

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `acceptConsent` | Yes | `options?` | `void` | ユーザー同意を受け付けます |
| `displayConsentPopup` | Yes | `options?` | `void` | 同意ポップアップダイアログを表示します |
| `displayConsentBanner` | Yes | `callback?` | `void` | 同意通知バナーを表示します |

---

## ミッション

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `getMissions` | Yes | `options?` | `MissionItem[]` | 進捗付きのミッションを取得します |
| `getMissionsLite` | Yes | `options?` | `MissionItemLite[]` | 進捗なしのミッションを取得します |
| `getMissionDetails` | Yes | `missionAction, options?` | `MissionItem` | アクションコードで単一ミッションを取得します |
| `logAction` | Yes | `missionAction, options?` | `MissionLogActionResponse` | ミッションアクションをログに記録します |
| `logActionMultipleTimes` | Yes | `missionAction, times` | `MissionLogActionMultipleResponse[]` | アクションを複数回ログに記録します |
| `displayMissionList` | No | `elementId: string` | `void` | コンテナにミッションリストをレンダリングします |

---

## ポイント申請

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `getUnclaimedItems` | Yes | `options?` | `UnclaimedItem[]` | 未申請ポイントアイテムを取得します |
| `claimPointMission` | Yes | `pointActionData, options?` | `ClaimPointResponse` | 達成済みミッションのポイントを申請します |
| `displayUnclaimedItems` | No | `elementId: string` | `void` | コンテナに未申請アイテムリストをレンダリングします |

---

## ポイント履歴

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `getPointHistory` | Yes | `options?` | `PointHistory[]` | 過去3ヶ月のポイント履歴を取得します |
| `getCurrentPoints` | Yes | `options?` | `CurrentPoints` | ユーザーの現在のポイントを取得します |

---

## SDKポータル

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `displaySDKPortal` | No | `options?` | `void` | SDKポータルポップアップを開きます |
| `displayPortalButton` | No | `elementId, options?` | `void` | ポータルを開くボタンをレンダリングします |
| `displayRewardIcon` | No | `elementId, iconOptions, options?` | `void` | ポータルを開くフローティングリワードアイコンをレンダリングします |
| `openFaqUrl` | No | — | `void` | FAQページを新しいタブで開きます |
| `openTncUrl` | No | — | `void` | 利用規約ページを新しいタブで開きます |
| `openPrivacyUrl` | No | — | `void` | プライバシーポリシーページを新しいタブで開きます |

---

## その他

| 関数 | 非同期 | パラメータ | レスポンス | 説明 |
|---|---|---|---|---|
| `getVersion` | No | — | `string` | SDKのバージョンを返します（例：`1.5.0`） |

---

## データモデル

### MissionActionData

| キー | 型 | 必須 | 説明 |
|---|---|---|---|
| `actionCode` | `string` | 必須 | ミッションアクションコード |
| `forceDisplayConsentPopup` | `boolean` | 任意 | アクションログ前に同意ポップアップを強制表示 |

### PointActionData

| キー | 型 | 必須 | 説明 |
|---|---|---|---|
| `actionCode` | `string` | 必須 | ミッションアクションコード |
| `achievedDateStr` | `string` | 必須 | 達成日 — `YYYYMMDD` 形式（例：`20231231`） |

### UserPointInformation

| キー | 型 | 説明 |
|---|---|---|
| `unclaimedPoints` | `number` | ユーザーの未申請ポイント |
| `currentPoints` | `number` | ユーザーの現在のポイント |

### MemberInformation

| キー | 型 | 説明 |
|---|---|---|
| `memberPoints` | `number` | 現在の楽天会員ポイント |
| `memberRank` | `number` | 楽天会員ランク |

### MissionItem

| キー | 型 | 説明 |
|---|---|---|
| `actionCode` | `string` | ミッションアクションコード |
| `iconurl` | `string` | ミッションアイコンURL |
| `instruction` | `string` | ミッションの説明 |
| `condition` | `string` | 達成条件 |
| `notificationtype` | `NotificationType` | 通知UIタイプ |
| `point` | `number` | 付与ポイント数 |
| `enddatestr` | `string` | 終了日 — `YYYYMMDD` 形式 |
| `reachedCap` | `boolean` | 上限に達しているかどうか |
| `times` | `number` | 必要なアクション回数 |
| `progress` | `number` | 現在のアクション回数 |

### MissionItemLite

`progress` と `reachedCap` を除いた `MissionItem` と同じです。

### MissionLogActionResponse

| キー | 型 | 説明 |
|---|---|---|
| `mission` | `MissionItemComplete` | ミッションの詳細 |
| `success` | `boolean` | アクションログが成功したかどうか |
| `achieved` | `boolean` | ミッションが達成されたかどうか |
| `member` | `{ unclaimed: number }` | ユーザーの未申請ポイント合計 |

### UnclaimedItem

| キー | 型 | 説明 |
|---|---|---|
| `actionCode` | `string` | ミッションアクションコード |
| `actionPointName` | `string` | ミッション名 |
| `unclaimedPoints` | `number` | 申請可能なポイント合計 |
| `pointsPerClaim` | `number` | 1回の申請あたりのポイント |
| `unclaimedTimes` | `number` | 未申請の達成回数 |
| `achievedDate` | `string` | 達成日 — `YYYY-MM-DD` 形式 |
| `notificationType` | `NotificationType` | 通知タイプ |
| `claimPointMission` | `function` | ポイントを申請するための関数 |

### ClaimPointResponse

| キー | 型 | 説明 |
|---|---|---|
| `actionCode` | `string` | ミッションアクションコード |
| `claimTargetDate` | `number` | 申請日 — `YYYYMMDD` 形式 |
| `pointClaimed` | `number` | 申請したポイント数 |

### PointHistory

| キー | 型 | 説明 |
|---|---|---|
| `points` | `number` | その月に獲得したポイント |
| `month` | `string` | 月 — `YYYYMM` 形式 |

### CurrentPoints

| キー | 型 | 説明 |
|---|---|---|
| `date` | `string` | 日付 — `YYYY-MM-DD` 形式 |
| `points` | `number` | 現在のポイント |

### RewardIconOptions

| キー | 型 | デフォルト | 説明 |
|---|---|---|---|
| `position` | `string` | `'topRight'` | アイコンの位置（`'topLeft'`, `'topRight'`, `'bottomLeft'`, `'bottomRight'`） |
| `width` | `number` | `48` | アイコンの幅（px） |
| `height` | `number` | `48` | アイコンの高さ（px） |

### NotificationType

`'MODAL' | 'BANNER' | 'BANNER_50' | 'BANNER_250' | 'CUSTOM' | 'NONE'`

---

## エラーコード

| コード | 説明 |
|---|---|
| `error_not_initialized` | SDKが初期化されていません |
| `error_not_login` | ユーザーがログインしていません |
| `error_not_start_session` | セッションが開始されていません |
| `error_feature_setting_disabled` | SDK機能が無効になっています |
| `error_ui_setting_disabled` | 通知UIが無効になっています |
| `error_user_not_consent` | ユーザーが同意していません |
| `error_action_still_invalid` | アクションログが一時的に無効です（不正防止） |
| `error_not_join_mission` | ユーザーがミッションに参加していません |
| `error_logout_failed` | ローカルストレージはクリアされましたがサーバーのログアウトに失敗しました |
