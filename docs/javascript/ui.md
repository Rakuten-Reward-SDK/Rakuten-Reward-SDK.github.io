# Built-in UI

## SDK Portal

The SDK Portal is a full-screen popup where users can view their missions, claim unclaimed points, and check their point history.

![SDK Portal](/assets/javascript/sdk-portal.png)

### Open the portal

```javascript
rewardSDK.displaySDKPortal();
```

To detect when the portal is closed:

```javascript
rewardSDK.displaySDKPortal({
    closeCallback: () => {
        // Portal was closed
    },
});
```

### Portal Button

Render the SDK's built-in button that opens the portal:

```javascript
rewardSDK.displayPortalButton("sdk-portal-button-element-id", {
    closeCallback: () => {
        // Portal was closed
    },
});
```

### Reward Icon

Render a floating reward icon that opens the portal. The icon shows the user's unclaimed points count.

```javascript
rewardSDK.displayRewardIcon(
    "sdk-portal-reward-icon-element-id",
    { position: "topRight", width: 48, height: 48 },
    {
        closeCallback: () => {
            // Portal was closed
        },
    }
);
```

**`RewardIconOptions`**

| Property | Type | Default | Description |
|---|---|---|---|
| `position` | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` | Position of the icon |
| `width` | `number` | `48` | Icon width in px |
| `height` | `number` | `48` | Icon height in px |

## Unclaimed Points List

Render the SDK's built-in unclaimed points list inside a container element:

```javascript
rewardSDK.displayUnclaimedItems("sdk-unclaimed-items-element-id");
```

![Unclaimed points list](/assets/javascript/unclaimed-points-list.png)

Clicking the Claim button opens the claim popup:

![Claim point popup](/assets/javascript/claim-point-popup.png)

## Support Pages

Open SDK-hosted pages in a new tab:

```javascript
rewardSDK.openFaqUrl();       // Help / FAQ page
rewardSDK.openTncUrl();       // Terms of use
rewardSDK.openPrivacyUrl();   // Privacy policy
```
