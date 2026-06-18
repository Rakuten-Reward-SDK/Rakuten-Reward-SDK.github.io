# ミッションの達成

ミッションを達成するには、`logAction` APIを使ってミッションアクションをログに記録する必要があります。ミッションが達成されると、SDKは自動的に通知UIを表示してユーザーにポイント申請を促します。

## アクションのログ記録

Reward SDK Developer Portalで提供されるアクションコードを使って `logAction` を呼び出します。

```javascript
// async/await
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });

// Promise方式
rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        // エラー処理
    });
```

## 通知UI

ミッションが達成されると、Developer Portalで設定された通知タイプに基づいてUIが表示されます。

| 通知タイプ | 動作 |
|---|---|
| `MODAL` | SDKが提供するモーダル |
| `BANNER` | SDKが提供するバナー |
| `BANNER_50` | SDKが提供する50px広告バナー |
| `BANNER_250` | SDKが提供する250px広告バナー |
| `CUSTOM` | 開発者がUIを構築・制御 |
| `NONE` | 通知は表示されない |

### モーダル

![ミッションモーダル通知](/assets/javascript/mission-modal.png)

### バナー

![ミッションバナー通知](/assets/javascript/mission-banner.png)

### バナー 50

![ミッションバナー50](/assets/javascript/mission-banner-50.png)

### バナー 250

![ミッションバナー250](/assets/javascript/mission-banner-250.png)

### カスタム通知UI

`CUSTOM` タイプのミッションの場合、`logAction` のレスポンスを使って独自の通知UIを構築します：

```javascript
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });

const isAchieved = response.success && response.achieved;
const isCustom = response.mission.notificationtype === "CUSTOM";
const isUIEnabled = rewardSDK.getUIEnabled();

if (isAchieved && isCustom && isUIEnabled) {
    // カスタム通知UIを表示
}
```

## ミッションリストの取得

### 進捗付きの完全リスト

```javascript
const missions = await rewardSDK.getMissions();
```

### 進捗なしのライトリスト

```javascript
const missions = await rewardSDK.getMissionsLite();
```

### 単一ミッションの詳細

```javascript
const mission = await rewardSDK.getMissionDetails({ actionCode: "YOUR_ACTION_CODE" });
```

## アクションを複数回ログに記録する

```javascript
const responses = await rewardSDK.logActionMultipleTimes(
    { actionCode: "YOUR_ACTION_CODE" },
    5 // 回数
);
// responses: [{ status: 'fulfilled', value: MissionLogActionResponse }, ...]
```

## ミッションサブスクリプション

v1.1.0から、ミッションはユーザーがアクションをログする前にサブスクリプション（参加）を要求できます。これはDeveloper Portalでミッションごとに設定します。

サブスクリプションが有効の場合、ユーザーはミッションリストに参加ボタンが表示されます：

![ミッション参加ボタン](/assets/javascript/join-mission-button.png)

参加をクリックすると利用規約が表示されます：

![利用規約ポップアップ](/assets/javascript/tnc-modal.png)

参加後は退会ボタンが表示されます：

![ミッション退会テキスト](/assets/javascript/leave-mission-text.png)

退会をクリックすると確認ダイアログが表示されます：

![退会確認モーダル](/assets/javascript/leave-modal.png)

ユーザーが退会後に同じミッションに再参加した場合、進捗は保持されます。

## ミッションリストの表示

SDKの組み込みミッションリストUIをコンテナ要素内にレンダリングします：

```javascript
rewardSDK.displayMissionList("sdk-mission-list-element-id");
```

![ミッションリスト](/assets/javascript/mission-list.png)

ミッションアイテムをクリックすると詳細が表示されます：

![ミッションアイテム詳細](/assets/javascript/mission-list-details.png)
