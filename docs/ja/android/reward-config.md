# RakutenRewardConfig

`RakutenRewardConfig` はReward SDKの設定クラスです。オプトアウト、通知UI、デバッグ、ロケールなどのSDKの動作を制御するために使用します。

## APIリファレンス

| API | 説明 | 使用例 |
|---|---|---|
| `isOptedOut()` | 現在のオプトアウト状態を返す。`true` はオプトアウト済みでSDK機能が動作しない。 | `RakutenRewardConfig.isOptedOut()` |
| `setOptedOut(Boolean)` | オプトアウト状態を設定する | `RakutenRewardConfig.setOptedOut(true)` |
| `isUiEnabled()` | ミッション達成通知UIが有効かどうかを返す | `RakutenRewardConfig.isUiEnabled()` |
| `setUiEnabled(Boolean)` | ミッション達成通知UIを有効・無効にする | `RakutenRewardConfig.setUiEnabled(true)` |
| `isDebuggable()` | SDKデバッグログを有効にする。[デバッグ](./debugging)を参照 | `RakutenRewardConfig.isDebuggable()` |
| `isUsingSdkPortal(Boolean)` | SDKポータルを有効・無効にする。`rewardsdknative-ui` モジュールのみで使用可能 | `RakutenRewardConfig.isUsingSdkPortal(true)` |
| `setAppLocale(SupportedLocale)` | SDK UIのロケールを設定する。[アプリのロケール](./app-locale)を参照 | `RakutenRewardConfig.setAppLocale(Japanese)` |
| `getAppLocale()` | 現在のアプリロケールを取得する。未設定の場合は `null` を返す | `RakutenRewardConfig.getAppLocale()` |
