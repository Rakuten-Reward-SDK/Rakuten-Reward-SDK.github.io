# Mission Achievement

To complete a mission, your app needs to log a mission action using the `logAction` API. Once a mission is achieved, the SDK automatically shows a notification UI to prompt the user to claim their points.

## Post Action

Call `logAction` with the action code provided in the Reward SDK Developer Portal.

```swift
RakutenReward.shared.logAction(actionCode: "YOUR_ACTION_CODE") { result in
    switch result {
    case .success:
        break
    case .failure(let error):
        // Handle error
    }
}
```

## Notification UI

When a mission is achieved, the SDK displays a notification UI based on the type configured in the Developer Portal.

| Notification Type | Behavior |
|---|---|
| `MODAL` | SDK-provided full-screen modal |
| `BANNER` | SDK-provided top banner |
| `BANNER_50` | SDK-provided small ad banner |
| `BANNER_250` | SDK-provided large ad banner |
| `CUSTOM` | Developer builds and controls the UI |
| `NONE` | No notification is shown |

## Custom Notification UI

For the **Custom** notification type, implement the `didUpdateUnclaimedAchievement` callback to show your own UI:

```swift
RakutenReward.shared.didUpdateUnclaimedAchievement = { unclaimedItem in
    guard unclaimedItem.notificationType == .CUSTOM,
          RewardConfiguration.isUserSettingUIEnabled,
          !RewardConfiguration.isPortalPresent else {
        return
    }

    DispatchQueue.main.async {
        // Present your custom notification UI
    }
}
```

::: info
The SDK does not support showing notifications while the portal is open. Always guard with `RewardConfiguration.isPortalPresent`.
:::

## Claiming Points

After the notification appears, prompt the user to claim their points:

```swift
RakutenReward.shared.claim(unclaimedItem: unclaimedItem) { event in
    switch event {
    case .willPresent:
        break
    case .didClaimSuccessfully(let item):
        print("Claimed \(item.point) points")
    case .didFailToClaim(let error):
        print("Claim failed: \(error)")
    case .didDismiss, .didSelfDismiss, .didDismissByUser:
        break
    case .didFailToShow(let error):
        print("Could not show claim screen: \(error)")
    case .didTriggerIchibaDeeplink(let url):
        UIApplication.shared.open(url)
    }
}
```
