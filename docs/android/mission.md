# Mission Achievement

To complete a mission, your app needs to log a mission action using the Post Action API. Once a mission is achieved, the SDK automatically shows a notification UI to prompt the user to claim their points.

## Post Action

Call `logAction` with the action code provided in the Reward SDK Developer Portal.

**Callback**
```kotlin
RakutenReward.logAction("<actionCode>", {
    // success
}, {
    // failed
})
```

**Coroutine**
```kotlin
val result = RakutenRewardCoroutine.logAction("<actionCode>")
```

## Notification UI

When a mission is achieved, the SDK displays a notification UI based on the type configured in the Developer Portal.

| Notification Type | Behavior |
|---|---|
| Modal | SDK-provided modal dialog |
| Banner | SDK-provided banner |
| Small Ad Banner | SDK-provided small ad banner |
| Big Ad Banner | SDK-provided large ad banner |
| Custom | Developer builds and controls the UI |
| No UI | No notification is shown |

### Modal and Banner

![Modal notification](/assets/android/modal.jpeg) ![Banner notification](/assets/android/banner.jpeg)

The banner UI was updated in v6.0.0:

![New Banner UI](/assets/android/banner_new.png)

### Ad Banners

![Small Ad Banner](/assets/android/ad_banner_small.png) ![Big Ad Banner](/assets/android/ad_banner_big.png)

### Disable notification UI

To suppress all notification UI globally:

```kotlin
RakutenRewardConfig.setUiEnabled(false)
```

## Claiming Points

After the notification appears, the user taps it to claim their points. The SDK then shows a claim status UI.

![Claim view](/assets/android/claim_view.png)

### Custom notification type

For the **Custom** notification type, you are responsible for showing UI and triggering the claim. Implement `onUnclaimedAchievement` in your `RakutenRewardListener`:

```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        // Show your custom UI on the main thread
    }
}
```

When the user is ready to claim, call `claim()` on the `MissionAchievementData` object:

```kotlin
achievement.claim({
    // claim success
}, {
    // claim failed
})
```
