# Authentication

To use Rakuten Reward SDK features, the end user must be logged in to their Rakuten account. The SDK provides built-in login APIs and a login UI component.

## Login

The SDK provides several ways to direct users to the Rakuten login page.

### Redirect to Login Page

The simplest approach — call `openLoginUrl()` to redirect the user to the Rakuten login page. After logging in, the user is redirected back to the current page.

```javascript
rewardSDK.openLoginUrl();
```

### Get Login URL

Get the login URL and handle the redirect yourself:

```javascript
const loginUrl = rewardSDK.getLoginUrl();
window.location.href = loginUrl;
```

### Display Login Button

Render the SDK's built-in login button inside a container element. The user is redirected to the login page on click.

![Login button](/assets/javascript/login-button.png)

```javascript
const elementId = "sdk-login-button-element-id";
rewardSDK.displayLoginButton(elementId);
```

::: info
The login button fills the container's width. Provide an appropriate width on the container element, for example `330px`.
:::

## Check Login Status

```javascript
const isSignedIn = await rewardSDK.hasUserSignedIn(); // true or false
```

## Logout

Call `logout` whenever the user signs out of your website. This clears the user's tokens and session data from the SDK.

```javascript
rewardSDK.logout();
```

::: warning
Always call `logout()` when the user signs out. Skipping this will leave stale token and user data in the SDK.
:::

## User Information

### Display User Info Element

Renders a UI component showing the user's name and point balance when logged in, or the login button when not logged in.

![User information component](/assets/javascript/user-information.png)

```javascript
const elementId = "sdk-user-info-element-id";
rewardSDK.displayLoginElement(elementId);
```

::: info
This component fills the container's width. Provide an appropriate width on the container element, for example `330px`.
:::

The component displays:
1. User's name (if available)
2. User's current Rakuten Point balance
3. User's monthly Reward points from Mission SDK

### Get User's Name

```javascript
const name = rewardSDK.getUserName(); // e.g. "John Doe"
```

### Get User's Point Information

```javascript
const userInfo = await rewardSDK.getUserInfo();
const { unclaimedPoints, currentPoints } = userInfo;
```

## Session

### Start Session or Refresh Token

Call `startSession` to manually refresh the user's session or access token:

```javascript
const userInfo = await rewardSDK.startSession();
```
