# ユーザー同意

Mission JS SDKはReward SDKの利用規約とプライバシーポリシーに対するオプションのユーザー同意機能を提供します。有効にした場合、ユーザーはSDKポータルを開く、アクションをログする、またはポイントを申請する前に同意を行う必要があります。

## 同意状態の確認

```javascript
const isConsent = rewardSDK.getIsUserConsent(); // true または false
```

## 同意ポップアップの表示

全画面の同意ダイアログを表示します：

![同意ポップアップ](/assets/javascript/consent-popup.png)

```javascript
rewardSDK.displayConsentPopup({
    successCallback: () => {
        // ユーザーが同意しました
    },
    closeCallback: () => {
        // ユーザーが拒否または閉じました
    },
});
```

## 同意バナーの表示

タップすると同意ポップアップが開く、より控えめなバナーを表示します：

![同意バナー](/assets/javascript/consent-banner-ja.png)

```javascript
rewardSDK.displayConsentBanner((isAccepted) => {
    console.log("isAccepted", isAccepted);
});
```

## プログラムで同意を受け付ける

```javascript
await rewardSDK.acceptConsent();
```

## アクションログ前に同意を強制する

ミッションアクションをログする前にユーザーの同意を必須にするには、`forceDisplayConsentPopup` を渡します：

```javascript
await rewardSDK.logAction({
    actionCode: "YOUR_ACTION_CODE",
    forceDisplayConsentPopup: true,
});
```
