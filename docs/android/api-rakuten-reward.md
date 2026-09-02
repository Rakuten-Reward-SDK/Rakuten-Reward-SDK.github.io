# RakutenReward

`RakutenReward` is the main class of the Reward SDK. It provides the core APIs for missions, points, UI, and listener management.

## Properties

| Property | Description |
|---|---|
| `version` | Current Reward SDK version string |
| `user` | Current user data (`RakutenRewardUser`) |
| `status` | Current SDK status (`RakutenRewardSDKStatus`) |
| `lastFailed` | The last failed API call (`RakutenRewardAPILastCalled`) |

## Mission

| API | Description |
|---|---|
| `logAction(actionCode, onSuccess, onFailed)` | Log a mission action |
| `getMissions(onSuccess, onFailed)` | Get the full mission list |
| `getMissionsLite(onSuccess, onFailed)` | Get a lightweight mission list |
| `getMissionDetails(actionCode, onSuccess, onFailed)` | Get details for a specific mission |
| `getUnclaimedItems(onSuccess, onFailed)` | Get the list of unclaimed mission achievements |

## Points

| API | Description |
|---|---|
| `getPointHistory(onSuccess, onFailed)` | Get the user's point history for the last 3 months |
| `memberInfo(onSuccess, onFailed)` | Fetch the latest member info from server |

## UI

| API | Description |
|---|---|
| `openSDKPortal(isPortalOpenedCallback, activityResultCallback)` | Open the SDK Portal |
| `openHelpPage()` | Open the Reward SDK Help page |
| `openTCPage()` | Open the Reward SDK Terms and Conditions page |
| `openPrivacyPage()` | Open the Reward SDK Privacy Policy page |
| `forceClaimClose()` | Forcibly close the claim UI |

## Consent

| API | Description |
|---|---|
| `requestForConsent(callback)` | Show the consent dialog if the user has not yet consented |
| `showConsentBanner(callback)` | Show the consent notification banner if the user has not yet consented |

## Listener

| API | Description |
|---|---|
| `addRakutenRewardListener(listener)` | Register a `RakutenRewardListener` |
| `removeRakutenRewardListener(listener)` | Unregister a `RakutenRewardListener` |

## Cookies

| API | Description |
|---|---|
| `setRp(rp: String)` | Set the Rp cookie |
| `setRz(rz: String)` | Set the Rz cookie |
| `setRa(ra: String)` | Set the Ra cookie |

## RakutenRewardSDKStatus

| Status | Description |
|---|---|
| `ONLINE` | SDK is ready and member information is available |
| `OFFLINE` | SDK is not ready or initialization failed |
| `APPCODEINVALID` | App code is invalid (initialization returned 400) |
| `TOKENEXPIRED` | Access token has expired |
| `USER_NOT_CONSENT` | User has not yet provided consent |

## RakutenRewardAPIError

| Error | Description |
|---|---|
| `NETWORKERROR` | Network connection error |
| `INVALIDREQUEST` | Invalid parameter |
| `TOKENEMPTY` | Access token is not set |
| `SDKNOTACTIVE` | SDK is not initialized |
| `TOKENEXPIRE` | Access token expired |
| `USER_NOT_CONSENT` | User has not provided consent |
| `MISSION_REACHED_CAP` | Mission achievement limit already reached |
| `UNDER_MAINTENANCE` | Feature is under maintenance |
| `UNKNOWN` | Unknown error |

## Mission Data Structures

### MissionAchievementData
| Property | Description |
|---|---|
| `name` | Mission name |
| `iconurl` | Icon URL |
| `instruction` | Mission Instruction |
| `action` | Action code |
| `custom` | Whether notification is custom or not |
| `notificationtype` | Notification type |
| `point` | Point value |
| `unclaimed` | Number of unclaimed rewards |
| `achievedDate` | Mission Achieved Date |

### MissionData
| Property | Description |
|---|---|
| `name` | Mission name |
| `actionCode` | Action code |
| `iconurl` | Mission icon URL |
| `instruction` | Mission Instruction |
| `condition` | Mission condition |
| `notificationtype` | Mission Notification type (NONE, BANNER, MODAL, CUSTOM, BANNER_50, BANNER_250) |
| `point` | Point for this mission |
| `enddatestr` | Mission's end date (String format) |
| `till` | Remaining days for mission |
| `ext` | Extension data for mission (future use) |
| `reachedCap` | Whether mission reached achievement limit |
| `times` | Required action times |
| `progress` | Current action progress |

### MissionLiteData
| Property | Description |
|---|---|
| `name` | Mission name |
| `actionCode` | Action code |
| `iconurl` | Mission icon URL |
| `instruction` | Mission Instruction |
| `condition` | Mission condition |
| `notificationtype` | Mission Notification type |
| `point` | Point for this mission |
| `enddatestr` | Mission's end date (String format) |
| `till` | Remaining days for mission |
| `ext` | Extension data for mission (future use) |
| `times` | Required action times |

## Point Data Structures

### RakutenRewardPointHistory
List of `RakutenRewardPoint` objects

### RakutenRewardPoint
| Property | Description |
|---|---|
| `point` | Point data |
| `pointdate` | Point date in YYYYMM format |

## User Data

### RakutenRewardUser
| Property | Description |
|---|---|
| `unclaimed` | Number of unclaimed Point Items |
| `signin` | Whether user is signed in |
| `point` | User's total points |
| `achievementList` | Mission list (not currently used) |

## Status Enums

### RakutenRewardClaimStatus
| Status | Description |
|---|---|
| `NOTYET` | Not claimed yet |
| `SUCCESS` | Claim succeeded |
| `FAIL` | Claim failed |

### RakutenRewardConsentStatus
| Status | Description |
|---|---|
| `CONSENT_PROVIDED` | User provided consent |
| `CONSENT_NOT_PROVIDED` | User has not provided consent |
| `CONSENT_FAILED` | API request error |
| `CONSENT_PROVIDED_RESTART_SESSION_FAILED` | Consent provided but session restart failed |

### RewardApiResult
| Property | Description |
|---|---|
| `data` | API data object (Success case) |
| `error` | `RakutenRewardAPIError` (Failed case) |

## Supported Locales
| Locale | Description |
|---|---|
| `Japanese` | Japanese language |
| `English` | English language |
| `Korean` | Korean language |
| `ChineseTraditional` | Traditional Chinese |
| `ChineseSimplified` | Simplified Chinese |
| `OtherLocale` | Custom locale using ISO 639 language code |