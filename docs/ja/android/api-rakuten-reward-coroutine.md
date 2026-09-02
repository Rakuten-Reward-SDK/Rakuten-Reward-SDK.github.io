# RakutenRewardCoroutine

`RakutenRewardCoroutine` は `RakutenReward` と同じコアAPIをKotlinのsuspend関数として提供します。すべてのAPIは `Success` または `Failed` の `RewardApiResult` を返します。

## APIリファレンス

| API | 説明 | 戻り値の型 |
|---|---|---|
| `logAction(actionCode)` | ミッションアクションを記録する | `RewardApiResult<Unit>` |
| `getMissions()` | ミッション一覧を取得する | `RewardApiResult<List<MissionData>>` |
| `getMissionsLite()` | 軽量版ミッション一覧を取得する | `RewardApiResult<List<MissionLiteData>>` |
| `getMissionDetails(actionCode)` | 特定ミッションの詳細を取得する | `RewardApiResult<MissionData>` |
| `getUnclaimedItems()` | 未獲得ミッション一覧を取得する | `RewardApiResult<List<MissionAchievementData>>` |
| `getPointHistory()` | 直近3ヶ月のポイント履歴を取得する | `RewardApiResult<RakutenRewardPointHistory>` |
| `memberInfo()` | サーバーから最新のメンバー情報を取得する | `RewardApiResult<RakutenRewardUser>` |

## 使用例

```kotlin
viewModelScope.launch {
    when (val result = RakutenRewardCoroutine.logAction("<actionCode>")) {
        is Success -> { /* 成功 */ }
        is Failed -> { /* result.error でエラー処理 */ }
    }
}
```