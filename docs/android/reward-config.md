# RakutenRewardConfig

`RakutenRewardConfig` is the configuration class for the Reward SDK. Use it to control SDK behaviour such as opt-out, notification UI, debugging, and locale.

## API Reference

| API | Description | Example |
|---|---|---|
| `isOptedOut()` | Returns the current opt-out status. `true` means the user is opted out and SDK features will not work. | `RakutenRewardConfig.isOptedOut()` |
| `setOptedOut(Boolean)` | Set the opt-out status | `RakutenRewardConfig.setOptedOut(true)` |
| `isUiEnabled()` | Returns whether mission achievement notification UI is enabled | `RakutenRewardConfig.isUiEnabled()` |
| `setUiEnabled(Boolean)` | Enable or disable mission achievement notification UI | `RakutenRewardConfig.setUiEnabled(true)` |
| `isDebuggable()` | Enable SDK debug logging. See [Debugging](./debugging) | `RakutenRewardConfig.isDebuggable()` |
| `isUsingSdkPortal(Boolean)` | Enable or disable the SDK Portal. Only available in the `rewardsdknative-ui` module | `RakutenRewardConfig.isUsingSdkPortal(true)` |
| `setAppLocale(SupportedLocale)` | Set the locale for SDK UI. See [App Locale](./app-locale) | `RakutenRewardConfig.setAppLocale(Japanese)` |
| `getAppLocale()` | Get the current app locale. Returns `null` if not set | `RakutenRewardConfig.getAppLocale()` |
