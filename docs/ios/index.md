# Basic Setup

## Requirements

| Requirement | Value |
|---|---|
| Xcode | 26.2 or later |
| Swift | 6.x |
| iOS Deployment Target | 14.0 or later |
| SDK Version | 9.3.0 |

### Version Compatibility

| SDK Version | Minimum iOS | Xcode |
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

## Installation

> Please refer [here](https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS) for the latest SDK version.

### Swift Package Manager

Add the SDK as a package dependency in your `Package.swift`:

```swift
dependencies: [
    .package(
        url: "https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS-SPM",
        .exact("9.3.0")
    ),
]
```

Or add it directly in Xcode via **File → Add Package Dependencies** and enter the repository URL above.

### CocoaPods

Add the following to your `Podfile`:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
source 'https://github.com/rakuten-ads/Rakuten-Reward-Native-iOS.git'

target 'YourApp' do
  pod 'RakutenRewardNativeSDK', '9.3.0'
end
```

### Carthage

Add the following to your `Cartfile`:

```
binary "https://raw.githubusercontent.com/rakuten-ads/Rakuten-Reward-Native-iOS/master/CarthageSpec.json" == 9.3.0
```

Then fetch and embed the framework:

```bash
carthage update --platform ios --use-xcframeworks
```

Drag the built `XCFramework` from `Carthage/Build/` into the **Frameworks, Libraries, and Embedded Content** section of your target.