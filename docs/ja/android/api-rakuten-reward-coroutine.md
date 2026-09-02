# RakutenReward

`RakutenReward` クラスはリワードSDKのメインの設定や機能を提供しています。

## プロパティ

| プロパティ名 | 説明 |
|---|---|
| appCode | アプリケーションキー |
| lastFailed | 最後にエラーの発生したダイナミックAPIの情報を取得する |
| status | リワードSDKの状態 |
| tokenType | ログインオプションを切り替える |
| user | ユーザーデータ |
| version | リワードSDKのバージョン |

## 公開メソッド

### ミッションリスト
ミッション一覧を取得します。`MissionData` オブジェクトのリストを返します。

```kotlin
RakutenReward.getMissions({ missions ->
    // 成功
}) {
    // 失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<List<MissionData>> = RakutenRewardCoroutine.getMissions()
```

### ミッションリストライト版
軽量版ミッション一覧を取得します。`MissionLiteData` オブジェクトのリストを返します。

```kotlin
RakutenReward.getMissionsLite({ missions ->
    // 成功
}) {
    // 失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<List<MissionLiteData>> = RakutenRewardCoroutine.getMissionsLite()
```

### ミッションの詳細
特定のミッション詳細を取得します。`MissionData` オブジェクトを返します。

```kotlin
RakutenReward.getMissionDetails("<actionCode>", { mission ->
    // 成功
}) {
    // 失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<MissionData> = RakutenRewardCoroutine.getMissionDetails("<actionCode>")
```

### ポイント履歴
直近3ヶ月のポイント履歴を取得します。`RakutenRewardPointHistory` オブジェクトを返します。

```kotlin
RakutenReward.getPointHistory({ pointHistory ->
    // 成功
}) {
    // 失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<RakutenRewardPointHistory> = RakutenRewardCoroutine.getPointHistory()
```

### 未獲得ミッションリスト
未獲得のミッション一覧を取得します。`MissionAchievementData` オブジェクトのリストを返します。

```kotlin
RakutenReward.getUnclaimedItems({ unclaimed ->
    // 成功
}) {
    // 失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<List<MissionAchievementData>> = RakutenRewardCoroutine.getUnclaimedItems()
```

### Init API
リワードSDKを初期化します。バージョン3.3.0以降では手動初期化は不要です。

```kotlin
RakutenReward.init("<appCode>")
```

RIDログインオプションの場合（推奨）:
```kotlin
val tokenProvider = object: RewardTokenProvider {
    override suspend fun getAccessToken(): String {
        return if (isUserLoggedIn()) {
            yourAuthManager.getAccessToken()
        } else {
            ""
        }
    }
}
RakutenReward.init("<appCode>", tokenProvider)
```

### アクションを送信する
ミッションアクションを記録します。

```kotlin
RakutenReward.logAction("actionCode", {
    // 送信成功
}) {
    // 送信失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<Unit> = RakutenRewardCoroutine.logAction("actionCode")
```

### 会員情報
最新の会員情報を取得します。`RakutenRewardUser` オブジェクトを返します。

```kotlin
RakutenReward.memberInfo({ user ->
    // 成功
}) {
    // 失敗
}
```

コルーチン版:
```kotlin
val result: RewardApiResult<RakutenRewardUser> = RakutenRewardCoroutine.memberInfo()
```

### 楽天リワードのページを開く
各種SDKページを開きます。

```kotlin
// ヘルプページ
RakutenReward.openHelpPage()

// 利用規約
RakutenReward.openTCPage()

// プライバシーポリシー
RakutenReward.openPrivacyPage()
```

### クッキーをセットする
楽天アプリケーションで取得した広告用クッキーを設定します。

```kotlin
// Rzクッキー
RakutenReward.setRz("cookie")

// Rpクッキー
RakutenReward.setRp("cookie")

// Raクッキー
RakutenReward.setRa("cookie")
```

### 利用規約への同意をリクエスト
利用規約同意ダイアログを表示します。

```kotlin
RakutenReward.requestForConsent { status ->
    // 同意ステータスを確認
}
```

### 通知バナーを表示する
利用規約同意通知バナーを表示します。

```kotlin
RakutenReward.showConsentBanner {
    // 同意ステータスを確認
}
```

### SDKセッションを開始
SDKセッションを手動で開始します。`RewardTokenProvider`使用時は不要です。

```kotlin
RakutenReward.startSession()
```