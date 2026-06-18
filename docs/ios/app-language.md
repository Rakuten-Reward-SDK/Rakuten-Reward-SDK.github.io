# App Language

The Rakuten Reward SDK supports 5 languages:

| Language | Code |
|---|---|
| Japanese | `ja` |
| English | `en` |
| Korean | `ko` |
| Traditional Chinese | `zh-hant` |
| Simplified Chinese | `zh-hans` |

By default, the SDK displays in the device's locale. If your app only supports a specific language, the SDK screens may appear in a different language than the rest of your app. Use `setAppLanguage` to keep the experience consistent.

## Set the app language

```swift
RewardConfiguration.setAppLanguage("ja") // Japanese
```

## Reset to device default

Pass an empty string to let the SDK follow the device locale again:

```swift
RewardConfiguration.setAppLanguage("") // Device default
```

If the SDK does not support the specified language, it falls back to **Japanese**.
