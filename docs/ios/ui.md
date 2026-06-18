# Built-in UI

## SDK Portal

The SDK Portal is a full-screen UI where users can view their active missions and progress, claim unclaimed rewards, and review their point history.

### Open the portal

```swift
RakutenReward.shared.openPortal { result in
    switch result {
    case .success:
        break
    case .failure(let error):
        // SDKError — e.g. .sdkStatusNotOnline, .featureDisabledByUser
    }
}
```

::: info
If the user has not yet provided consent, `openPortal` handles the consent flow automatically before presenting the portal.
:::

### Portal screenshots

![Portal screen 1](/assets/ios/portal1.png) ![Portal screen 2](/assets/ios/portal2.png)

![Portal screen 3](/assets/ios/portal3.png) ![Portal screen 4](/assets/ios/portal4.png)

![Portal screen 5](/assets/ios/portal5.png) ![Portal screen 6](/assets/ios/portal6.png)

### Detect portal visibility

Some features (such as custom mission notifications) should not appear while the portal is open. Check the flag before showing your UI:

```swift
if !RewardConfiguration.isPortalPresent {
    // Safe to show custom notification UI
}
```

Subscribe to portal visibility changes:

```swift
RakutenReward.shared.didUpdateIsPortalPresentedStatus = { isPresented in
    // Update your UI accordingly
}
```

## Support Pages

Open SDK-hosted help and legal pages in the built-in mini browser:

```swift
// Help
RakutenReward.shared.openSupportPage(.help)

// Reward terms and conditions
RakutenReward.shared.openSupportPage(.termsCondition)

// Reward privacy policy
RakutenReward.shared.openSupportPage(.privacyPolicy)
```
