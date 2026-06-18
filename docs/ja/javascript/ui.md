# Built-in UI

## SDKポータル

SDKポータルはミッションの確認、未申請ポイントの申請、ポイント履歴の確認ができる全画面ポップアップです。

![SDKポータル](/assets/javascript/sdk-portal.png)

### ポータルを開く

```javascript
rewardSDK.displaySDKPortal();
```

ポータルが閉じられたときを検知する場合：

```javascript
rewardSDK.displaySDKPortal({
    closeCallback: () => {
        // ポータルが閉じられました
    },
});
```

### ポータルボタン

SDKの組み込みポータル開始ボタンをレンダリングします：

```javascript
rewardSDK.displayPortalButton("sdk-portal-button-element-id", {
    closeCallback: () => {
        // ポータルが閉じられました
    },
});
```

### リワードアイコン

ポータルを開くフローティングリワードアイコンをレンダリングします。アイコンにはユーザーの未申請ポイント数が表示されます。

```javascript
rewardSDK.displayRewardIcon(
    "sdk-portal-reward-icon-element-id",
    { position: "topRight", width: 48, height: 48 },
    {
        closeCallback: () => {
            // ポータルが閉じられました
        },
    }
);
```

**`RewardIconOptions`**

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `position` | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` | アイコンの位置 |
| `width` | `number` | `48` | アイコンの幅（px） |
| `height` | `number` | `48` | アイコンの高さ（px） |

## 未申請ポイントリスト

SDKの組み込み未申請ポイントリストをコンテナ要素内にレンダリングします：

```javascript
rewardSDK.displayUnclaimedItems("sdk-unclaimed-items-element-id");
```

![未申請ポイントリスト](/assets/javascript/unclaimed-points-list.png)

申請ボタンをクリックすると申請ポップアップが開きます：

![ポイント申請ポップアップ](/assets/javascript/claim-point-popup.png)

## サポートページ

SDKが提供するページを新しいタブで開きます：

```javascript
rewardSDK.openFaqUrl();       // ヘルプ / FAQページ
rewardSDK.openTncUrl();       // 利用規約
rewardSDK.openPrivacyUrl();   // プライバシーポリシー
```
