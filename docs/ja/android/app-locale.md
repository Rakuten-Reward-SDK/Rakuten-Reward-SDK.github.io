# アプリのロケール

楽天リワードSDKは5つの言語に対応しています。

| 言語 | `SupportedLocale` の値 | プレビュー |
|---|---|---|
| 日本語 | `Japanese` | ![日本語](/assets/android/sdk-ja.png) |
| 英語 | `English` | ![英語](/assets/android/sdk-en.png) |
| 韓国語 | `Korean` | ![韓国語](/assets/android/sdk-ko.png) |
| 繁体字中国語 | `ChineseTraditional` | ![繁体字中国語](/assets/android/sdk-zh-tw.png) |
| 簡体字中国語 | `ChineseSimplified` | ![簡体字中国語](/assets/android/sdk-zh-cn.png) |

デフォルトでは、SDKはデバイスのロケールに従って言語を表示します。アプリが特定の言語のみをサポートしている場合、SDKの画面がアプリの他の部分と異なる言語で表示されることがあります。`setAppLocale` を使って一貫したユーザー体験を提供してください。

## アプリのロケールを設定する

```kotlin
RakutenRewardConfig.setAppLocale(Japanese)
```

## その他の言語

サポートされていない言語をお使いの場合は、ISO 639言語コードを `OtherLocale` で指定します。

```kotlin
RakutenRewardConfig.setAppLocale(OtherLocale("th")) // タイ語
```

SDKが指定されたロケールに対応していない場合は、**日本語**にフォールバックします。
