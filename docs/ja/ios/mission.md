# ミッションの達成

ミッションを達成するには、`logAction` APIを使ってミッションアクションをログに記録する必要があります。ミッションが達成されると、SDKは自動的に通知UIを表示してユーザーにポイント申請を促します。

## アクションのログ記録

Reward SDK Developer Portalで提供されるアクションコードを使って `logAction` を呼び出します。

```swift
RakutenReward.shared.logAction(actionCode: "YOUR_ACTION_CODE") { result in
    switch result {
    case .success:
        break
    case .failure(let error):
        // エラー処理
    }
}
```

## 通知UI

ミッションが達成されると、Developer Portalで設定された通知タイプに基づいてUIが表示されます。

| 通知タイプ | 動作 |
|---|---|
| `MODAL` | SDKが全画面モーダルを表示 |
| `BANNER` | SDKがトップバナーを表示 |
| `BANNER_50` | SDKが小さい広告バナーを表示 |
| `BANNER_250` | SDKが大きい広告バナーを表示 |
| `CUSTOM` | 開発者がUIを構築・制御 |
| `NONE` | 通知は表示されない |

## カスタム通知UI

**Custom** 通知タイプの場合、`didUpdateUnclaimedAchievement` コールバックを実装して独自のUIを表示します：

```swift
RakutenReward.shared.didUpdateUnclaimedAchievement = { unclaimedItem in
    guard unclaimedItem.notificationType == .CUSTOM,
          RewardConfiguration.isUserSettingUIEnabled,
          !RewardConfiguration.isPortalPresent else {
        return
    }

    DispatchQueue.main.async {
        // カスタム通知UIを表示
    }
}
```

::: info
SDKはポータルが開いている間、通知の表示をサポートしていません。必ず `RewardConfiguration.isPortalPresent` でガードしてください。
:::

## ポイントの申請

通知が表示された後、ユーザーがポイントを申請できるようにします：

```swift
RakutenReward.shared.claim(unclaimedItem: unclaimedItem) { event in
    switch event {
    case .willPresent:
        break
    case .didClaimSuccessfully(let item):
        print("\(item.point) ポイントを申請しました")
    case .didFailToClaim(let error):
        print("申請失敗: \(error)")
    case .didDismiss, .didSelfDismiss, .didDismissByUser:
        break
    case .didFailToShow(let error):
        print("申請画面を表示できませんでした: \(error)")
    case .didTriggerIchibaDeeplink(let url):
        UIApplication.shared.open(url)
    }
}
```
