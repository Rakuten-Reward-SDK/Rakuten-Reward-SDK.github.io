# Integration

## Initialize SDK

Initialize the SDK once at app launch — in your `AppDelegate` or SwiftUI `App` struct — using the App Code provided in the Rakuten Reward Developer Portal.

```swift
RakutenReward.shared.initSdkThirdParty(appCode: "YOUR_APP_CODE")
```

| Parameter | Description |
|---|---|
| `appCode` | Application Key from the Rakuten Reward Developer Portal |

## Login

To use Rakuten Reward SDK features, the end user must be logged in to their Rakuten account. The SDK provides a built-in login UI via `RakutenAuth`.

### Open the login page

Check login status and present the login page if needed:

```swift
if !RakutenReward.shared.isLogin() {
    RakutenReward.shared.openLoginPage { result in
        switch result {
        case .logInCompleted:
            // User is logged in; SDK session is managed automatically
        case .dismissByUser:
            // User closed the login page; try again later
        case .failToShowLoginPage:
            // Could not present the login UI
        }
    }
}
```

### Check login status

```swift
RakutenReward.shared.isLogin() // Returns true if the user is logged in
```

## Logout

Call `logout` whenever the user signs out of your app. This is required to properly clear the user's token and cached data.

```swift
RakutenReward.shared.logout { }
```

::: warning
Always call `logout()` when the user signs out. Skipping this will leave stale token and user data in the SDK.
:::

## Getting User Information

The current user is available via `RakutenReward.shared.user` once the SDK status is `.online`.

```swift
let user = RakutenReward.shared.user

// User's display name
user?.getName()

// Reward SDK points and Rakuten member rank
user?.currentPointRank()
```

### SDKUser Properties

| Property / Method | Description |
|---|---|
| `signIn` | `true` if the user is signed in |
| `point` | Reward SDK points balance |
| `unclaimedMissionCount` | Number of unclaimed achievements |
| `getName()` | User's display name |
| `currentPointRank()` | Returns `MemberPointRank` with member points and rank |

### MemberPointRank

| Property | Type | Description |
|---|---|---|
| `memberPoints` | `Int` | User's total Rakuten member points |
| `memberRank` | `String` | User's Rakuten member rank |

Subscribe to user updates to refresh your UI when points or rank change:

```swift
RakutenReward.shared.didUpdateUser = { user in
    // Refresh your UI with updated points and rank
}
```

You can also observe updates via `NotificationCenter`:

```swift
NotificationCenter.default.addObserver(
    forName: RakutenReward.userUpdatedNotification,
    object: nil,
    queue: .main
) { _ in
    // User data updated
}
```

## Point History

Get the user's reward point history for the past three months:

```swift
RakutenReward.shared.getPointHistory { result in
    switch result {
    case .success(let history):
        let records = history.getPointHistory() // [PointRecord]
        for record in records {
            print("\(record.month): \(record.point) pts")
        }
    case .failure(let error):
        break
    }
}
```

## SDK Status

The SDK reports its state via `RakutenReward.shared.status` and the `didUpdateStatus` callback.

| Status | Meaning |
|---|---|
| `.online` | SDK is ready; user info is up to date |
| `.offline` | Initialization has not completed or failed |
| `.appcodeInvalid` | The app code you passed is wrong |
| `.tokenExpired` | Token expired — prompt user to log in again |
| `.userNotConsent` | User has not accepted the Reward terms of service |