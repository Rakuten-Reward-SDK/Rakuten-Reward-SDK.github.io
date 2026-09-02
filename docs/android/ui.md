# Built-in UI

The Rakuten Reward SDK includes ready-to-use UI components so you don't need to build a reward interface from scratch. To use them, make sure you have imported the `rewardsdknative-ui` module.

## SDK Portal

The SDK Portal gives users a full view of their reward status — active missions, unclaimed rewards, current points, and point history.

### Open the portal

```kotlin
RakutenReward.openSDKPortal(
    isPortalOpenedCallback = { result ->
        when (result) {
            is Failed -> {
                // Failed to launch — check result.error for the cause
            }
            is Success -> {
                // Portal launched successfully
            }
        }
    },
    activityResultCallback = {
        // Portal closed by user
    }
)
```

`isPortalOpenedCallback` returns the launch result, and `activityResultCallback` is called when the portal is closed by the user.

### Launch error codes

| Error Code | Reason |
|---|---|
| `SDKNOTACTIVE` | SDK is opted out |
| `USER_NOT_CONSENT` | User has not provided consent or declined the consent dialog |
| `INVALIDREQUEST` | No Activity reference available — make sure the SDK is started in your Activity. See [Start SDK in Activity](./integration#start-sdk-in-activity) |

### Portal screenshots

![Portal screen 1](/assets/android/portal1.png) <img src="/assets/android/portal2.png" alt="Mission List" width="310">

![Portal screen 3](/assets/android/portal3.png) ![Portal screen 4](/assets/android/portal4.png)

![Portal screen 5](/assets/android/portal5.png)

## Reward Button

The SDK also provides an official `RewardButton` — a button that opens the SDK Portal. It automatically reflects the SDK session state (grayed out when offline or disabled) and shows an unclaimed rewards badge.

### Add to your layout

```xml
<com.rakuten.gap.ads.mission_ui.ui.reward.RewardButton
    android:layout_width="60dp"
    android:layout_height="60dp"
    app:badge_position="top_right"
    app:button_style="dark"
    app:show_badge="true" />
```

### XML attributes

| Attribute | Related method |
|---|---|
| `badge_position` | `setBadgePosition(BadgePosition)` |
| `button_style` | `setButtonStyle(RewardButtonStyle)` |
| `show_badge` | `setBadgeVisible(Boolean)` |

### Public methods

| Method | Description |
|---|---|
| `setBadgePosition(position: BadgePosition)` | Set the badge position |
| `setBadgeVisible(visible: Boolean)` | Show or hide the unclaimed count badge |
| `setButtonStyle(buttonStyle: RewardButtonStyle)` | Set the button style |
| `setCustomImage(@DrawableRes resourceId: Int)` | Set a custom button image |

### Button styles

| | Dark | Light |
|---|---|---|
| Preview | ![dark](/assets/android/button/dark.png) | ![light](/assets/android/button/light.png) |

### Badge positions

| TOP_LEFT | TOP_RIGHT | CENTER | BOTTOM_LEFT | BOTTOM_RIGHT |
|:---:|:---:|:---:|:---:|:---:|
| ![top_left](/assets/android/button/top_left.png) | ![top_right](/assets/android/button/top_right.png) | ![center](/assets/android/button/center.png) | ![bottom_left](/assets/android/button/bottom_left.png) | ![bottom_right](/assets/android/button/bottom_right.png) |