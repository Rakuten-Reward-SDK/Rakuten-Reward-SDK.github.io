# ミッションの達成

ミッションを達成するには、Post Action APIを使ってミッションアクションを記録する必要があります。ミッションが達成されると、SDKは自動的に通知UIを表示してユーザーにポイント獲得を促します。

## アクションを送信する

楽天リワード開発者ポータルから取得したアクションコードを使って `logAction` を呼び出します。

**コールバック**
```kotlin
RakutenReward.logAction("<actionCode>", {
    // 成功
}, {
    // 失敗
})
```

**コルーチン**
```kotlin
val result = RakutenRewardCoroutine.logAction("<actionCode>")
```

## 通知UI

ミッションが達成されると、開発者ポータルで設定された種類に応じた通知UIが表示されます。

| 通知種類 | 動作 |
|---|---|
| モーダル | SDKが提供するモーダルダイアログを表示 |
| バナー | SDKが提供するバナーを表示 |
| 広告バナー（小） | SDKが提供する小さな広告バナーを表示 |
| 広告バナー（大） | SDKが提供する大きな広告バナーを表示 |
| カスタム | 開発者が独自のUIを構築・制御する |
| UIなし | 通知を表示しない |

### モーダルとバナー

![モーダル通知](/assets/android/ja/modal.jpeg) ![バナー通知](/assets/android/ja/banner.jpeg)

v6.0.0でバナーUIが新しくなりました。

![新バナーUI](/assets/android/banner_new.png)

### 広告バナー

![小広告バナー](/assets/android/ja/ad_banner_small.png) ![大広告バナー](/assets/android/ja/ad_banner_big.png)

### 通知UIを無効にする

すべての通知UIをグローバルに非表示にするには以下を使用します。

```kotlin
RakutenRewardConfig.setUiEnabled(false)
```

## ポイントを獲得する

通知が表示された後、ユーザーがUIをタップしてポイントを獲得します。SDKはその後、クレームステータスUIを表示します。

![クレーム画面](/assets/android/ja/claim_view.png)

### カスタム通知タイプ

**カスタム**通知タイプの場合、UIの表示とクレームのトリガーは開発者が担当します。`RakutenRewardListener` に `onUnclaimedAchievement` を実装してください。

```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        // メインスレッドでカスタムUIを表示
    }
}
```

ユーザーがクレームする準備ができたら、`MissionAchievementData` オブジェクトの `claim()` を呼び出します。

```kotlin
achievement.claim({
    // クレーム成功
}, {
    // クレーム失敗
})
```
