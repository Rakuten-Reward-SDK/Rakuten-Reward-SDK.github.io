# JavaScript Extension

The JavaScript Extension library bridges web pages loaded inside a native iOS or Android `WebView` with native Reward SDK APIs. This allows web-based interfaces to trigger native SDK functionality — such as logging actions or opening the SDK Portal — directly from JavaScript.

## Installation

Add the following `<script>` tag inside the `<head>` tag of your page:

```html
<script
    type="text/javascript"
    src="https://portal.reward.rakuten.co.jp/sdk-static/jsext/1.3.0/missionsdk-ext.js">
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
// Basic usage
rewardSDKExt.logAction("YOUR_ACTION_CODE");

// With callback
rewardSDKExt.logAction("YOUR_ACTION_CODE", (result) => {
  if (result.success) {
    console.log('Action logged successfully');
  } else {
    console.error('Failed:', result.error);
  }
});
```

### Open SDK Portal

```javascript
// Basic usage
rewardSDKExt.openSdkPortal();

// With callback
rewardSDKExt.openSdkPortal((result) => {
  if (result.success) {
    console.log('Portal opened');
  } else {
    console.error('Failed:', result.error);
  }
});
```

### Open SPS Portal

```javascript
// Basic usage
rewardSDKExt.openSpsPortal();

// With callback
rewardSDKExt.openSpsPortal((result) => {
  if (result.success) {
    console.log('SPS portal opened');
  } else {
    console.error('Failed:', result.error);
  }
});
```

### Get Mission List (Lite)

```javascript
rewardSDKExt.getMissionLite((missions) => {
  missions.forEach((m) => {
    console.log(m.name, m.actionCode, m.point + 'pt');
  });
});
```

### Get Mission Details

```javascript
rewardSDKExt.getMissionDetails('daily_login', (mission) => {
  if (!mission) {
    console.error('Mission not found');
    return;
  }
  console.log(mission.name, mission.progress + '/' + mission.times, mission.point + 'pt');
});
```

### Get Unclaim List

```javascript
rewardSDKExt.getUnclaimList((items) => {
  items.forEach((item) => {
    console.log(item.name, item.point + 'pt unclaimed');
  });
});
```

### Claim Mission Point

```javascript
// Basic usage
rewardSDKExt.claimMissionPoint('daily_login', '20260617');

// With callback
rewardSDKExt.claimMissionPoint('daily_login', '20260617', (result) => {
  if (result.success) {
    console.log('Points claimed');
  } else {
    console.error('Failed:', result.error);
  }
});
```

### Get User Reward Points

```javascript
rewardSDKExt.getUserRewardPoint((result) => {
  if (result.success) {
    console.log('Reward Points:', result.data); // e.g. 10
  }
});
```

### Get Point History

```javascript
rewardSDKExt.getPointHistory((result) => {
  if (result.success) {
    console.log('Points History:', result.data);
    // [{ points: 1, month: '202504' }, ...]
  }
});
```

## Error Handling

All SDK methods return a `Promise`. Errors are thrown asynchronously, so you must either `await` the call or use `.catch()`.

### Using async/await

```javascript
async function openPortal() {
  try {
    await rewardSDKExt.openSpsPortal((result) => {
      if (result.success) {
        console.log('SPS portal opened successfully');
      } else {
        console.warn('SDK returned failure:', result.error);
      }
    });
  } catch (error) {
    console.error('SDK error:', error);
  }
}
```

### Using Promise .catch()

```javascript
rewardSDKExt.openSpsPortal((result) => {
  if (result.success) {
    console.log('SPS portal opened successfully');
  } else {
    console.warn('SDK returned failure:', result.error);
  }
}).catch((error) => {
  console.error('SDK error:', error);
});
```

## API Reference

| Function | Parameters | Description |
|---|---|---|
| `setPlatform` | `'android' \| 'ios'` | Set the platform before calling any API |
| `logAction` | `actionCode: string`, `callback?: (result: ActionResult) => void` | Trigger the native log action API |
| `openSdkPortal` | `callback?: (result: ActionResult) => void` | Open the SDK Portal |
| `openSpsPortal` | `callback?: (result: ActionResult) => void` | Open the SPS Portal |
| `getMissionLite` | `callback: (result: SDKResult<MissionLite[]>) => void` | Get lite mission list |
| `getMissionDetails` | `actionCode: string`, `callback: (result: SDKResult<MissionDetails>) => void` | Get full mission details |
| `getUnclaimList` | `callback: (result: SDKResult<UnclaimItem[]>) => void` | Get list of unclaimed missions |
| `claimMissionPoint` | `actionCode: string`, `achievedDate: string`, `callback?: (result: ActionResult) => void` | Claim points for completed mission |
| `getUserRewardPoint` | `callback: (result: SDKResult<number>) => void` | Get user's current reward points |
| `getPointHistory` | `callback: (result: SDKResult<PointHistoryItem[]>) => void` | Get user's point history |

### PointHistoryItem

| Key | Type | Description |
|---|---|---|
| `points` | `number` | Points earned in the specific month |
| `month` | `string` | Month of points earned — format `YYYYMM`, e.g. `202504` |

::: info Native setup required
The native app must also complete the WebView setup on its side. See the [Android JavaScript Extension guide](/android/js-extension) or [iOS JavaScript Extension guide](/ios/js-extension).
:::