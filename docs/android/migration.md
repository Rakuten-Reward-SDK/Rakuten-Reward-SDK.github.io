# Migration Guide

## Migrate to version 8.0.0
Please refer to the [v8 migration guide](v8-migration.md) for details on upgrading to version 8.0.0.

## Migrate to version 5.0.0
Version 5.0.0 removes the Mission SDK's dependency on RUNA SDK's Core library. If your application doesn't integrate RUNA SDK, you can remove the following maven repository from your project-level `build.gradle` file:

```groovy
maven { 
    url 'https://raw.github.com/rakuten-ads/rakuten-ads-android/master/maven' 
}
```

## Migrate to version 3.3.0

### SDK Initialization
1. Set your `AppCode` in AndroidManifest.xml:
   ```xml
   <application>
       <!-- Reward SDK Application Key -->
       <meta-data
           android:name="com.rakuten.gap.ads.mission_core.appKey"
           android:value="{Application Key}"/>
   </application>
   ```

2. Remove the old initialization method from your code:
   ```kotlin
   RakutenReward.init(context, "<AppCode>")
   ```

#### For RID/RAE login options
1. Remove any existing initialization methods using tokens
2. Use the new token setting APIs:
   ```kotlin
   // For RID login
   RakutenReward.setRIdToken("token")

   // For RAE login
   RakutenReward.setRaeToken("token")
   ```

### Deprecated methods
The following context-requiring methods are deprecated. Remove the context parameter when updating:

- `RakutenAuth.getUserName(context)`
- `RakutenRewardConfig.setOptedOut(context, optedOut)`
- `RakutenRewardConfig.setUiEnabled(context, uiEnabled)`

## Migrate to version 3.1.0
The `RakutenReward.listener` variable is deprecated. Use these APIs instead:

**Note:** If your Activity extends `RakutenRewardBaseActivity`, you don't need to manually handle the listener.

- Add listener:
  ```kotlin
  override fun onResume() {
      super.onResume()
      RakutenReward.addRakutenRewardListener(listener)
  }
  ```

- Remove listener (to prevent memory leaks):
  ```kotlin
  override fun onPause() {
      super.onPause()
      RakutenReward.removeRakutenRewardListener(listener)
  }
  ```

## Migrate from V1 SDK
Refer to the [V1 migration guide](migrate-from-v1.md) for instructions on upgrading from the legacy V1 SDK.