# Mission Achievement

To complete a mission, your page needs to log a mission action using the `logAction` API. Once a mission is achieved, the SDK automatically shows a notification UI to prompt the user to claim their points.

## Log Action

Call `logAction` with the action code provided in the Reward SDK Developer Portal.

```javascript
// async/await
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });

// Promise-based
rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        // Handle error
    });
```

## Notification UI

When a mission is achieved, the SDK displays a notification based on the type configured in the Developer Portal.

| Notification Type | Behavior |
|---|---|
| `MODAL` | SDK-provided modal |
| `BANNER` | SDK-provided banner |
| `BANNER_50` | SDK-provided banner with 50px ad |
| `BANNER_250` | SDK-provided banner with 250px ad |
| `CUSTOM` | Developer builds and controls the UI |
| `NONE` | No notification shown |

### Modal

![Mission modal notification](/assets/javascript/mission-modal.png)

### Banner

![Mission banner notification](/assets/javascript/mission-banner.png)

### Banner 50

![Mission banner 50](/assets/javascript/mission-banner-50.png)

### Banner 250

![Mission banner 250](/assets/javascript/mission-banner-250.png)

### Custom Notification UI

For `CUSTOM` type missions, build your own notification UI using the `logAction` response:

```javascript
const response = await rewardSDK.logAction({ actionCode: "YOUR_ACTION_CODE" });

const isAchieved = response.success && response.achieved;
const isCustom = response.mission.notificationtype === "CUSTOM";
const isUIEnabled = rewardSDK.getUIEnabled();

if (isAchieved && isCustom && isUIEnabled) {
    // Show your custom notification UI
}
```

## Get Mission List

### Full list (with progress)

```javascript
const missions = await rewardSDK.getMissions();
```

### Lite list (without progress)

```javascript
const missions = await rewardSDK.getMissionsLite();
```

### Single mission details

```javascript
const mission = await rewardSDK.getMissionDetails({ actionCode: "YOUR_ACTION_CODE" });
```

## Log Action Multiple Times

```javascript
const responses = await rewardSDK.logActionMultipleTimes(
    { actionCode: "YOUR_ACTION_CODE" },
    5 // number of times
);
// responses: [{ status: 'fulfilled', value: MissionLogActionResponse }, ...]
```

## Mission Subscription

From v1.1.0, missions can require users to subscribe before they can log actions. This is configured per-mission in the Developer Portal by setting `Does this mission require user's subscription` to **Yes**.

When subscription is enabled, users see a Join button in the mission list:

![Join mission button](/assets/javascript/join-mission-button.png)

Clicking Join displays the terms and conditions:

![Terms and conditions popup](/assets/javascript/tnc-modal.png)

Once joined, a Leave button appears:

![Leave mission text](/assets/javascript/leave-mission-text.png)

Clicking Leave shows a confirmation:

![Leave confirmation modal](/assets/javascript/leave-modal.png)

If a user leaves and rejoins the same mission later, their progress is retained.

## Display Mission List

Render the SDK's built-in mission list UI inside a container element:

```javascript
rewardSDK.displayMissionList("sdk-mission-list-element-id");
```

![Mission list](/assets/javascript/mission-list.png)

Clicking a mission item shows its details:

![Mission item details](/assets/javascript/mission-list-details.png)
