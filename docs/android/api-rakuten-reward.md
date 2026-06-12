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
