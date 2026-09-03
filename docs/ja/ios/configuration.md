# 設定

`RewardConfiguration` はReward SDKの設定クラスです。オプトアウト、通知UI、デバッグ、言語などのSDKの動作を制御するために使用します。

すべてのプロパティとメソッドはstaticです — `RewardConfiguration` に直接アクセスしてください。

## APIリファレンス

| API | 説明 | 例 |
|---|---|---|
| `isUserOptingOut` | 現在のオプトアウト状態を返します。`true` の場合、ユーザーはオプトアウトされSDK機能は動作しません。 | `RewardConfiguration.isUserOptingOut` |
| `isUserSettingUIEnabled` | ミッション達成通知UIが有効かどうかを返します | `RewardConfiguration.isUserSettingUIEnabled` |
| `isDebug` | 詳細なSDKデバッグログを有効にします。[デバッグ](./debugging)を参照 | `RewardConfiguration.isDebug = true` |
| `isPortalPresent` | SDKポータルが現在表示されている場合 `true`（読み取り専用） | `RewardConfiguration.isPortalPresent` |
| `isUsingSDKPortal` | SDKポータルの有効/無効を設定します。デフォルトは `true` | `RewardConfiguration.isUsingSDKPortal = true` |
| `setAppLanguage(_:)` | SDK UIの言語を設定します。[アプリの言語](./app-language)を参照 | `RewardConfiguration.setAppLanguage("ja")` |

## オプトアウト

ユーザーがオプトアウトすると、すべてのSDK機能が無効になり、ミッションや通知は表示されなくなります。

```swift
// ユーザーをオプトアウトする
RewardConfiguration.isUserOptingOut = true

// ユーザーをオプトインに戻す
RewardConfiguration.isUserOptingOut = false
```

## 通知UI

ミッション達成通知UIをグローバルに無効化または再有効化します：

```swift
// すべての通知UIを無効化
RewardConfiguration.isUserSettingUIEnabled = false

// 再有効化
RewardConfiguration.isUserSettingUIEnabled = true
```

## SDKポータル

SDKポータルはデフォルトで有効になっています。アプリで使用しない場合は `isUsingSDKPortal` を `false` に設定します：

```swift
RewardConfiguration.isUsingSDKPortal = false
```