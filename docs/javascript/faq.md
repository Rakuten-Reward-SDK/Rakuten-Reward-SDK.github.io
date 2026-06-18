# FAQ

## General

### Does Mission JS SDK use any front-end framework?

<details>
<summary>Answer</summary>

No. Mission JS SDK is written in Vanilla JavaScript with no front-end framework dependencies. This keeps the SDK file small, avoids conflicts with your website's tech stack, and ensures broad browser compatibility.

</details>

### I use React/Vue/Angular — will there be any conflicts?

<details>
<summary>Answer</summary>

No. Since the SDK uses Vanilla JavaScript, there are no known conflicts with any front-end framework.

For React, initialize the SDK inside a `useEffect`:

```javascript
import RewardMissionSDK from "rakutenreward-js";

useEffect(() => {
    RewardMissionSDK.init({
        appKey: "YOUR_APP_KEY",
        language: "en",
        successCallback: () => {
            RewardMissionSDK.logAction({ actionCode: "ABC123" });
        },
    });
}, []);
```

</details>

### How many languages does the SDK support?

<details>
<summary>Answer</summary>

| Language | Code |
|---|---|
| Japanese (default) | `ja` |
| English | `en` |
| Korean | `ko-KR` |
| Traditional Chinese | `zh-TW` |
| Simplified Chinese | `zh-CN` |

Pass the language code during initialization. If omitted, the SDK uses the browser's language setting, falling back to Japanese.

</details>

### Does Mission JS SDK collect the user's Advertising ID?

<details>
<summary>Answer</summary>

No — browsers do not expose the Advertising ID. If you need to pass an Ad ID for ad targeting, you can provide it during initialization:

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    adId: "YOUR_AD_ID",
});
```

</details>

---

## Implementation Related

### I have a daily page visit mission. How should I implement it?

<details>
<summary>Answer</summary>

Do not call `logAction` immediately after `init` — the SDK may not have finished initializing. Use `successCallback` or `async/await` instead:

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
    successCallback: () => {
        rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
    },
});
```

Or with `async/await`:

```javascript
(async () => {
    await rewardSDK.init({ appKey: "YOUR_APP_KEY" });
    rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
})();
```

</details>

### How do I claim points after a mission is achieved?

<details>
<summary>Answer</summary>

**Via `logAction` response** (if the mission was just completed):

```javascript
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
response.claimPointMission();
```

**Via `getUnclaimedItems`** (to claim any previously unclaimed points):

```javascript
const unclaimedItems = await rewardSDK.getUnclaimedItems();
const target = unclaimedItems.find(item => item.actionCode === "YOUR_ACTION_CODE");
if (target) target.claimPointMission();
```

</details>

### How can I implement a custom notification UI?

<details>
<summary>Answer</summary>

Check the `logAction` response for `CUSTOM` notification type and display your own UI:

```javascript
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });

const isAchieved = response.success && response.achieved;
const isCustom = response.mission.notificationtype === "CUSTOM";
const isUIEnabled = rewardSDK.getUIEnabled();

if (isAchieved && isCustom && isUIEnabled) {
    // Show your custom notification UI
}
```

</details>

### How do I detect when the SDK Portal is closed?

<details>
<summary>Answer</summary>

Pass a `closeCallback` when opening the portal:

```javascript
rewardSDK.displaySDKPortal({
    closeCallback: () => console.log("Portal closed"),
});
```

The same `closeCallback` works on `displayPortalButton` and `displayRewardIcon`.

</details>

### I want to disable the SDK Portal and use my own custom UI instead. How?

<details>
<summary>Answer</summary>

Pass `sdkPortalEnabled: false` during initialization:

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    sdkPortalEnabled: false,
});
```

</details>

### How do I log the same action multiple times?

<details>
<summary>Answer</summary>

Use `logActionMultipleTimes`:

```javascript
const responses = await rewardSDK.logActionMultipleTimes(
    { actionCode: "YOUR_ACTION_CODE" },
    5
);
// responses: [{ status: 'fulfilled', value: ... }, ...]
```

Check each response's `status` — `'fulfilled'` means success, `'rejected'` means an error occurred for that attempt.

</details>

### Do I need to call `logout` when the user signs out?

<details>
<summary>Answer</summary>

Yes. Always call `logout()` when the user signs out to clear their tokens and session data from the browser.

```javascript
rewardSDK.logout();
```

</details>

### User A accepted consent then logged out, and User B logged in on the same browser. What is User B's consent status?

<details>
<summary>Answer</summary>

User consent is tied to the user's account, not the browser. User B has their own independent consent status, unaffected by User A's consent.

</details>

### Is it possible to get the mission list without progress?

<details>
<summary>Answer</summary>

Yes. Use `getMissionsLite` to retrieve the mission list without progress data — this is lighter and faster than `getMissions`.

```javascript
const missions = await rewardSDK.getMissionsLite();
```

If you need progress for a specific mission afterwards, use `getMissionDetails` with the action code:

```javascript
const mission = await rewardSDK.getMissionDetails({ actionCode: "YOUR_ACTION_CODE" });
```

</details>
