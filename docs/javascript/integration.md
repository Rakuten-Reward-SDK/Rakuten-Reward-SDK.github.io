# Integration

## Initialize SDK

Call `init` once after the SDK is loaded, using the App Key provided in the Rakuten Reward Developer Portal.

```javascript
const rewardSDK = window.RewardMissionSDK || {};

rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
});
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `appKey` | `string` | Yes | Application Key from the Rakuten Reward Developer Portal |
| `language` | `string` | No | UI language. Defaults to the browser's language setting, falling back to `ja` |

## Language

The SDK supports the following languages:

| Language | Code |
|---|---|
| Japanese (default) | `ja` |
| English | `en` |
| Korean | `ko-KR` |
| Traditional Chinese | `zh-TW` |
| Simplified Chinese | `zh-CN` |

Pass the language code during initialization:

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "en",
});
```

If the specified language is not supported, the SDK falls back to **Japanese**.

## Running Code After Initialization

`init` is asynchronous. Use `successCallback` or `async/await` to run code after the SDK is ready.

**Using `successCallback`:**

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
    successCallback: async () => {
        const isSignedIn = await rewardSDK.hasUserSignedIn();
        console.log("isSignedIn", isSignedIn);
    },
});
```

**Using `async/await`:**

```javascript
(async () => {
    try {
        await rewardSDK.init({
            appKey: "YOUR_APP_KEY",
            language: "ja",
        });
    } catch (err) {
        // Handle init or authentication error
    }

    const isSignedIn = await rewardSDK.hasUserSignedIn();
    console.log("isSignedIn", isSignedIn);
})();
```

::: warning
Do not call other SDK APIs immediately after `init` without waiting for it to complete. The SDK needs to finish initialization before other APIs can be used.
:::
