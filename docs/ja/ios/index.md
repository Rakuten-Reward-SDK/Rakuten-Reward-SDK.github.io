# 基本セットアップ

## 要件

| 要件 | バージョン |
|---|---|
| Xcode | 26.2 以上 |
| Swift | 6.x |
| iOS Deployment Target | 14.0 以上 |

### バージョン互換性

| SDKバージョン | 最小iOS | Xcode |
|---|---|---|
| 1.x | 9 | 11 |
| 2.x | 9 | 12 |
| 3.x | 9 | 13 |
| 4.x | 11 | 14 |
| 5.x | 11 | 14 |
| 6.x | 11 | 15 |
| 7.x | 13 | 15 |
| 8.x | 13 | 16 |
| 9.x | 14 | 26 |

## インストール

> 最新のSDKバージョンは[こちら](https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS)をご参照ください。

### Swift Package Manager

`Package.swift` にパッケージ依存関係を追加します：

```swift
dependencies: [
    .package(
        url: "https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS-SPM",
        .exact("x.x.x")
    ),
]
```

または、Xcodeの **File → Add Package Dependencies** から上記リポジトリURLを入力して追加することもできます。

### CocoaPods

`Podfile` に以下を追加します：

```ruby
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS.git'

target 'YourApp' do
  pod 'RakutenRewardNativeSDK', 'x.x.x'
end
```

### Carthage

`Cartfile` に以下を追加します：

```
binary "https://raw.githubusercontent.com/rakuten-ads/Rakuten-Reward-Native-iOS/master/CarthageSpec.json" == x.x.x
```

フレームワークを取得して組み込みます：

```bash
carthage update --platform ios --use-xcframeworks
```

ビルドされた `XCFramework` を `Carthage/Build/` からターゲットの **Frameworks, Libraries, and Embedded Content** セクションにドラッグしてください。
