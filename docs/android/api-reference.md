# API Reference

## RakutenReward
RakutenReward class provides main settings and functions of the Reward SDK.

| API Name                      | Description                                                 | Example                                                                                                     |
|-------------------------------|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| Get version                   | Get Rakuten Reward SDK Version                              | `RakutenReward.version`                                                                                     |
| Open SDK Portal               | Open SDK Portal                                             | `RakutenReward.openSDKPortal()`                                                                             |
| Open Help Page                | Open Reward SDK Help page with mini browser                 | `RakutenReward.openHelpPage()`                                                                              |
| Open Terms and Condition Page | Open Reward SDK Terms and Conditions Page with mini browser | `RakutenReward.openTCPage()`                                                                                |
| Open Privacy Policy Page      | Open Reward SDK Privacy Policy Page with mini browser       | `RakutenReward.openPrivacyPage()`                                                                           |
| Get Missions                  | Get missions                                                | `RakutenReward.getMissions( { missions -> <br> // Get Missions <br> }, { // Failed<br> })`                  |
| Get Point history             | Get 3 month user's point history                            | `RakutenReward.getPointHistory({ pointHistory -> <br> // Get Point History <br> }, { <br> // Failed <br>})` |
| Log Action                    | Post user action                                            | `RakutenReward.logAction("xxxxxx", { <br> // Success <br>}, { <br> // Failed <br>})`                        |
| Get Unclaimed Items           | Get Unclaim item list                                       | `RakutenReward.getUnclaimedItems({ missions -> <br> // Unclaim Mission List <br> }, { <br>// Error <br>})`  |
| Last failed method            | Get last failed method                                      | `RakutenReward.lastFailed`                                                                                  |
| Close Claim flow UI           | Close Claim flow UI forcibly                                | `RakutenReward.forceClaimClose()`                                                                           |
| Set Rp cookie                 | Set Rp cookie from App                                      | `RakutenReward.setRp(rp: String)`                                                                           |
| Set Rz cookie                 | Set Rz cookie from App                                      | `RakutenReward.setRz(rz: String)`                                                                           |
| Set Ra cookie                 | Set Ra cookie from App                                      | `RakutenReward.setRa(ra: String)`                                                                           |
| Add RakutenRewardListener     | Add RakutenRewardListener                                   | `RakutenReward.addRakutenRewardListener(listener)`                                                          |
| Remove RakutenRewardListener  | Remove RakutenRewardListener                                | `RakutenReward.removeRakutenRewardListener(listener)`                                                       |
| Start Session                 | Start SDK Session                                           | `RakutenReward.startSession()`                                                                              |
| Request for consent           | Request User Consent (Since v4.0.0)                         | `RakutenReward.requestForConsent { status -> // Consent status }`                                           |

## RakutenRewardCoroutine
Provides API in suspend function format.

| API Name            | Description                      | Example                                              |
|---------------------|----------------------------------|------------------------------------------------------|
| Get Missions        | Get missions                     | `RakutenRewardCoroutine.getMissions()`               |
| Get Missions Lite   | Get mission lite list            | `RakutenRewardCoroutine.getMissionsLite()`           |
| Get Mission Details | Get mission details              | `RakutenRewardCoroutine.getMissionDetails("xxxxxx")` |
| Get Point history   | Get 3 month user's point history | `RakutenRewardCoroutine.getPointHistory()`           |
| Log Action          | Post user action                 | `RakutenRewardCoroutine.logAction("xxxxxx")`         |
| Get Unclaimed Items | Get Unclaim item list            | `RakutenRewardCoroutine.getUnclaimedItems()`         |
| Member Info         | Get the latest member info       | `RakutenRewardCoroutine.memberInfo()`                |

## RakutenAuth
Handles authentication and user information.

| API Name                 | Description                                                                               | Example                                                                                        |
|--------------------------|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| Log In                   | Open Log In page                                                                          | `RakutenAuth.openLoginPage(activity: Activity, requestCode: Int)`                              |
| Check Log In             | Check if user is logged in with internal system (token not expired)                       | `RakutenAuth.hasUserSignedIn()`                                                                |
| Log Out                  | Log out from Rakuten Auth                                                                 | `RakutenAuth.logout(object : LogoutResultCallback)`                                            |
| Get Rakuten Member name  | Get Rakuten Member name                                                                   | `RakutenAuth.getUserName()`                                                                    |
| Get Rakuten Point & Rank | Load latest point & rank from server                                                      | `RakutenAuth.RakutenAuth.getUserInfo(success = { userInfo <br>-> <br>}, {<br> // Error <br>})` |

## RakutenRewardConfig
User settings configuration.

| API Name         | Description                                                             | Example                                                        |
|------------------|-------------------------------------------------------------------------|----------------------------------------------------------------|
| Get Optout       | Get Optout status                                                      | `RakutenRewardConfig.isOptedOut()`                             |
| Set Optout       | Set Optout status                                                      | `RakutenRewardConfig.setOptedOut(true)`                        |
| isUiEnabled      | Get whether Notification UI is enabled or not                           | `RakutenRewardConfig.isUiEnabled()`                            |
| setUiEnabled     | Set whether Notification UI is enabled or not                           | `RakutenRewardConfig.setUiEnabled(true)`                       |
| isDebuggable     | Set Reward SDK to be debuggable                                         | `RakutenRewardConfig.isDebuggable()`                           |
| isUsingSdkPortal | Set whether using SDK Portal or not (only available in UI module)       | `RakutenRewardConfig.isUsingSdkPortal(true)`                   |
| setAppLocale     | Set App Locale                                                          | `RakutenRewardConfig.setAppLocale(Japanese)`                   |
| getAppLocale     | Get current App Locale. By default is null                              | `RakutenRewardConfig.getAppLocale()`                           |

## Open Reward Web page
Open various web pages through the SDK:

```kotlin
// Help Page
RakutenReward.openHelpPage()

// Terms and Condition Page  
RakutenReward.openTCPage()

// Privacy Policy
RakutenReward.openPrivacyPage()
```

## Data Models

### RakutenRewardUser
User data model.

| Parameter       | Description                                     |
|-----------------|-------------------------------------------------|
| unclaimed       | Number of unclaim Point Item get from Unclaimed |
| signin          | Whether user is signed in or not                |
| point           | Point the user get from Reward Service          |
| achievementList | Mission list (not use)                          |

### RakutenAuthUserInfo
User info available for Rakuten Auth.

| Parameter | Description                     |
|-----------|---------------------------------|
| points    | Total Rakuten points of an user |
| rank      | User's Rakuten account rank     |

#### Rank (Japan only)
| Rank | Description |
|------|-------------|
| 1    | Regular     |
| 2    | Silver      |
| 3    | Gold        |
| 4    | Platinum    |
| 5    | Diamond     |

## RakutenRewardListener
SDK status change listener.

| Callback | Description                                  |
|----------|----------------------------------------------|
| `onUnclaimedAchievement(achievement: MissionAchievementData)` | When the user achieved a mission |
| `onUserUpdated(user: RakutenRewardUser)` | When user data is updated |
| `onSDKStatusChanged(status: RakutenRewardSDKStatus)` | When SDK status changes |
| `onSDKClaimClosed(missionAchievementData: MissionAchievementData, status: RakutenRewardClaimStatus)` | When claim UI closes |
| `onSDKConsentClosed()` | When consent dialog closes (v4.0.0+) |
| `onSDKConsentPresented()` | When consent dialog is shown (v5.4.0+) |
| `onSDKClaimPresented(missionAchievementData: MissionAchievementData)` | When claim UI is shown (v5.4.0+) |

## RakutenRewardSDKStatus
SDK status indicators.

| Status           | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| ONLINE           | SDK is ready and functioning normally |
| OFFLINE          | SDK is not ready (initialization failed) |
| APPCODEINVALID   | Application Key was invalid (400 bad request) |
| TOKENEXPIRED     | APIs return Token Expired error |
| USER_NOT_CONSENT | User has not provided consent yet (v4.0.0+) |

## API Data Models

### MissionData
Mission information model.

| Property         | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| name             | Mission name                                                                |
| actionCode       | Action code                                                                 |
| iconurl          | Mission icon URL                                                            |
| instruction      | Mission instructions                                                        |
| condition        | Mission conditions                                                          |
| notificationtype | Notification type (NONE, BANNER, MODAL, CUSTOM, BANNER_50, BANNER_250)     |
| point            | Points for this mission                                                     |
| enddatestr       | Mission end date in string format                                           |
| till             | Remaining days for mission                                                  |
| ext              | Extension data for mission (future use)                                     |
| reachedCap       | Whether mission reached achievement limit for today                         |
| times            | Required action times                                                       |
| progress         | Current action progress                                                     |

### RakutenRewardPointHistory
List of point history entries.

#### RakutenRewardPoint
Individual point entry.

| Property | Description             |
|----------|-------------------------|
| point    | Point value             |
| pointdate| Point date (YYYYMM)     |

### MissionAchievementData
Mission achievement information.

| Property         | Description                           |
|------------------|---------------------------------------|
| name             | Mission name                          |
| iconurl          | Icon URL                              |
| instruction      | Mission instructions                  |
| action           | Action code                           |
| custom           | Whether notification is custom        |
| notificationtype | Notification type                     |
| point            | Points awarded                        |
| unclaimed        | Number of unclaimed items             |
| achievedDate     | Mission achieved date                 |

## Error Handling
`RakutenRewardAPIError` enum class for API errors.

| Error                | Description                                                               |
|----------------------|---------------------------------------------------------------------------|
| NETWORKERROR         | Network connection error                                                  |
| INVALIDREQUEST       | Invalid parameter                                                         |
| TOKENEMPTY           | Access token not set                                                      |
| SDKNOTACTIVE         | SDK not initialized                                                       |
| TOKENEXPIRE          | Access token expired                                                      |
| UNKNOWN              | Unknown error                                                             |
| USER_NOT_CONSENT     | User hasn't provided consent                                              |
| MISSION_REACHED_CAP  | Mission achievement cap reached                                           |
| UNDER_MAINTENANCE    | Feature under maintenance                                                 |

## Last Failed Method
Information about the last failed API call.

`RakutenRewardAPILastCalled` contains API information and parameters.

| API Name           | Description                |
|--------------------|----------------------------|
| MEMBERINFO         | memberInfo                 |
| LOGACTION          | logAction                  |
| GETUNCLAIM         | getUnclaimedItems          |
| POINTHISTORY       | getPointHistory            |
| CLAIM              | claim (MissionAchievementData) |
| GETMISSIONLIST     | getMissions                |

## RakutenRewardClaimStatus
Claim status indicators.

| Status   | Description           |
|----------|-----------------------|
| NOTYET   | Claim not started     |
| SUCCESS  | Claim succeeded       |
| FAIL     | Claim failed          |

## Custom UI Support
To support custom mission achievement UI:

1. Implement `RakutenRewardListener` to receive achievement callbacks
2. Check for custom notifications:
```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        // Show custom UI
    }
}
```
3. Handle point claiming:
```kotlin
achievement.claim({}, {})
```

## Cookie Management
Set Rakuten cookies manually (v2.2.0+):

```kotlin
// Set Rp cookie
RakutenReward.setRp("cookie")

// Set Rz cookie
RakutenReward.setRz("cookie")
```

## Handling Back Button
To close claim UI with back button:

```kotlin
RakutenReward.forceClaimClose()
```