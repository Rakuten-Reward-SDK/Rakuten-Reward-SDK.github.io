# API Reference

## Initialization

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `init` | Yes | `SDKInitParams` | `void` | Initialize Mission SDK |

### SDKInitParams

| Key | Type | Required | Default | Description |
|---|---|---|---|---|
| `appKey` | `string` | Yes | | Application Key from the Developer Portal |
| `language` | `string` | No | `'ja'` | UI language (`'ja'`, `'en'`, `'zh-TW'`, `'zh-CN'`, `'ko-KR'`) |
| `uiEnabled` | `boolean` | No | `true` | Show/hide mission achievement notification UI |
| `sdkPortalEnabled` | `boolean` | No | `true` | Enable/disable the SDK Portal UI |
| `featureEnabled` | `boolean` | No | `true` | Enable/disable all SDK features |
| `adId` | `string` | No | `''` | Device Ad ID for ad targeting |
| `successCallback` | `function` | No | | Called after SDK finishes initialization |

---

## Authentication

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `getLoginUrl` | No | — | `string` | Returns the Rakuten login URL |
| `openLoginUrl` | No | — | `void` | Redirects to the Rakuten login page |
| `hasUserSignedIn` | Yes | — | `boolean` | Returns the user's login status |
| `logout` | Yes | `options?` | `void` | Logs out and clears the session |
| `startSession` | Yes | `options?` | `UserPointInformation` | Starts the session / refreshes the access token |
| `setUIEnabled` | No | `boolean` | `void` | Enable/disable notification UI |
| `setSDKPortalEnabled` | No | `boolean` | `void` | Enable/disable SDK Portal |
| `setFeatureEnabled` | No | `boolean` | `void` | Enable/disable all SDK features |
| `displayLoginButton` | No | `elementId: string` | `void` | Render the SDK login button in a container |

---

## User

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `getUserName` | No | — | `string` | Returns the user's full name |
| `getUserInfo` | Yes | `options?` | `UserPointInformation` | Returns user info and current points |
| `getMemberInfo` | Yes | `options?` | `MemberInformation` | Returns Rakuten member points and rank |
| `getIsUserConsent` | No | — | `boolean` | Returns the user's consent status |
| `displayLoginElement` | No | `elementId: string` | `void` | Render user info or login button in a container |

---

## User Consent

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `acceptConsent` | Yes | `options?` | `void` | Accept user consent |
| `displayConsentPopup` | Yes | `options?` | `void` | Show the consent popup dialog |
| `displayConsentBanner` | Yes | `callback?` | `void` | Show the consent notification banner |

---

## Mission

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `getMissions` | Yes | `options?` | `MissionItem[]` | Fetch missions with progress |
| `getMissionsLite` | Yes | `options?` | `MissionItemLite[]` | Fetch missions without progress |
| `getMissionDetails` | Yes | `missionAction, options?` | `MissionItem` | Fetch a single mission by action code |
| `logAction` | Yes | `missionAction, options?` | `MissionLogActionResponse` | Log a mission action |
| `logActionMultipleTimes` | Yes | `missionAction, times` | `MissionLogActionMultipleResponse[]` | Log an action multiple times |
| `displayMissionList` | No | `elementId: string` | `void` | Render the mission list in a container |

---

## Claim Points

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `getUnclaimedItems` | Yes | `options?` | `UnclaimedItem[]` | Fetch unclaimed point items |
| `claimPointMission` | Yes | `pointActionData, options?` | `ClaimPointResponse` | Claim a point for an achieved mission |
| `displayUnclaimedItems` | No | `elementId: string` | `void` | Render the unclaimed items list in a container |

---

## Points History

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `getPointHistory` | Yes | `options?` | `PointHistory[]` | Fetch point history for the past 3 months |
| `getCurrentPoints` | Yes | `options?` | `CurrentPoints` | Fetch user's current points |

---

## SDK Portal

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `displaySDKPortal` | No | `options?` | `void` | Open the SDK Portal popup |
| `displayPortalButton` | No | `elementId, options?` | `void` | Render a button that opens the portal |
| `displayRewardIcon` | No | `elementId, iconOptions, options?` | `void` | Render a floating reward icon that opens the portal |
| `openFaqUrl` | No | — | `void` | Open the FAQ page in a new tab |
| `openTncUrl` | No | — | `void` | Open the terms of use page in a new tab |
| `openPrivacyUrl` | No | — | `void` | Open the privacy policy page in a new tab |

---

## Other

| Function | Async | Parameters | Response | Description |
|---|---|---|---|---|
| `getVersion` | No | — | `string` | Returns the SDK version, e.g. `1.5.0` |

---

## Data Models

### MissionActionData

| Key | Type | Required | Description |
|---|---|---|---|
| `actionCode` | `string` | Yes | Mission action code |
| `forceDisplayConsentPopup` | `boolean` | No | Force show consent popup before logging action |

### PointActionData

| Key | Type | Required | Description |
|---|---|---|---|
| `actionCode` | `string` | Yes | Mission action code |
| `achievedDateStr` | `string` | Yes | Achievement date — format `YYYYMMDD`, e.g. `20231231` |

### UserPointInformation

| Key | Type | Description |
|---|---|---|
| `unclaimedPoints` | `number` | User's unclaimed points |
| `currentPoints` | `number` | User's current points |

### MemberInformation

| Key | Type | Description |
|---|---|---|
| `memberPoints` | `number` | Current Rakuten member points |
| `memberRank` | `number` | Rakuten member rank |

### MissionItem

| Key | Type | Description |
|---|---|---|
| `actionCode` | `string` | Mission action code |
| `iconurl` | `string` | Mission icon URL |
| `instruction` | `string` | Mission instruction |
| `condition` | `string` | Achievement condition |
| `notificationtype` | `NotificationType` | Notification UI type |
| `point` | `number` | Points awarded |
| `enddatestr` | `string` | End date — format `YYYYMMDD` |
| `reachedCap` | `boolean` | Whether the cap has been reached |
| `times` | `number` | Required action count |
| `progress` | `number` | Current action count |

### MissionItemLite

Same as `MissionItem` but without `progress` and `reachedCap`.

### MissionLogActionResponse

| Key | Type | Description |
|---|---|---|
| `mission` | `MissionItemComplete` | Mission details |
| `success` | `boolean` | Whether the log action succeeded |
| `achieved` | `boolean` | Whether the mission was achieved |
| `member` | `{ unclaimed: number }` | User's total unclaimed points |

### UnclaimedItem

| Key | Type | Description |
|---|---|---|
| `actionCode` | `string` | Mission action code |
| `actionPointName` | `string` | Mission name |
| `unclaimedPoints` | `number` | Total points to claim |
| `pointsPerClaim` | `number` | Points per claim |
| `unclaimedTimes` | `number` | Number of unclaimed achievements |
| `achievedDate` | `string` | Achievement date — format `YYYY-MM-DD` |
| `notificationType` | `NotificationType` | Notification type |
| `claimPointMission` | `function` | Call to claim the point |

### ClaimPointResponse

| Key | Type | Description |
|---|---|---|
| `actionCode` | `string` | Mission action code |
| `claimTargetDate` | `number` | Claim date — format `YYYYMMDD` |
| `pointClaimed` | `number` | Points claimed |

### PointHistory

| Key | Type | Description |
|---|---|---|
| `points` | `number` | Points earned that month |
| `month` | `string` | Month — format `YYYYMM` |

### CurrentPoints

| Key | Type | Description |
|---|---|---|
| `date` | `string` | Date — format `YYYY-MM-DD` |
| `points` | `number` | Current points |

### RewardIconOptions

| Key | Type | Default | Description |
|---|---|---|---|
| `position` | `string` | `'topRight'` | Icon position (`'topLeft'`, `'topRight'`, `'bottomLeft'`, `'bottomRight'`) |
| `width` | `number` | `48` | Icon width in px |
| `height` | `number` | `48` | Icon height in px |

### NotificationType

`'MODAL' | 'BANNER' | 'BANNER_50' | 'BANNER_250' | 'CUSTOM' | 'NONE'`

---

## Error Codes

| Code | Description |
|---|---|
| `error_not_initialized` | SDK has not been initialized |
| `error_not_login` | User is not logged in |
| `error_not_start_session` | Session has not been started |
| `error_feature_setting_disabled` | SDK features are disabled |
| `error_ui_setting_disabled` | Notification UI is disabled |
| `error_user_not_consent` | User has not provided consent |
| `error_action_still_invalid` | Log action is temporarily invalid (fraud prevention) |
| `error_not_join_mission` | User has not joined the mission |
| `error_logout_failed` | Local storage cleared but server logout failed |
