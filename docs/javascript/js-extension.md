# JavaScript Extension

The JavaScript Extension library bridges web pages loaded inside a native iOS or Android `WebView` with native Reward SDK APIs. This allows web-based interfaces to trigger native SDK functionality — such as logging actions or opening the SDK Portal — directly from JavaScript.

## Installation

Add the following `<script>` tag inside the `<head>` tag of your page:

```html
<script
    type="text/javascript"
    src="https://portal.reward.rakuten.co.jp/sdk-static/jsext/x.x.x/missionsdk-ext.js">
</script>
```

After loading, the library is available via the `window` object:

```javascript
const rewardSDKExt = window.RakutenRewardExt || {};
```

## Setup

Before calling any API, set the platform to match the native app hosting the WebView:

```javascript
// Android
rewardSDKExt.setPlatform('android');

// iOS
rewardSDKExt.setPlatform('ios');
```

## Supported APIs

### Log Action

```javascript
rewardSDKExt.logAction("YOUR_ACTION_CODE");
```

### Open SDK Portal

```javascript
rewardSDKExt.openSdkPortal();
```

### Get User Reward Points

```javascript
rewardSDKExt.getUserRewardPoint((points) => {
    console.log('Reward Points:', points); // e.g. 10
});
```

### Get Point History

```javascript
rewardSDKExt.getPointHistory((history) => {
    console.log('Points History:', history);
    // [{ points: 1, month: '202504' }, ...]
});
```

## API Reference

| Function | Parameters | Description |
|---|---|---|
| `setPlatform` | `'android' \| 'ios'` | Set the platform before calling any API |
| `logAction` | `actionCode: string` | Trigger the native log action API |
| `openSdkPortal` | — | Trigger the native API to open the SDK Portal |
| `getUserRewardPoint` | `callback<number>` | Get the user's current reward points |
| `getPointHistory` | `callback<PointHistory[]>` | Get the user's point history |

### PointHistory

| Key | Type | Description |
|---|---|---|
| `points` | `number` | Points earned in the specific month |
| `month` | `string` | Month of points earned — format `YYYYMM`, e.g. `202504` |

::: info Native setup required
The native app must also complete the WebView setup on its side. See the [Android JavaScript Extension guide](/android/js-extension) or [iOS JavaScript Extension guide](/ios/js-extension).
:::
