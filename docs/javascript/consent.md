# User Consent

Mission JS SDK provides an optional user consent feature for the Reward SDK's terms of use and privacy policy. If enabled, users must give consent before they can open the SDK Portal, log actions, or claim points.

## Check Consent Status

```javascript
const isConsent = rewardSDK.getIsUserConsent(); // true or false
```

## Show Consent Popup

Display the full consent dialog:

![Consent popup](/assets/javascript/consent-popup.png)

```javascript
rewardSDK.displayConsentPopup({
    successCallback: () => {
        // User accepted consent
    },
    closeCallback: () => {
        // User rejected or dismissed
    },
});
```

## Show Consent Banner

Display a less intrusive banner that opens the consent popup when tapped:

![Consent banner](/assets/javascript/consent-banner-ja.png)

```javascript
rewardSDK.displayConsentBanner((isAccepted) => {
    console.log("isAccepted", isAccepted);
});
```

## Accept Consent Programmatically

```javascript
await rewardSDK.acceptConsent();
```

## Force Consent Before Log Action

To require consent before a user can log a mission action, pass `forceDisplayConsentPopup`:

```javascript
await rewardSDK.logAction({
    actionCode: "YOUR_ACTION_CODE",
    forceDisplayConsentPopup: true,
});
```
