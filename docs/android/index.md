# Basic Setup

## Requirements

Before integrating the SDK, make sure your project meets the following minimum requirements.

| Requirement | Minimum |
|---|---|
| Android Studio | Arctic Fox or higher |
| Minimum SDK | API 24 — Android 7.0 |
| Compile SDK | API 36 |
| AndroidX | Required |

## Gradle Setup

### Step 1 — Add the Maven repository

In your **project-level** `build.gradle`, add the Rakuten Maven URL to the `allprojects` repositories block:

```groovy
allprojects {
    repositories {
        mavenCentral()
        maven {
            url "https://raw.githubusercontent.com/rakuten-ads/Rakuten-Reward-Native-Android/master/maven"
        }
    }
}
```

### Step 2 — Add dependencies

In your **app-level** `build.gradle`, import the Bill of Materials (BoM) to manage all SDK library versions from a single version number, then declare the modules without specifying individual versions.

```groovy
dependencies {
    // Import the BoM — controls all Reward SDK library versions
    implementation platform('com.rakuten.android:rewardsdknative-bom:x.x.x')

    // Core SDK (required)
    implementation 'com.rakuten.android:rewardsdknative-core'

    // Built-in UI — mission portal, notifications (optional)
    implementation 'com.rakuten.android:rewardsdknative-ui'
}
```

> Please refer [here](https://github.com/rakuten-ads/Rakuten-Reward-Native-Android) for the latest SDK version.

::: info ViewBinding & DataBinding
The `rewardsdknative-ui` module requires ViewBinding and DataBinding. If your app does not already enable them, add the following to your app-level `build.gradle`:

```groovy
buildFeatures {
    viewBinding true
    dataBinding true
}
```
:::

## Authentication

### Login Options

There are 2 types of login. Choose the one that fits your environment.

| Login Option | Description |
|--------------|-------------|
| RakutenAuth  | Default option. SDK handles login and user identification |
| RID          | Uses Rakuten ID SDK with RID. Login is handled by ID SDK, and uses API token for Reward SDK |

### Switch Login Option

By default, the login option is set to RakutenAuth.

#### RakutenAuth
```kotlin
RakutenReward.tokenType = RakutenRewardTokentype.RAKUTEN_AUTH
```

#### RID
```kotlin
RakutenReward.tokenType = RakutenRewardTokentype.RID
```

When using RID option, you need to set an API (API-C) token:

```kotlin
val tokenProvider = object: RewardTokenProvider {
    override suspend fun getAccessToken(): String {
        return if (isUserLoggedIn()) {
            yourAuthManager.getAccessToken()
        } else {
            ""  // Return empty string when user is not logged in
        }
    }
}
RakutenReward.init("<AppCode>", tokenProvider)
```

> :warning: **Important:** You must call the `logout` API whenever a user logs out to properly clear tokens and data.

## Initialize SDK

### Initialize in Application class
```kotlin
class App: Application() {
    override fun onCreate() {
        super.onCreate()
        RakutenReward.init("<AppCode>")
    }
}
```

| Parameter | Description |
|-----------|-------------|
| AppCode   | Application Key from Rakuten Reward Developer Portal |

> **From version 3.3.0 onward**, manual initialization is no longer needed. You can set your App Code in `AndroidManifest.xml`:
> ```xml
> <application>
>     <meta-data
>         android:name="com.rakuten.gap.ads.mission_core.appKey"
>         android:value="{Application Key}"/>
> </application>
> ```

### Start SDK in Activity

Choose one of these methods:

1. **Extend RakutenRewardBaseActivity**
   ```kotlin
   class YourActivity : RakutenRewardBaseActivity()
   ```

2. **Call lifecycle methods manually**
   ```kotlin
   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)
       RakutenRewardLifecycle.onCreate(this)
   }
   // Implement other lifecycle methods similarly
   ```

3. **Use AndroidX lifecycle**
   ```kotlin
   override fun onCreate(savedInstanceState: Bundle?) {
       super.onCreate(savedInstanceState)
       RakutenRewardManager.bindRakutenRewardIn(this, this)
   }
   ```

## Debugging

To enable SDK debug logs (recommended for DEBUG builds only):

```kotlin
if (BuildConfig.DEBUG) {
    RakutenRewardConfig.isDebuggable()
}
```

Logs will appear with the tag `RakutenRewardSDK`.

## Coroutine Support

SDK provides suspend function APIs in `RakutenRewardCoroutine`. Call these within a coroutine scope:

```kotlin
lifecycleScope.launch {
    val result = RakutenRewardCoroutine.getMissions()
    when (result) {
        is Failed -> handleError(result.error)
        is Success -> processMissions(result.data)
    }
}
```

## Localization

Rakuten Reward SDK supports 5 languages: Japanese, English, Korean, Simplified Chinese, and Traditional Chinese. By default, the SDK uses the device locale.

To force a specific language:

```kotlin
RakutenRewardConfig.setAppLocale(Japanese)  // Or English, Korean, etc.
```

For unsupported languages, provide an ISO 639 language code:

```kotlin
RakutenRewardConfig.setAppLocale(OtherLocale("th"))  // Thai
```

If the language isn't supported, the SDK falls back to Japanese.