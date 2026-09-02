# RakutenRewardCoroutine

`RakutenRewardCoroutine` provides the same core APIs as `RakutenReward` as Kotlin suspend functions. All APIs return a `RewardApiResult` which can be `Success` or `Failed`.

## API Reference

| API | Description | Return type | Supported Version |
|---|---|---|---|
| `logAction(actionCode)` | Log a mission action | `RewardApiResult<Unit>` | 3.3.3+ |
| `getMissions()` | Get the full mission list | `RewardApiResult<List<MissionData>>` | 3.3.3+ |
| `getMissionsLite()` | Get a lightweight mission list | `RewardApiResult<List<MissionLiteData>>` | 6.1.0+ |
| `getMissionDetails(actionCode)` | Get details for a specific mission | `RewardApiResult<MissionData>` | 6.1.0+ |
| `getUnclaimedItems()` | Get the list of unclaimed mission achievements | `RewardApiResult<List<MissionAchievementData>>` | 3.3.3+ |
| `getPointHistory()` | Get the user's point history for the last 3 months | `RewardApiResult<RakutenRewardPointHistory>` | 3.3.3+ |
| `memberInfo()` | Fetch the latest member info from server | `RewardApiResult<RakutenRewardUser>` | 3.3.3+ |

## Usage

```kotlin
viewModelScope.launch {
    when (val result = RakutenRewardCoroutine.logAction("<actionCode>")) {
        is Success -> { /* success */ }
        is Failed -> { /* handle result.error */ }
    }
}
```

## Error Handling

All APIs may return the following common errors:

| Error Code | Reason |
|---|---|
| `SDKNOTACTIVE` | SDK is opted out |
| `USER_NOT_CONSENT` | User has not provided consent |
| `APPCODEINVLID` | Application key is invalid |
| `TOKENEXPIRE` | Access token has expired or could not be obtained |
| `INVALIDREQUEST` | Bad request or invalid parameters |
| `NETWORKERROR` | Network or other HTTP error |
| `UNKNOWN` | Unexpected or unparseable server response |

Specific APIs may return additional errors:

- `logAction()` may return `MISSION_REACHED_CAP` (5.2.0+) when the mission has already reached its cap
- `getMissionDetails()` may fail if the provided action code is invalid

## Recommendations

- For mission lists where progress tracking isn't needed, prefer `getMissionsLite()` (6.1.0+) for better performance
- Use `RewardTokenProvider` (v8+) for automatic session management instead of manual session handling
- Always check the `RewardApiResult` for success/failure and handle errors appropriately