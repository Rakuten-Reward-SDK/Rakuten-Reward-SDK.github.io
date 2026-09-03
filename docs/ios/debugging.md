# Debugging

## Enable debug logging

To print SDK debug logs to the console, set `RewardConfiguration.isDebug` to `true`. We recommend guarding it with a debug build flag so logs are only printed in debug builds.

```swift
#if DEBUG
RewardConfiguration.isDebug = true
#endif
```

Once enabled, SDK logs will be printed with the prefix `[INFO]`.