# デバッグ

## デバッグログの有効化

SDKのデバッグログをコンソールに出力するには、`RewardConfiguration.isDebug` を `true` に設定します。デバッグビルドのみでログが出力されるよう、デバッグフラグで制御することを推奨します。

```swift
#if DEBUG
RewardConfiguration.isDebug = true
#endif
```

有効にすると、SDKのログが `[INFO]` プレフィックス付きで出力されます。
