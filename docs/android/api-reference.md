# API Reference

## RakutenReward
RakutenReward class is to provide main settings and main functions of Reward SDK

## RakutenRewardCoroutine
`RakutenRewardCoroutine` class provide API in suspend function

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
RakutenAuth class is to provide authentication related functions

## RakutenRewardConfig
RakutenRewardConfig is user setting class.

| API Name         | Description                                                             | Example                                                        |
|------------------|-------------------------------------------------------------------------|----------------------------------------------------------------|
| Get Optout       | Get Optout status <br>true : Optout (Reward SDK function does not work) | `RakutenRewardConfig.isOptedOut()`                             |
| Set Optout       | Set Optout status                                                       | `RakutenRewardConfig.setOptedOut(true)`                        |
| isUiEnabled      | Get whether Notification UI is enabled or not                           | `RakutenRewardConfig.isUiEnabled()`                            |
| setUiEnabled     | Set whether Notification UI is enabled or not                           | `RakutenRewardConfig.setUiEnabled(true)`                       |
| isDebuggable     | Set Reward SDK to be debuggable                                         | `RakutenRewardConfig.isDebuggable()`                           |
| isUsingSdkPortal | Set whether using SDK Portal or not (only available in UI module)       | `RakutenRewardConfig.isUsingSdkPortal(true)`                   |
| setAppLocale     | Set App Locale                                                          | `RakutenRewardConfig.setAppLocale(Japanese)`                   |
| getAppLocale     | Get current App Locale. By default is null                              | `RakutenRewardConfig.getAppLocale()`                           |

## Open Reward Web page
Open Reward Web page

## RakutenRewardListener
RakutenRewardListener is Rakuten Reward SDK basic function status change listener

| Name                                                                                                   | Description                                  |
|--------------------------------------------------------------------------------------------------------|----------------------------------------------|
| fun onUnclaimedAchievement(achievement : MissionAchievementData)                                       | When the user achieved the mission           |
| fun onUserUpdated(user : RakutenRewardUser)                                                            | When the user data is updated                |
| fun onSDKStatusChanged(status : RakutenRewardSDKStatus)                                                | When the SDK status changed                  |
| fun onSDKClaimClosed(missionAchievementData: MissionAchievementData, status: RakutenRewardClaimStatus) | When the claim UI closed                     |
| fun onSDKConsentClosed()                                                                               | When consent dialog is closed (Since v4.0.0) |
| fun onSDKConsentPresented()                                                                            | When consent dialog is shown (Since v5.4.0)  |
| fun onSDKClaimPresented(missionAchievementData: MissionAchievementData)                                | When the claim UI is shown (Since v5.4.0)    |

For usage, please take a look sample application codes.

## RakutenRewardSDKStatus
RakutenRewardSDKStatus enum class

## RakutenRewardUser
RakutenRewardUser data class

## RakutenRewardPoint
List of RakutenRewardPoint data class

## API Errors
RakutenRewardAPIError enum class

| Enum                | Description                                                               |
|---------------------|---------------------------------------------------------------------------|
| NETWORKERROR        | Network connection error                                                  |
| INVALIDREQUEST      | Parameter is invalid                                                      |
| TOKENEMPTY          | Access token is not set                                                   |
| SDKNOTACTIVE        | SDK is not initialized yet                                                |
| TOKENEXPIRE         | Access token expired to access API <br> Need to refresh this access token |
| UNKNOWN             | Unknown error, basically not happen                                       |
| USER_NOT_CONSENT    | User haven't provide consent                                              |
| MISSION_REACHED_CAP | Mission achievement already reached cap                                   |
| UNDER_MAINTENANCE   | Feature is under maintenance                                              |

## Last Failed Method
SDK provides information about Failed method to handle error easily.