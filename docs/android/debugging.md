# Debugging

## Enable debug logging

To print SDK debug logs to Logcat, call `RakutenRewardConfig.isDebuggable()`. We recommend guarding it with `BuildConfig.DEBUG` so logs are only printed in debug builds.

```kotlin
if (BuildConfig.DEBUG) {
    RakutenRewardConfig.isDebuggable()
}
```

Once enabled, filter Logcat by the tag `RakutenRewardSDK` to see SDK logs.
