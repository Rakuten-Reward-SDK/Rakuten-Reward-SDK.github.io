# ユーザー同意

## 概要

ログインしているユーザーは、ミッション機能にアクセスする前に、楽天リワードSDKの利用規約とプライバシーポリシーに同意する必要があります。同意が得られるまで、ミッション関連のAPIは失敗し、SDKのステータスは `USER_NOT_CONSENT` になります。

同意ダイアログを表示するタイミングはアプリ側が決定します。SDKが自動的に表示することはありません。

## 同意をリクエストする

`requestForConsent` を呼び出すと同意ダイアログが表示されます。すでに同意済みの場合はダイアログは表示されず、コールバックが即座に `CONSENT_PROVIDED` を返します。

```kotlin
RakutenReward.requestForConsent { status ->
    // 同意ステータスを確認
}
```

![同意ダイアログ](/assets/android/ja/consent-dialog.png)

### 同意ステータス一覧

| ステータス | 説明 |
|---|---|
| `CONSENT_PROVIDED` | ユーザーが同意した |
| `CONSENT_NOT_PROVIDED` | ユーザーがまだ同意していない |
| `CONSENT_FAILED` | APIリクエストエラー |
| `CONSENT_PROVIDED_RESTART_SESSION_FAILED` | 同意したがセッション再起動に失敗した |

## 通知バナー

軽量なプロンプトとして、バナーを表示することもできます。バナーは同意がまだ得られていない場合のみ表示され、タップすると同意ダイアログが開きます。

```kotlin
RakutenReward.showConsentBanner { status ->
    // 同意ステータスを確認
}
```

![同意バナー](/assets/android/ja/consent-banner.png)

## 推奨事項

> ミッションアクションを実行しようとしているページで同意UIを表示することをお勧めします。これにより、ユーザーができるだけ早くプロンプトを受け取り、ミッション進捗を取りこぼすことがなくなります。

そのページで `RakutenRewardListener` の `onSDKStatusChanged` を実装し、ステータスが `USER_NOT_CONSENT` の場合に同意ダイアログまたは通知バナーを表示します。

**同意ダイアログ**
```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.USER_NOT_CONSENT) {
        RakutenReward.requestForConsent()
    }
}
```

**通知バナー**
```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.USER_NOT_CONSENT) {
        RakutenReward.showConsentBanner()
    }
}
```
