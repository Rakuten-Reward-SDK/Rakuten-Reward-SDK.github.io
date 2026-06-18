# API Reference

## RakutenReward

The main entry point for all SDK operations. Access via `RakutenReward.shared`.

### Initialization

| Method | Description |
|---|---|
| `initSdkThirdParty(appCode:)` | Initialize for RakutenAuth (SDK-provided login) |

### Authentication

| Method | Description |
|---|---|
| `openLoginPage(_:)` | Present the SDK-provided login page |
| `isLogin()` | Returns `true` if the user is logged in and the token is valid |
| `logout(_:)` | Log out and clear the session |

### Mission APIs

| Method | Description |
|---|---|
| `logAction(actionCode:completionHandler:)` | Record a user action toward a mission |
| `getMissionListWithProgress(completion:)` | Fetch missions with user progress and cap status |
| `getMissionLiteList(completion:)` | Fetch missions without progress (lightweight) |
| `getMissionDetails(actionCode:completion:)` | Fetch details for a single mission |
| `getUnclaimedMission(completion:)` | Fetch achievements awaiting point claim |
| `claim(unclaimedItem:completion:)` | Show the claim UI for an unclaimed achievement |
| `missionList` | Synchronous cache of the last-fetched mission list |

### Points & User Data

| Method / Property | Description |
|---|---|
| `user` | The current `SDKUser` object (may be `nil` if offline) |
| `loadMemberInfoRank(_:)` | Reload member points and rank from the server |
| `getPointHistory(completion:)` | Fetch 3-month point history |

### Portal

| Method | Description |
|---|---|
| `openPortal(completionHandler:)` | Open the SDK Portal |
| `openSupportPage(_:)` | Open a help/legal page in the mini browser |

### User Consent

| Method | Description |
|---|---|
| `requestForConsent(_:)` | Request user consent (shows dialog if not yet provided) |
| `showConsentBanner(_:)` | Show the consent notification banner |

### Callbacks

| Property | Trigger |
|---|---|
| `didUpdateUser: ((SDKUser) -> Void)?` | Fires when user data is refreshed |
| `didUpdateStatus: ((RakutenRewardStatus) -> Void)?` | Fires when SDK status changes |
| `didUpdateUnclaimedAchievement: ((UnclaimedItem) -> Void)?` | Fires when a mission is achieved |
| `didUpdateIsPortalPresentedStatus: ((Bool) -> Void)?` | Fires when the portal is shown or hidden |
| `didPresentConsentUI: (() -> Void)?` | Fires when the consent dialog appears |
| `didDismissConsentUI: (() -> Void)?` | Fires when the consent dialog is dismissed |
| `RakutenReward.userUpdatedNotification` | `NotificationCenter` notification posted when user is updated |

### Properties

| Property | Description |
|---|---|
| `status` | Current `RakutenRewardStatus` |
| `appCode` | Application code (read-only after init) |
| `tokenType` | Token type (`.rakutenAuth`) |
| `region` | SDK region (`.japan`) |

---

## RewardConfiguration

For the full configuration reference, see [Configuration](./configuration).

---

## Enumerations

### RakutenRewardStatus

| Case | Description |
|---|---|
| `.online` | SDK ready; user data up to date |
| `.offline` | SDK not initialized or initialization failed |
| `.appcodeInvalid` | Wrong application code |
| `.tokenExpired` | Token expired — prompt user to log in again |
| `.userNotConsent` | User has not accepted the terms of service |

### RakutenRewardConsentStatus

| Case | Description |
|---|---|
| `.consentProvided` | Consent has been given |
| `.consentNotProvided` | Consent has not been given |
| `.consentUIAlreadyPresented` | Consent UI is already on screen |
| `.consentFailed` | API error during consent check |
| `.consentProvidedRestartSessionFailed` | Consent given but session restart failed |

### LoginPageCompletion

| Case | Description |
|---|---|
| `.logInCompleted` | User successfully logged in |
| `.dismissByUser` | User dismissed the login page |
| `.failToShowLoginPage` | Could not present the login UI |

### PointClaimScreenEvent

| Case | Description |
|---|---|
| `.willPresent` | Claim screen is about to appear |
| `.didFailToShow(error:)` | Could not show the claim screen |
| `.didDismiss` | Claim screen was dismissed (any reason) |
| `.didSelfDismiss` | Claim screen auto-dismissed |
| `.didDismissByUser` | User manually dismissed the claim screen |
| `.didFailToClaim(error:)` | Point claim request failed |
| `.didClaimSuccessfully(item:)` | Points were claimed successfully |
| `.didTriggerIchibaDeeplink(url:)` | Ichiba deeplink was triggered |

### SupportPage

| Case | Description |
|---|---|
| `.help` | Reward SDK help page |
| `.termsCondition` | Reward terms and conditions |
| `.privacyPolicy` | Reward privacy policy |

---

## Data Models

### SDKUser

| Property / Method | Description |
|---|---|
| `signIn` | `true` if the user is signed in |
| `point` | Reward SDK points balance |
| `unclaimedMissionCount` | Number of unclaimed achievements |
| `getName()` | User's display name |
| `currentPointRank()` | Returns `MemberPointRank` with member points and rank |

### Mission

| Property | Type | Description |
|---|---|---|
| `name` | `String` | Mission name |
| `actionCode` | `String` | Action key |
| `iconurl` | `String` | Mission icon URL |
| `instruction` | `String` | Instructions for the user |
| `condition` | `String` | Achievement cap description |
| `notificationtype` | `NotificationType` | `NONE`, `BANNER`, `MODAL`, `CUSTOM`, `BANNER_50`, `BANNER_250` |
| `point` | `Int` | Points awarded |
| `enddatestr` | `String` | End date string |
| `till` | `String` | Days remaining |
| `reachedCap` | `Bool` | Whether the achievement cap has been reached |
| `times` | `Int` | Required number of actions |
| `progress` | `Int` | Current action count |
| `unclaimed` | `Int` | Number of unclaimed achievements |

### MissionLite

A lightweight version of `Mission` without `progress` and `reachedCap`. Shares all other properties.

### UnclaimedItem

| Property | Type | Description |
|---|---|---|
| `name` | `String` | Mission name |
| `iconurl` | `String` | Mission icon URL |
| `instruction` | `String` | Mission instruction |
| `actionCode` | `String` | Mission action code |
| `notificationtype` | `NotificationType` | Notification type |
| `point` | `Int` | Total points to claim |
| `pointsPerClaim` | `Int` | Points per individual claim |
| `unclaimedTimes` | `Int` | Number of unclaimed achievements |
| `getAchievedDate()` | `Date?` | Achievement date |

### MemberPointRank

| Property | Type | Description |
|---|---|---|
| `memberPoints` | `Int` | User's total Rakuten member points |
| `memberRank` | `String` | User's Rakuten member rank |

### PointHistory / PointRecord

`PointHistory` wraps a list of `PointRecord` objects accessed via `getPointHistory()`.

| `PointRecord` property | Description |
|---|---|
| `point` | Points earned |
| `month` | Month string |

---

## Errors

### SDKError

| Case | Description |
|---|---|
| `noMissionFound` | Mission list is empty |
| `missionReachedCap` | Mission has already been completed to its cap |
| `noUnclaimedItemFound` | No unclaimed missions available |
| `sessionNotInitialized` | SDK has not been initialized |
| `featureDisabledByUser` | User has opted out |
| `sdkStatusNotOnline` | SDK status is not `.online` |
| `sdkStatusUserNotConsent` | User has not provided consent |
| `unexpectedError(message:)` | Unexpected error with description |
| `onMaintenanceMode` | SDK is currently in maintenance mode |

### RPGRequestError

| Case | Description |
|---|---|
| `tokenExpire` | Access token expired |
| `serverError` | Cannot reach server |
| `badRequest` | Malformed request |
| `unavailableForLegalReasons` | User has not consented (legal block) |

### RewardSDKSessionError

| Case | Description |
|---|---|
| `userNotFound` | Session start failed — user not found |
| `appcodeInvalid` | SDK status is `appcodeInvalid` |
| `bundleError` | Wrong parameters |
| `loginRequired` | Must log in first |
| `cannotRetrieveSessionToken` | Could not retrieve session token — restart session |
