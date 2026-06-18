# Basic Setup

## Requirements

### Browser Support

Mission JS SDK uses the native browser `fetch` API and supports the following browsers:

| Browser | Minimum Version |
|---|---|
| Chrome | 42+ |
| Edge | 14+ |
| Safari | 10.1+ |
| Firefox | 39+ |

For older browser support, add a [`fetch` polyfill](https://www.npmjs.com/package/whatwg-fetch) to your project.

### Front End Framework

Mission JS SDK is written in Vanilla JavaScript with no framework dependencies. It works with any tech stack — React, Vue, Angular, or plain HTML.

## Installation

> Please refer [here](https://github.com/rakuten-ads/Rakuten-Reward-JS/blob/main/CHANGELOG.md) for the latest SDK version.

### Via Script Tag

Add the following `<script>` tag inside the `<head>` tag of your page:

```html
<script
    type="text/javascript"
    src="https://portal.reward.rakuten.co.jp/sdk-static/sdk/x.x.x/missionsdk.js">
</script>
```

After loading, the SDK is available via the `window` object:

```javascript
const rewardSDK = window.RewardMissionSDK || {};
```

### Via npm

```bash
npm install rakutenreward-js
```

After installing, import and initialize the SDK:

```javascript
import RewardMissionSDK from "rakutenreward-js";

RewardMissionSDK.init({
    appKey: "YOUR_APP_KEY",
});
```

::: info React
When using the SDK in a React project, initialize it inside a `useEffect` to ensure it runs after the component mounts:

```javascript
import RewardMissionSDK from "rakutenreward-js";

useEffect(() => {
    RewardMissionSDK.init({
        appKey: "YOUR_APP_KEY",
        language: "en",
        successCallback: () => {
            RewardMissionSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });
        },
    });
}, []);
```
:::
