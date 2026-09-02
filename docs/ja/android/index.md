# 基本セットアップ

## 要件

SDKを統合する前に、プロジェクトが以下の最低要件を満たしていることを確認してください。

| 要件 | 最小バージョン |
|---|---|
| Android Studio | Arctic Fox 以上 |
| Minimum SDK | API 24 — Android 7.0 |
| Compile SDK | API 36 |
| AndroidX | 必須 |

## Gradleのセットアップ

### ステップ1 — Mavenリポジトリの追加

**プロジェクトレベル**の `build.gradle` に、`allprojects` のリポジトリブロックへ楽天のMaven URLを追加してください。

```groovy
allprojects {
    repositories {
        mavenCentral()
        maven {
            url "https://raw.githubusercontent.com/rakuten-ads/Rakuten-Reward-Native-Android/master/maven"
        }
    }
}
```

### ステップ2 — 依存関係の追加

**アプリレベル**の `build.gradle` に、Bill of Materials（BoM）をインポートしてすべてのSDKライブラリバージョンを一元管理し、個別バージョンを指定せずにモジュールを宣言します。

```groovy
dependencies {
    // BoMのインポート — すべてのReward SDKライブラリバージョンを管理
    implementation platform('com.rakuten.android:rewardsdknative-bom:x.x.x')

    // Core SDK（必須）
    implementation 'com.rakuten.android:rewardsdknative-core'

    // Built-in UI — ミッションポータル、通知（オプション）
    implementation 'com.rakuten.android:rewardsdknative-ui'
}
```

> 最新のSDKバージョンは[こちら](https://github.com/rakuten-ads/Rakuten-Reward-Native-Android)をご参照ください。

::: info ViewBinding と DataBinding
`rewardsdknative-ui` モジュールには ViewBinding と DataBinding が必要です。アプリでまだ有効にしていない場合は、アプリレベルの `build.gradle` に以下を追加してください。

```groovy
buildFeatures {
    viewBinding true
    dataBinding true
}
```
:::