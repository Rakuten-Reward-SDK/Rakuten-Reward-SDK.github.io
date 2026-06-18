# Built-in UI

## SDKポータル

SDKポータルは、ユーザーがアクティブなミッションと進捗の確認、未申請リワードの申請、ポイント履歴の確認ができる全画面UIです。

### ポータルを開く

```swift
RakutenReward.shared.openPortal { result in
    switch result {
    case .success:
        break
    case .failure(let error):
        // SDKError — 例: .sdkStatusNotOnline, .featureDisabledByUser
    }
}
```

::: info
ユーザーがまだ同意していない場合、`openPortal` はポータルを表示する前に自動的に同意フローを処理します。
:::

### ポータルのスクリーンショット

![ポータル画面1](/assets/ios/portal1.png) ![ポータル画面2](/assets/ios/portal2.png)

![ポータル画面3](/assets/ios/portal3.png) ![ポータル画面4](/assets/ios/portal4.png)

![ポータル画面5](/assets/ios/portal5.png) ![ポータル画面6](/assets/ios/portal6.png)

### ポータルの表示状態を検知する

カスタムミッション通知などの機能は、ポータルが開いている間は表示すべきではありません。UIを表示する前にフラグを確認します：

```swift
if !RewardConfiguration.isPortalPresent {
    // カスタム通知UIを表示しても安全
}
```

ポータルの表示状態の変化を購読します：

```swift
RakutenReward.shared.didUpdateIsPortalPresentedStatus = { isPresented in
    // UIを適宜更新
}
```

## サポートページ

SDKが提供するヘルプや法的ページを内蔵ミニブラウザで開きます：

```swift
// ヘルプ
RakutenReward.shared.openSupportPage(.help)

// Rewardの利用規約
RakutenReward.shared.openSupportPage(.termsCondition)

// Rewardのプライバシーポリシー
RakutenReward.shared.openSupportPage(.privacyPolicy)
```
