# デバッグ

## デバッグログを有効にする

SDKのデバッグログをLogcatに出力するには、`RakutenRewardConfig.isDebuggable()` を呼び出します。デバッグビルドのみでログが出力されるよう、`BuildConfig.DEBUG` で囲むことをお勧めします。

```kotlin
if (BuildConfig.DEBUG) {
    RakutenRewardConfig.isDebuggable()
}
```

有効にした後は、Logcatで `RakutenRewardSDK` タグでフィルタリングするとSDKのログを確認できます。
