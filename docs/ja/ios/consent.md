# ユーザー同意

## 概要

ログインしているユーザーはミッション機能にアクセスする前に、Rakuten Reward SDKの利用規約とプライバシーポリシーへの同意が必要です。同意が得られるまで、ミッション関連のAPIは失敗し、SDKのステータスは `.userNotConsent` になります。

同意をいつ促すかはアプリ側が決定します — SDKが自動的に同意ダイアログを表示することはありません。

## 同意のリクエスト

`requestForConsent` を呼び出して同意ダイアログを表示します。ユーザーがすでに同意している場合、ダイアログはスキップされ、コールバックが即座に `.consentProvided` を返します。

![同意ダイアログ](/assets/ios/consent-dialog.png)

```swift
RakutenReward.shared.requestForConsent { status in
    switch status {
    case .consentProvided:
        // ユーザーが同意しました — 通常通り進めてください
    case .consentNotProvided:
        // ユーザーが同意せずに閉じました
    case .consentFailed:
        // APIエラー — 再試行するかユーザーに通知してください
    case .consentProvidedRestartSessionFailed:
        // ユーザーが同意しましたがセッション再起動に失敗しました — initSdkThirdParty を再試行してください
    case .consentUIAlreadyPresented:
        // ダイアログはすでに表示中です — 無視してください
    }
}
```

### 同意ステータス

| ステータス | 説明 |
|---|---|
| `.consentProvided` | ユーザーが同意しました |
| `.consentNotProvided` | ユーザーがまだ同意していません |
| `.consentFailed` | APIリクエストエラー |
| `.consentProvidedRestartSessionFailed` | ユーザーが同意しましたがセッション再起動に失敗しました |
| `.consentUIAlreadyPresented` | ダイアログが現在表示中です |

## 同意通知バナー

より控えめなプロンプトとして、バナーを表示することもできます。バナーはまだ同意していない場合のみ表示され、タップすると全画面の同意ダイアログが開きます。

![同意バナー](/assets/ios/consent-banner.png)

```swift
RakutenReward.shared.showConsentBanner { status in
    // 上記と同じ RakutenRewardConsentStatus の値
}
```

## 推奨事項

> ユーザーがミッションアクションを行おうとするページで同意UIを表示することを推奨します。これにより、ユーザーができるだけ早くプロンプトを受け取り、ミッションの進捗を逃さずに済みます。

SDKステータスの変化を監視し、ステータスが `.userNotConsent` のときに適切なUIを表示します：

**同意ダイアログ**
```swift
RakutenReward.shared.didUpdateStatus = { status in
    if status == .userNotConsent {
        RakutenReward.shared.requestForConsent { _ in }
    }
}
```

**通知バナー**
```swift
RakutenReward.shared.didUpdateStatus = { status in
    if status == .userNotConsent {
        RakutenReward.shared.showConsentBanner { _ in }
    }
}
```
