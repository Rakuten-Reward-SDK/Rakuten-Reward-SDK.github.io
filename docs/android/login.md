# Login

To use Rakuten Reward SDK features, the end user must be logged in to their Rakuten account. The SDK provides built-in login and logout APIs via `RakutenAuth` — no external login SDK is required.

## Login

Opening the Rakuten login page is a three-step process.

### Step 1 — Open the login page

```kotlin
RakutenAuth.openLoginPage(context, REQUEST_THIRD_PARTY_LOGIN)
```

![Rakuten login page](/assets/android/login.jpg)

### Step 2 — Receive the result

Handle the result in `onActivityResult()`:

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    if (requestCode == REQUEST_THIRD_PARTY_LOGIN) {
        if (resultCode == RESULT_OK) {
            handleActivityResult(data)
        } else {
            // login cancelled by user
        }
    }
}
```

### Step 3 — Complete the login flow

Pass the result intent to `RakutenAuth.handleActivityResult()`:

```kotlin
private fun handleActivityResult(data: Intent?) {
    RakutenAuth.handleActivityResult(data, object : LoginResultCallback {
        override fun loginSuccess() {
            // login completed
        }

        override fun loginFailed(e: RakutenRewardAPIError) {
            // login failed
        }
    })
}
```

### Using Fragments

You can call `RakutenAuth.openLoginPage()` from a Fragment by providing the Fragment reference. The `onActivityResult()` callback will be triggered in the Fragment class.

### Using the AndroidX Activity Result API

`startActivityForResult` and `onActivityResult` are deprecated since Android 11 (API 30). You can use the AndroidX Activity Result API instead. Add the following dependency first:

```groovy
androidx.activity:activity-ktx:1.2.0 // 1.2.0 or later
```

Then call `openLoginPage` with a result callback — no `onActivityResult` override needed:

```kotlin
RakutenAuth.openLoginPage(context) { result ->
    if (result.resultCode == RESULT_OK) {
        RakutenAuth.handleActivityResult(result.data, object : LoginResultCallback {
            override fun loginSuccess() {
                // login completed
            }

            override fun loginFailed(e: RakutenRewardAPIError) {
                // login failed
            }
        })
    }
}
```

::: info
This API can be called from both Activity and Fragment, but requires an Activity context.
:::

## Logout

Call `RakutenAuth.logout()` whenever the user logs out of your app. This is required regardless of how login was handled, to properly clear the user's token and cached data.

```kotlin
RakutenAuth.logout(object : LogoutResultCallback {
    override fun logoutSuccess() {
        // logout completed
    }

    override fun logoutFailed(e: RakutenRewardAPIError) {
        // logout failed
    }
})
```

::: warning
Always call `logout()` when the user signs out. Skipping this will leave stale token and user data in the SDK.
:::

## Other RakutenAuth APIs

### Check if user is signed in

```kotlin
RakutenAuth.hasUserSignedIn()
```

### Get user's name

```kotlin
RakutenAuth.getUserName(): String
```

### Get user's points and rank

```kotlin
RakutenAuth.getUserInfo(
    success = { userInfo ->
        userInfo.points  // total Rakuten Points
        userInfo.rank    // account rank
    },
    failed = {
        // failed to retrieve user info
    }
)
```

**`RakutenAuthUserInfo` properties**

| Property | Description |
|---|---|
| `points` | Total Rakuten Points for the user |
| `rank` | User's Rakuten account rank |

**Rakuten account ranks**

| Rank | Label |
|---|---|
| 1 | Regular |
| 2 | Silver |
| 3 | Gold |
| 4 | Platinum |
| 5 | Diamond |