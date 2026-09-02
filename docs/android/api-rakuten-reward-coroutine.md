# RakutenRewardCoroutine

`RakutenRewardCoroutine` provides the same core APIs as `RakutenReward` as Kotlin suspend functions. All APIs return a `RewardApiResult` which can be `Success` or `Failed`.

## API Reference

| API | Description | Return type |
|---|---|---|
| `logAction(actionCode)` | Log a mission action | `RewardApiResult<Unit>` |
| `getMissions()` | Get the full mission list | `RewardApiResult<List<MissionData>>` |
| `getMissionsLite()` | Get a lightweight mission list | `RewardApiResult<List<MissionLiteData>>` |
| `getMissionDetails(actionCode)` | Get details for a specific mission | `RewardApiResult<MissionData>` |
| `getUnclaimedItems()` | Get the list of unclaimed mission achievements | `RewardApiResult<List<MissionAchievementData>>` |
| `getPointHistory()` | Get the user's point history for the last 3 months | `RewardApiResult<RakutenRewardPointHistory>` |
| `memberInfo()` | Fetch the latest member info from server | `RewardApiResult<RakutenRewardUser>` |

## Usage

```kotlin
viewModelScope.launch {
    when (val result = RakutenRewardCoroutine.logAction("<actionCode>")) {
        is Success -> { /* success */ }
        is Failed -> { /* handle result.error */ }
    }
}
```