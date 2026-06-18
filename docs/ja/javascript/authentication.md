# 認証

Rakuten Reward SDKの機能を利用するには、エンドユーザーが楽天アカウントにログインしている必要があります。SDKはログインAPIとログインUIコンポーネントを提供します。

## ログイン

SDKはユーザーを楽天ログインページへ誘導するためのいくつかの方法を提供します。

### ログインページへリダイレクト

最もシンプルな方法 — `openLoginUrl()` を呼び出すと、ユーザーを楽天ログインページへリダイレクトします。ログイン後、ユーザーは元のページへリダイレクトされます。

```javascript
rewardSDK.openLoginUrl();
```

### ログインURLを取得する

ログインURLを取得してリダイレクトを自分で処理します：

```javascript
const loginUrl = rewardSDK.getLoginUrl();
window.location.href = loginUrl;
```

### ログインボタンを表示する

SDKの組み込みログインボタンをコンテナ要素内にレンダリングします。クリックするとログインページへリダイレクトされます。

![ログインボタン](/assets/javascript/login-button.png)

```javascript
const elementId = "sdk-login-button-element-id";
rewardSDK.displayLoginButton(elementId);
```

::: info
ログインボタンはコンテナの幅いっぱいに広がります。コンテナ要素に適切な幅（例：`330px`）を指定してください。
:::

## ログイン状態の確認

```javascript
const isSignedIn = await rewardSDK.hasUserSignedIn(); // true または false
```

## ログアウト

ユーザーがWebサイトからサインアウトする際は必ず `logout` を呼び出してください。これによりユーザーのトークンとセッションデータがSDKからクリアされます。

```javascript
rewardSDK.logout();
```

::: warning
ユーザーのサインアウト時は必ず `logout()` を呼び出してください。これを省略すると、古いトークンとユーザーデータがSDKに残ります。
:::

## ユーザー情報

### ユーザー情報要素の表示

ログイン済みの場合はユーザーの名前とポイント残高を、未ログインの場合はログインボタンを表示するUIコンポーネントをレンダリングします。

![ユーザー情報コンポーネント](/assets/javascript/user-information.png)

```javascript
const elementId = "sdk-user-info-element-id";
rewardSDK.displayLoginElement(elementId);
```

::: info
このコンポーネントはコンテナの幅いっぱいに広がります。コンテナ要素に適切な幅（例：`330px`）を指定してください。
:::

表示される情報：
1. ユーザーの名前（ある場合）
2. ユーザーの現在の楽天ポイント残高
3. Mission SDKからの月間リワードポイント

### ユーザー名を取得する

```javascript
const name = rewardSDK.getUserName(); // 例: "山田 太郎"
```

### ユーザーのポイント情報を取得する

```javascript
const userInfo = await rewardSDK.getUserInfo();
const { unclaimedPoints, currentPoints } = userInfo;
```

## セッション

### セッションの開始またはトークンのリフレッシュ

ユーザーのセッションやアクセストークンを手動でリフレッシュします：

```javascript
const userInfo = await rewardSDK.startSession();
```
