# User Consent

## Overview

Logged-in users must accept the Rakuten Reward SDK terms of service and privacy policy before they can access any mission features. Until consent is provided, mission-related APIs will fail and the SDK status will be `USER_NOT_CONSENT`.

Your app is responsible for deciding when to prompt the user — the SDK will not show the consent dialog on its own.

## Request consent

Call `requestForConsent` to show the consent dialog. If the user has already consented, the dialog is skipped and the callback returns immediately with `CONSENT_PROVIDED`.

```kotlin
RakutenReward.requestForConsent { status ->
    // check consent status
}
```

![Consent dialog](/assets/android/consent-dialog.png)

### Consent status

| Status | Description |
|---|---|
| `CONSENT_PROVIDED` | User has provided consent |
| `CONSENT_NOT_PROVIDED` | User has not yet provided consent |
| `CONSENT_FAILED` | API request error |
| `CONSENT_PROVIDED_RESTART_SESSION_FAILED` | User consented but session restart failed |

## Consent notification banner

As a lighter prompt, you can show a banner instead. The banner only appears when consent has not yet been provided — tapping it opens the full consent dialog.

```kotlin
RakutenReward.showConsentBanner { status ->
    // check consent status
}
```

![Consent banner](/assets/android/consent-banner.png)

## Recommendation

> We recommend showing the consent UI on any page where the user is about to perform a mission action. This way the user is prompted as early as possible and won't miss out on mission progress.

On that page, implement `onSDKStatusChanged` from `RakutenRewardListener`. When the status is `USER_NOT_CONSENT`, show either the consent dialog or the notification banner:

**Consent dialog**
```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.USER_NOT_CONSENT) {
        RakutenReward.requestForConsent()
    }
}
```

**Notification banner**
```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.USER_NOT_CONSENT) {
        RakutenReward.showConsentBanner()
    }
}
```
