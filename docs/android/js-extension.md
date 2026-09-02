# JavaScript Extension

Some pages in a native app may be web-based and displayed inside a `WebView`. The JavaScript Extension library allows Reward SDK APIs to be triggered from within those web pages.

## Add the dependency

Add `rewardsdknative-ext` to your module's `build.gradle`. It is versioned via the BoM so no explicit version is needed.

```groovy
implementation platform('com.rakuten.android:rewardsdknative-bom:x.x.x')
implementation 'com.rakuten.android:rewardsdknative-ext'
```

## Initialize

Call `RewardJS.setupWebView` to link the SDK with your WebView:

```kotlin
RewardJS.setupWebView("<appCode>", "<domain>", webView)
```

| Parameter | Description |
|---|---|
| `appCode` | Your application key from the Rakuten Reward Developer Portal |
| `domain` | The domain of the web page where the JS extension is implemented |
| `webView` | The `WebView` instance loading the web page |

## Consent Handling (Since 2.1.1)

Since version 2.1.1, if the user has not yet accepted the Reward Terms of Service, any API call will automatically show the consent dialog before proceeding. The API only executes if the user accepts. If the user declines, the API call is not executed.

## Supported APIs

The following Reward SDK APIs can be called from the web page via the JS extension:

| API | Description |
| --- | --- |
| `logAction(appKey, actionCode)` | Log a mission action |
| `logAction(appKey, actionCode, callback)` | Log a mission action with result callback |
| `openSdkPortal(appKey)` | Open the Reward SDK portal |
| `openSdkPortal(appKey, callback)` | Open the Reward SDK portal with result callback |
| `openSpsPortal(appKey)` | Open the SPS portal |
| `openSpsPortal(appKey, callback)` | Open the SPS portal with result callback |
| `getUserRewardPoint(appKey, callback)` | Get the user's current reward point balance |
| `getPointHistory(appKey, callback)` | Get the user's point history |
| `getMissionLite(appKey, callback)` | Get the mission list (lite version, no progress) |
| `getMissionDetails(appKey, actionCode, callback)` | Get full details of a single mission including progress |
| `getUnclaimList(appKey, callback)` | Get the list of unclaimed mission achievements |
| `claimMissionPoint(appKey, actionCode, achievedDate, callback)` | Claim the point for a mission achievement |

## Version Mapping

| BOM   | JS |
|-------| --- |
| 8.2.1 | 1.3.0 |
| 7.6.0 | 1.2.0 |
| 7.5.0 | 1.1.0 |
| 6.2.0 | 1.0.0 |

> Make sure the SDK session is started in the Activity (or its parent Activity if the WebView is hosted in a Fragment). See [Start SDK in Activity](./integration#start-sdk-in-activity).

For the JavaScript-side implementation, refer to the [JavaScript Extension guide](/javascript/).