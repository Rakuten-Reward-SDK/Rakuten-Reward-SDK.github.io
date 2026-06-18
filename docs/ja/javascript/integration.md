# インテグレーション

## SDKの初期化

Rakuten Reward Developer Portalで提供されるApp Keyを使って、SDKが読み込まれた後に一度だけ `init` を呼び出してください。

```javascript
const rewardSDK = window.RewardMissionSDK || {};

rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
});
```

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| `appKey` | `string` | 必須 | Rakuten Reward Developer PortalのアプリケーションKey |
| `language` | `string` | 任意 | UI言語。省略した場合はブラウザの言語設定を使用し、デフォルトは `ja` |

## 言語

SDKは以下の言語をサポートしています：

| 言語 | コード |
|---|---|
| 日本語（デフォルト） | `ja` |
| 英語 | `en` |
| 韓国語 | `ko-KR` |
| 繁体字中国語 | `zh-TW` |
| 簡体字中国語 | `zh-CN` |

初期化時に言語コードを渡します：

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
});
```

指定した言語がサポートされていない場合、SDKは**日本語**にフォールバックします。

## 初期化後にコードを実行する

`init` は非同期です。SDKの準備が完了してからコードを実行するには `successCallback` または `async/await` を使用してください。

**`successCallback` を使う場合：**

```javascript
rewardSDK.init({
    appKey: "YOUR_APP_KEY",
    language: "ja",
    successCallback: async () => {
        const isSignedIn = await rewardSDK.hasUserSignedIn();
        console.log("isSignedIn", isSignedIn);
    },
});
```

**`async/await` を使う場合：**

```javascript
(async () => {
    try {
        await rewardSDK.init({
            appKey: "YOUR_APP_KEY",
            language: "ja",
        });
    } catch (err) {
        // 初期化または認証エラーを処理
    }

    const isSignedIn = await rewardSDK.hasUserSignedIn();
    console.log("isSignedIn", isSignedIn);
})();
```

::: warning
`init` の完了を待たずに他のSDK APIを呼び出さないでください。SDKは初期化が完了してから他のAPIを使用できます。
:::
