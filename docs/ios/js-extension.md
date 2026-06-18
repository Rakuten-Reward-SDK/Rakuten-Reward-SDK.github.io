# JavaScript Extension

Some pages in a native app may be web-based and displayed inside a `WKWebView`. The JavaScript Extension (available from SDK v7.2.0) allows Reward SDK APIs to be triggered from within those web pages.

## Setup

Create your `WKWebView` first, then call `setupWebView` before loading any content:

```swift
let webView = WKWebView(frame: .zero)

RewardJS.shared.setupWebView(
    appcode: "YOUR_APP_CODE",
    domain: "yourdomain.com",
    webview: webView
) { result in
    switch result {
    case .success:
        // Setup succeeded — load your content
        webView.load(URLRequest(url: yourURL))
    case .failure(let error):
        // RewardJSError
    }
}
```

| Parameter | Description |
|---|---|
| `appcode` | Your application key from the Rakuten Reward Developer Portal |
| `domain` | The domain of the web page that implements the JS extension |
| `webview` | The `WKWebView` instance to configure |
| `completion` | Callback returning `Result<Void, RewardJSError>` on the main thread |

## Supported APIs

The following Reward SDK APIs can be called from the web page via the JS extension:

| JavaScript call | Native equivalent |
|---|---|
| `missionsdk.logAction(...)` | `RakutenReward.shared.logAction` |
| `missionsdk.openSDKPortal()` | `RakutenReward.shared.openPortal` |
| `missionsdk.getUserRewardPoint()` | `RakutenReward.shared.getCurrentMonthPoints` |
| `missionsdk.getPointHistory()` | `RakutenReward.shared.getPointHistory` |

For the JavaScript-side implementation, refer to the [JavaScript Extension guide](/javascript/).
