# Configuration

`RewardConfiguration` is the configuration class for the Reward SDK. Use it to control SDK behaviour such as opt-out, notification UI, theming, and language.

All properties and methods are static — access them directly on `RewardConfiguration`.

## API Reference

| API | Description | Example |
|---|---|---|
| `isUserOptingOut` | Returns the current opt-out status. `true` means the user is opted out and SDK features will not work. | `RewardConfiguration.isUserOptingOut` |
| `isUserSettingUIEnabled` | Returns whether mission achievement notification UI is enabled | `RewardConfiguration.isUserSettingUIEnabled` |
| `isDebug` | Enable verbose SDK debug logging. See [Debugging](./debugging) | `RewardConfiguration.isDebug = true` |
| `isPortalPresent` | `true` if the SDK Portal is currently displayed (read-only) | `RewardConfiguration.isPortalPresent` |
| `isUsingSDKPortal` | Enable or disable the SDK Portal. Defaults to `true`. | `RewardConfiguration.isUsingSDKPortal = true` |
| `setAppLanguage(_:)` | Set the language for SDK UI. See [App Language](./app-language) | `RewardConfiguration.setAppLanguage("ja")` |

## Opt-out

When a user opts out, all SDK features are disabled and no missions or notifications will be shown.

```swift
// Opt the user out
RewardConfiguration.isUserOptingOut = true

// Opt the user back in
RewardConfiguration.isUserOptingOut = false
```

## Notification UI

Disable or re-enable the mission achievement notification UI globally:

```swift
// Disable all notification UI
RewardConfiguration.isUserSettingUIEnabled = false

// Re-enable
RewardConfiguration.isUserSettingUIEnabled = true
```

## SDK Portal

The SDK Portal is enabled by default. Set `isUsingSDKPortal` to `false` if your app does not use it:

```swift
RewardConfiguration.isUsingSDKPortal = false
```
