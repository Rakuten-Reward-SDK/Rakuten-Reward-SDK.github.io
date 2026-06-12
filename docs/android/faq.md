# FAQ

## General

### Reward SDK is written in Java or Kotlin? My app is written in Java — is there any problem?

<details>
<summary>Answer</summary>

Reward SDK is written fully in Kotlin but is also supported for Java. There may be some differences in how you call the APIs from Java code.

</details>

### Can we access the staging environment for development or testing?

<details>
<summary>Answer</summary>

No, we do not currently provide a staging environment. Please use a development mode or test account for development and testing.

</details>

### Does Reward SDK collect the end user's Advertising ID (ADID)?

<details>
<summary>Answer</summary>

Yes, Reward SDK collects the user's Advertising ID (ADID) for advertisement optimization.

</details>

### How do I opt out of collecting the end user's Advertising ID (ADID)?

<details>
<summary>Answer</summary>

Reward SDK uses the Google Play Ads Identifier library to collect ADID. To stop collecting it, make the following changes:

In `app/build.gradle`, exclude the Ads Identifier library:

```groovy
implementation ('com.rakuten.android:rewardsdknative-ui:x.x.x') {
    exclude group: 'com.google.android.gms', module: 'play-services-ads-identifier'
}
```

In `AndroidManifest.xml`, remove the ADID permission:

```xml
<uses-permission
    android:name="com.google.android.gms.permission.AD_ID"
    tools:node="remove" />
```

To verify ADID is no longer collected, check for the following log in Logcat:

![Logcat log](/assets/android/log.png)

</details>

### I integrated Reward SDK version 6.1.0 and the app crashes when obfuscation is enabled

![Crash log](/assets/android/crash-log.png)

The following SDK versions are affected: 6.1.0, 6.2.0, 7.0.0. This issue is fixed in **7.0.1**.

<details>
<summary>Answer</summary>

If you cannot upgrade the SDK version, add the following to your `proguard-rules.pro`:

```
-keep class com.rakuten.gap.ads.mission_remote.** { *; }
```

</details>

---

## Login Related

### What is Rakuten Auth login for?

<details>
<summary>Answer</summary>

The `RakutenAuth` login option is for third-party apps — apps outside of Rakuten that do not use a Rakuten login SDK. It allows those apps to authenticate users with Rakuten Reward.

</details>

### Can `RakutenAuth.openLoginPage` be called in a Fragment?

<details>
<summary>Answer</summary>

Yes. Pass the Fragment instance instead of `requireActivity()` and `onActivityResult` will be triggered in the Fragment.

```kotlin
class TestLoginFragment : Fragment() {
    companion object {
        private const val LOGIN_REQ_CODE = 533
    }

    private fun login() {
        RakutenAuth.openLoginPage(this, LOGIN_REQ_CODE)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == LOGIN_REQ_CODE && resultCode == RESULT_OK) {
            RakutenAuth.handleActivityResult(data, object : LoginResultCallback {
                override fun loginSuccess() { }
                override fun loginFailed(e: RakutenRewardAPIError) { }
            })
        }
    }
}
```

> If you pass `requireActivity()` instead of `this`, `onActivityResult` will be triggered in the Activity, not the Fragment.

</details>

---

## Implementation Related

### The API always returns `SDKNOTACTIVE`. What could be the cause?

<details>
<summary>Answer</summary>

This means the SDK has not started yet. Check the following:

1. Confirm that your App Key is set correctly in `AndroidManifest.xml`:

```xml
<application>
    <meta-data
        android:name="com.rakuten.gap.ads.mission_core.appKey"
        android:value="{Your App Key}" />
</application>
```

2. Confirm that your Activity is using one of the options to start the SDK. See [Start SDK in Activity](./integration#start-sdk-in-activity).

3. Wait for the SDK status to become `ONLINE` before calling APIs:

```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.ONLINE) {
        // SDK is ready, call APIs here
    }
}
```

</details>

### I have a daily app launch mission. How should I implement it?

<details>
<summary>Answer</summary>

Wait for the SDK status to become `ONLINE` before logging the action, as the SDK needs time to sync data after launch.

```kotlin
override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) {
    if (status == RakutenRewardSDKStatus.ONLINE) {
        RakutenReward.logAction("<actionCode>", {
            // success
        }) {
            // failed
        }
    }
}
```

</details>

### How do I implement a custom notification UI?

<details>
<summary>Answer</summary>

After `logAction` is called enough times to achieve a mission, `onUnclaimedAchievement` in `RakutenRewardListener` is triggered. Check that the notification type is `CUSTOM` before showing your UI:

```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        // Show custom UI on the main thread
    }
}
```

</details>

### How do I claim a mission after it is achieved?

<details>
<summary>Answer</summary>

Call `claim()` on the `MissionAchievementData` object. There are two ways to get it:

**Via `onUnclaimedAchievement`** (for CUSTOM notification type):

```kotlin
override fun onUnclaimedAchievement(achievement: MissionAchievementData) {
    if (achievement.custom && RakutenRewardConfig.isUiEnabled()) {
        achievement.claim({
            // claim success
        }) {
            // claim failed
        }
    }
}
```

**Via `getUnclaimedItems`**:

```kotlin
RakutenReward.getUnclaimedItems({ unclaimList ->
    unclaimList[0].claim({
        // claim success
    }) {
        // claim failed
    }
}) {
    // failed
}
```

</details>

### How do I implement `onSDKStatusChanged` or `onUnclaimedAchievement`?

<details>
<summary>Answer</summary>

Both are methods in `RakutenRewardListener`. Create a listener object and register/unregister it with the SDK:

```kotlin
val listener = object : RakutenRewardListener {
    override fun onUnclaimedAchievement(achievement: MissionAchievementData) { }
    override fun onUserUpdated(user: RakutenRewardUser) { }
    override fun onSDKStatusChanged(status: RakutenRewardSDKStatus) { }
    override fun onSDKClaimClosed(
        missionAchievementData: MissionAchievementData,
        status: RakutenRewardClaimStatus
    ) { }
}

override fun onResume() {
    super.onResume()
    RakutenReward.addRakutenRewardListener(listener)
}

override fun onPause() {
    super.onPause()
    RakutenReward.removeRakutenRewardListener(listener)
}
```

> If you are using `RakutenRewardBaseActivity`, this is handled automatically. You can simply override the methods you need.

</details>

### Is it possible to detect when the SDK Portal is closed?

<details>
<summary>Answer</summary>

Yes. Use the `activityResultCallback` parameter of `openSDKPortal` — it is called when the user closes the portal:

```kotlin
RakutenReward.openSDKPortal(
    isPortalOpenedCallback = { result ->
        // portal launch result
    },
    activityResultCallback = {
        // portal was closed by the user
    }
)
```

</details>

---

## BOM

### Am I forced to use the BOM?

<details>
<summary>Answer</summary>

No. You can still declare each dependency version manually. However, we recommend using the BOM as it ensures all Reward SDK libraries are on compatible versions.

</details>

### How do I use a different library version than what the BOM specifies?

<details>
<summary>Answer</summary>

Specify the version explicitly on the dependency line — it will override the BOM version.

</details>

### Does the BOM automatically add all libraries to my app?

<details>
<summary>Answer</summary>

No. The BOM only manages version alignment. You must still declare each library you want to use as a separate dependency in your `build.gradle`.

</details>
