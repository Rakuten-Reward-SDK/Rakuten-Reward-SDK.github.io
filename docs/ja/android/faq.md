# FAQ

## 一般

### Reward SDKはJavaまたはKotlinで書かれていますか？アプリが完全にJavaの場合、問題はありますか？

<details>
<summary>回答</summary>

Reward SDKは完全にKotlinで書かれていますが、Javaもサポートしています。Javaからの呼び出しには一部APIの呼び方に違いがある場合があります。

</details>

### 開発・テスト用にステージング環境にアクセスできますか？

<details>
<summary>回答</summary>

いいえ、現在、開発者向けにステージング環境は提供していません。開発・テストには開発モードまたはテストアカウントをご使用ください。

</details>

### Reward SDKはエンドユーザーの広告ID（ADID）を収集しますか？

<details>
<summary>回答</summary>

はい、Reward SDKは広告最適化のためにユーザーの広告ID（ADID）を収集します。

</details>

### エンドユーザーの広告ID（ADID）の収集をオプトアウトする方法は？

<details>
<summary>回答</summary>

Reward SDKはGoogle Play広告識別子ライブラリを使用してADIDを収集します。収集を停止するには以下の変更を行ってください。

`app/build.gradle` に以下を追加して広告識別子ライブラリを除外します。

```groovy
implementation ('com.rakuten.android:rewardsdknative-ui:x.x.x') {
    exclude group: 'com.google.android.gms', module: 'play-services-ads-identifier'
}
```

`AndroidManifest.xml` にADIDパーミッションを削除するよう追加します。

```xml
<uses-permission
    android:name="com.google.android.gms.permission.AD_ID"
    tools:node="remove" />
```

ADIDが収集されなくなったことを確認するには、Logcatで以下のログを確認してください。

![Logcatログ](/assets/android/ja/log.png)

</details>

### Reward SDK v6.1.0を統合したところ、難読化を有効にするとアプリがクラッシュします

![クラッシュログ](/assets/android/ja/crash-log.png)

影響を受けるSDKバージョン：6.1.0、6.2.0、7.0.0。この問題は **7.0.1** で修正されています。

<details>
<summary>回答</summary>

SDKバージョンをアップグレードできない場合は、`proguard-rules.pro` に以下を追加してください。

```
-keep class com.rakuten.gap.ads.mission_remote.** { *; }
```

</details>

---

## ログイン関連

### Rakuten Authログインとは何ですか？

<details>
<summary>回答</summary>

`RakutenAuth` ログインオプションは、楽天のログインSDKを使用していないサードパーティアプリ向けです。そのようなアプリが楽天リワードのユーザー認証を行うために使用します。

</details>

### `RakutenAuth.openLoginPage` はFragmentから呼び出せますか？

<details>
<summary>回答</summary>

はい。`requireActivity()` の代わりにFragmentインスタンスを渡すと、`onActivityResult` がFragment内でトリガーされます。

```kotlin
class TestLoginFragment : Fragment() {
    companion object {
        private const val LOGIN_REQ_CODE = 533
    }

    private fun login() {
        RakutenAuth.openLoginPage(this, LOGIN_REQ_CODE)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == LOGIN_REQ_CODE && resultCode == RESULT_OK) {
            RakutenAuth.handleActivityResult(data, object : LoginResultCallback {
                override fun loginSuccess() { }
                override fun loginFailed(e: RakutenRewardAPIError) { }
            })
        }
    }
}
```

> `requireActivity()` を渡した場合は、`onActivityResult` はFragmentではなくActivityでトリガーされます。

</details>

---

## 実装関連

### APIが常に `SDKNOTACTIVE` を返します。原因は何ですか？

<details>
<summary>回答</summary>

SDKがまだ開始されていないことを意味します。以下を確認してください。

1. `AndroidManifest.xml` にアプリキーが正しく設定されているか確認してください。

```xml
<application>
    <meta-data
        android:name="com.rakuten.gap.ads.mission_core.appKey"
        android:value="{Your App Key}" />
</application>
```

2. ActivityがSDKを開始するためのいずれかのオプションを使用しているか確認してください。[ActivityでSDKを開始する](./integration#activityでsdkを開始する)を参照してください。

3. APIを呼び出す前にSDKのステータスが `ONLINE` になるまで待ってください。

```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.ONLINE) {
        // SDKの準備が完了しました。ここでAPIを呼び出します。
    }
}
```

</details>

### 毎日アプリを起動するミッションがあります。どのように実装すればよいですか？

<details>
<summary>回答</summary>

アクションを記録する前に、SDKのステータスが `ONLINE` になるまで待ってください。SDKが起動後にデータを同期するために時間が必要です。

```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.ONLINE) {
        RakutenReward.logAction("<actionCode>", {
            // 成功
        }) {
            // 失敗
        }
    }
}
```

</details>

### カスタム通知UIはどのように実装しますか？

<details>
<summary>回答</summary>

`logAction` が十分な回数呼び出されてミッションが達成されると、`RakutenRewardListener` の `onUnclaimedAchievement` がトリガーされます。通知タイプが `CUSTOM` であることを確認してからUIを表示してください。

```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        // メインスレッドでカスタムUIを表示
    }
}
```

</details>

### ミッション達成後のポイントはどのようにクレームしますか？

<details>
<summary>回答</summary>

`MissionAchievementData` オブジェクトの `claim()` を呼び出します。取得方法は2通りあります。

**`onUnclaimedAchievement` 経由**（CUSTOM通知タイプの場合）：

```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        achievement.claim({
            // クレーム成功
        }) {
            // クレーム失敗
        }
    }
}
```

**`getUnclaimedItems` 経由**：

```kotlin
RakutenReward.getUnclaimedItems({ unclaimList ->
    unclaimList[0].claim({
        // クレーム成功
    }) {
        // 失敗
    }
}) {
    // 失敗
}
```

</details>

### `onSDKStatusChanged` や `onUnclaimedAchievement` はどのように実装しますか？

<details>
<summary>回答</summary>

どちらも `RakutenRewardListener` のメソッドです。リスナーオブジェクトを作成してSDKに登録・解除します。

```kotlin
val listener = object : RakutenRewardListener {
    override fun onUnclaimedAchievement(achievement: MissionAchievementData) { }
    override fun onUserUpdated(user: RakutenRewardUser) { }
    override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) { }
    override fun onSDKClaimClosed(
        missionAchievementData: MissionAchievementData,
        status: RakutenRewardClaimStatus
    ) { }
}

override fun onResume() {
    super.onResume()
    RakutenReward.addRakutenRewardListener(listener)
}

override fun onPause() {
    super.onPause()
    RakutenReward.removeRakutenRewardListener(listener)
}
```

> `RakutenRewardBaseActivity` を使用している場合、この処理は自動的に行われます。必要なメソッドをオーバーライドするだけで実装できます。

</details>

### SDKポータルが閉じられたイベントを検出できますか？

<details>
<summary>回答</summary>

はい。`openSDKPortal` の `activityResultCallback` パラメーターを使用します。ユーザーがポータルを閉じると呼び出されます。

```kotlin
RakutenReward.openSDKPortal(
    isPortalOpenedCallback = { result ->
        // ポータル起動結果
    },
    activityResultCallback = {
        // ユーザーがポータルを閉じた
    }
)
```

</details>

---

## BOM

### BOMを必ず使用しなければなりませんか？

<details>
<summary>回答</summary>

いいえ。各依存関係のバージョンを手動で宣言することもできます。ただし、BOMを使用するとすべてのReward SDKライブラリのバージョンを互換性のある状態に保てるため、使用をお勧めします。

</details>

### BOMで指定されたバージョンとは異なるバージョンを使用するには？

<details>
<summary>回答</summary>

依存関係の行にバージョンを明示的に指定すると、BOMのバージョンが上書きされます。

</details>

### BOMは自動的にすべてのライブラリをアプリに追加しますか？

<details>
<summary>回答</summary>

いいえ。BOMはバージョンの整合性を管理するだけです。使用したい各ライブラリは引き続き `build.gradle` に個別の依存関係として宣言する必要があります。

</details>
