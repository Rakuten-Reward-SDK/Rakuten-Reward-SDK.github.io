# User Consent

## Overview

Logged-in users must accept the Rakuten Reward SDK terms of service and privacy policy before they can access any mission features. Until consent is provided, mission-related APIs will fail and the SDK status will be `.userNotConsent`.

Your app is responsible for deciding when to prompt the user — the SDK will not show the consent dialog on its own.

## Request Consent

Call `requestForConsent` to show the consent dialog. If the user has already consented, the dialog is skipped and the callback returns immediately with `.consentProvided`.

![Consent dialog](/assets/ios/consent-dialog.png)

```swift
RakutenReward.shared.requestForConsent { status in
    switch status {
    case .consentProvided:
        // User agreed — proceed normally
    case .consentNotProvided:
        // User dismissed without agreeing
    case .consentFailed:
        // API error — retry or inform the user
    case .consentProvidedRestartSessionFailed:
        // User agreed but session restart failed — retry initSdkThirdParty
    case .consentUIAlreadyPresented:
        // Dialog is already on screen — ignore
    }
}
```

### Consent status

| Status | Description |
|---|---|
| `.consentProvided` | User has provided consent |
| `.consentNotProvided` | User has not yet provided consent |
| `.consentFailed` | API request error |
| `.consentProvidedRestartSessionFailed` | User consented but session restart failed |
| `.consentUIAlreadyPresented` | The dialog is currently on screen |

## Consent Notification Banner

As a lighter prompt, you can show a banner instead. The banner only appears when consent has not yet been provided — tapping it opens the full consent dialog.

![Consent banner](/assets/ios/consent-banner.png)

```swift
RakutenReward.shared.showConsentBanner { status in
    // Same RakutenRewardConsentStatus values as above
}
```

## Recommendation

> We recommend showing the consent UI on any page where the user is about to perform a mission action. This way the user is prompted as early as possible and won't miss out on mission progress.

Monitor SDK status changes and show the appropriate UI when the status is `.userNotConsent`:

**Consent dialog**
```swift
RakutenReward.shared.didUpdateStatus = { status in
    if status == .userNotConsent {
        RakutenReward.shared.requestForConsent { _ in }
    }
}
```

**Notification banner**
```swift
RakutenReward.shared.didUpdateStatus = { status in
    if status == .userNotConsent {
        RakutenReward.shared.showConsentBanner { _ in }
    }
}
```