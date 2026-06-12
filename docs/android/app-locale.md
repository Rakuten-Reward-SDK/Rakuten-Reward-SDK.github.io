# App Locale

The Rakuten Reward SDK supports 5 languages:

| Language | `SupportedLocale` value | Preview |
|---|---|---|
| Japanese | `Japanese` | ![Japanese](/assets/android/sdk-ja.png) |
| English | `English` | ![English](/assets/android/sdk-en.png) |
| Korean | `Korean` | ![Korean](/assets/android/sdk-ko.png) |
| Traditional Chinese | `ChineseTraditional` | ![Traditional Chinese](/assets/android/sdk-zh-tw.png) |
| Simplified Chinese | `ChineseSimplified` | ![Simplified Chinese](/assets/android/sdk-zh-cn.png) |

By default, the SDK displays in the device's locale. If your app only supports a specific language, the SDK screens may appear in a different language than the rest of your app. Use `setAppLocale` to keep the experience consistent.

## Set the app locale

```kotlin
RakutenRewardConfig.setAppLocale(Japanese)
```

## Other languages

If your app's language is not in the supported list, pass an ISO 639 language code via `OtherLocale`:

```kotlin
RakutenRewardConfig.setAppLocale(OtherLocale("th")) // Thai
```

If the SDK does not support the specified locale, it falls back to **Japanese**.
