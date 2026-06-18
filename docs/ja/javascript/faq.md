# FAQ

## 全般

### Mission JS SDKはフロントエンドフレームワークを使用していますか？

<details>
<summary>回答</summary>

いいえ。Mission JS SDKはフレームワーク依存なしのVanilla JavaScriptで記述されています。SDKファイルを小さく保ち、Webサイトの技術スタックとの競合を避け、幅広いブラウザサポートを実現するためです。

</details>

### React/Vue/Angularを使用していますが、競合は発生しますか？

<details>
<summary>回答</summary>

いいえ。SDKはVanilla JavaScriptを使用しているため、どのフロントエンドフレームワークとも競合は発生しません。

Reactの場合は、`useEffect` 内でSDKを初期化してください：

```javascript
import RewardMissionSDK from "rakutenreward-js";

useEffect(() => {
    RewardMissionSDK.init({
        appKey: "YOUR_APP_KEY",
        language: "ja",
        successCallback: () => {
            RewardMissionSDK.logAction({ actionCode: "ABC123" });
        },
    });
}, []);
```

</details>

### SDKはいくつの言語をサポートしていますか？

<details>
<summary>回答</summary>

| 言語 | コード |
|---|---|
| 日本語（デフォルト） | `ja` |
| 英語 | `en` |
| 韓国語 | `ko-KR` |
| 繁体字中国語 | `zh-TW` |
| 簡体字中国語 | `zh-CN` |

初期化時に言語コードを渡してください。省略した場合、SDKはブラウザの言語設定を使用し、日本語にフォールバックします。

</details>

### Mission JS SDKはユーザーの広告IDを収集しますか？

<details>
<summary>回答</summary>

いいえ — ブラウザは広告IDにアクセスできません。広告ターゲティングのためにAd IDを渡す必要がある場合は、初期化時に指定できます：

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    adId: "YOUR_AD_ID",
});
```

</details>

---

## 実装関連

### 毎日のページ訪問ミッションはどのように実装しますか？

<details>
<summary>回答</summary>

`init` の直後に `logAction` を呼び出さないでください。SDKの初期化が完了していない可能性があります。代わりに `successCallback` または `async/await` を使用してください：

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
    successCallback: () => {
        rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
    },
});
```

または `async/await` を使う場合：

```javascript
(async () => {
    await rewardSDK.init({ appKey: "YOUR_APP_KEY" });
    rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
})();
```

</details>

### ミッション達成後にポイントを申請するにはどうすればいいですか？

<details>
<summary>回答</summary>

**`logAction` のレスポンス経由**（ミッションが達成された直後の場合）：

```javascript
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
response.claimPointMission();
```

**`getUnclaimedItems` 経由**（以前の未申請ポイントを申請する場合）：

```javascript
const unclaimedItems = await rewardSDK.getUnclaimedItems();
const target = unclaimedItems.find(item => item.actionCode === "YOUR_ACTION_CODE");
if (target) target.claimPointMission();
```

</details>

### カスタム通知UIはどのように実装しますか？

<details>
<summary>回答</summary>

`logAction` のレスポンスで `CUSTOM` 通知タイプを確認し、独自のUIを表示します：

```javascript
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });

const isAchieved = response.success && response.achieved;
const isCustom = response.mission.notificationtype === "CUSTOM";
const isUIEnabled = rewardSDK.getUIEnabled();

if (isAchieved && isCustom && isUIEnabled) {
    // カスタム通知UIを表示
}
```

</details>

### SDKポータルが閉じられたことを検知できますか？

<details>
<summary>回答</summary>

ポータルを開く際に `closeCallback` を渡します：

```javascript
rewardSDK.displaySDKPortal({
    closeCallback: () => console.log("ポータルが閉じられました"),
});
```

`displayPortalButton` や `displayRewardIcon` でも同様に `closeCallback` を使用できます。

</details>

### SDKポータルを無効にして独自のUIを使いたい場合は？

<details>
<summary>回答</summary>

初期化時に `sdkPortalEnabled: false` を渡します：

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    sdkPortalEnabled: false,
});
```

</details>

### 同じアクションを複数回ログに記録するにはどうすればいいですか？

<details>
<summary>回答</summary>

`logActionMultipleTimes` を使用します：

```javascript
const responses = await rewardSDK.logActionMultipleTimes(
    { actionCode: "YOUR_ACTION_CODE" },
    5
);
// responses: [{ status: 'fulfilled', value: ... }, ...]
```

各レスポンスの `status` を確認してください — `'fulfilled'` は成功、`'rejected'` はそのアクションでエラーが発生したことを示します。

</details>

### ユーザーがサインアウトしたときに `logout` を呼び出す必要がありますか？

<details>
<summary>回答</summary>

はい。ユーザーがサインアウトする際は必ず `logout()` を呼び出し、ブラウザからトークンとセッションデータをクリアしてください。

```javascript
rewardSDK.logout();
```

</details>

### ユーザーAが同意後にログアウトし、同じブラウザでユーザーBがログインした場合、ユーザーBの同意状態はどうなりますか？

<details>
<summary>回答</summary>

ユーザー同意はブラウザではなくユーザーのアカウントに紐付いています。ユーザーBはユーザーAの同意に影響されない、独立した同意状態を持っています。

</details>

### 進捗なしでミッションリストを取得することはできますか？

<details>
<summary>回答</summary>

はい。`getMissionsLite` を使用すると、進捗データなしでミッションリストを取得できます。`getMissions` より軽量で高速です。

```javascript
const missions = await rewardSDK.getMissionsLite();
```

その後、特定のミッションの進捗が必要な場合は、アクションコードで `getMissionDetails` を使用してください：

```javascript
const mission = await rewardSDK.getMissionDetails({ actionCode: "YOUR_ACTION_CODE" });
```

</details>
