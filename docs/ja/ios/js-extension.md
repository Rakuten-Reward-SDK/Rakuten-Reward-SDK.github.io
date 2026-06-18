# JavaScript拡張機能

ネイティブアプリの一部のページはWebベースで、`WKWebView` 内に表示される場合があります。JavaScript拡張機能（SDK v7.2.0から利用可能）により、これらのWebページからReward SDK APIを呼び出すことができます。

## セットアップ

`WKWebView` を作成してから、コンテンツを読み込む前に `setupWebView` を呼び出します：

```swift
let webView = WKWebView(frame: .zero)

RewardJS.shared.setupWebView(
    appcode: "YOUR_APP_CODE",
    domain: "yourdomain.com",
    webview: webView
) { result in
    switch result {
    case .success:
        // セットアップ成功 — コンテンツを読み込んでください
        webView.load(URLRequest(url: yourURL))
    case .failure(let error):
        // RewardJSError
    }
}
```

| パラメータ | 説明 |
|---|---|
| `appcode` | Rakuten Reward Developer PortalのアプリケーションKey |
| `domain` | JS拡張機能を実装したWebページのドメイン |
| `webview` | 設定対象の `WKWebView` インスタンス |
| `completion` | メインスレッドで `Result<Void, RewardJSError>` を返すコールバック |

## サポートAPI

JS拡張機能を通じてWebページから呼び出せるReward SDK APIは以下の通りです：

| JavaScriptの呼び出し | ネイティブの対応 |
|---|---|
| `missionsdk.logAction(...)` | `RakutenReward.shared.logAction` |
| `missionsdk.openSDKPortal()` | `RakutenReward.shared.openPortal` |
| `missionsdk.getUserRewardPoint()` | `RakutenReward.shared.getCurrentMonthPoints` |
| `missionsdk.getPointHistory()` | `RakutenReward.shared.getPointHistory` |

JavaScript側の実装については、[JavaScript拡張機能ガイド](/ja/javascript/)をご参照ください。
