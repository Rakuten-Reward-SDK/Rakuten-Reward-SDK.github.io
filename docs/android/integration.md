# Integration

## Initialize SDK

Initialize the SDK in your `Application` class using the App Code provided in the Rakuten Reward Developer Portal.

### Option A — AndroidManifest.xml (recommended)

Set your App Code as a `<meta-data>` entry. No manual initialization call is needed.

```xml
<application>
    <meta-data
        android:name="com.rakuten.gap.ads.mission_core.appKey"
        android:value="{Your App Code}" />
</application>
```

### Option B — Application class

Alternatively, call `RakutenReward.init()` directly in your `Application.onCreate()`.

```kotlin
class App : Application() {

    override fun onCreate() {
        super.onCreate()
        RakutenReward.init("<AppCode>")
    }
}
```

## Start SDK in Activity

The SDK must be bound to the Activity lifecycle. Choose whichever option fits your architecture.

### Option 1 — Extend RakutenRewardBaseActivity

The simplest approach — extend `RakutenRewardBaseActivity` and the SDK handles the lifecycle automatically.

```kotlin
class YourActivity : RakutenRewardBaseActivity() {
    // Nothing else needed
}
```

### Option 2 — Manual lifecycle methods

If you cannot extend `RakutenRewardBaseActivity`, call the lifecycle methods manually.

```kotlin
class YourActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RakutenRewardLifecycle.onCreate(this)
    }

    override fun onStart() {
        super.onStart()
        RakutenRewardLifecycle.onStart(this)
    }

    override fun onResume() {
        RakutenRewardLifecycle.onResume(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        RakutenRewardLifecycle.onDestroy()
    }
}
```

### Option 3 — AndroidX lifecycle observer

Using `AppCompatActivity`? Call `bindRakutenRewardIn` in `onCreate` — it observes the lifecycle automatically.

```kotlin
class YourActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RakutenRewardManager.bindRakutenRewardIn(this, this)
    }
}
```

## RakutenRewardListener

`RakutenRewardListener` lets you react to SDK status changes and mission events in your Activity or Fragment.

### Callbacks

| Callback | Triggered when |
|---|---|
| `onSDKStatusChanged(status: RakutenRewardSDKStatus)` | SDK status changes |
| `onUserUpdated(user: RakutenRewardUser)` | User data is updated |
| `onUnclaimedAchievement(achievement: MissionAchievementData)` | User achieves a mission |
| `onSDKClaimClosed(achievement: MissionAchievementData, status: RakutenRewardClaimStatus)` | Claim UI is closed |
| `onSDKClaimPresented(achievement: MissionAchievementData)` | Claim UI is shown |
| `onSDKConsentPresented()` | Consent dialog is shown |
| `onSDKConsentClosed()` | Consent dialog is closed |

### Register and unregister

```kotlin
// Register
RakutenReward.addRakutenRewardListener(this)

// Unregister
RakutenReward.removeRakutenRewardListener(this)
```

> If you register the listener in an Activity or Fragment, always call `removeRakutenRewardListener` when it is destroyed to avoid memory leaks.
