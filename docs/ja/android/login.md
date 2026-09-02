# ログイン

## ログインページを表示する

```kotlin
RakutenAuth.openLoginPage(context, REQUEST_THIRD_PARTY_LOGIN)
```

![ログイン画面](/assets/android/ja/login.jpg)

## ログイン結果を受け取る

### onActivityResult を使う

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    if (requestCode == REQUEST_THIRD_PARTY_LOGIN) {
        if (resultCode == RESULT_OK) {
            RakutenAuth.handleActivityResult(data, object : LoginResultCallback {
                override fun loginSuccess() {
                    // ログイン成功
                }
                override fun loginFailed(e: RakutenRewardAPIError) {
                    // ログイン失敗
                }
            })
        } else {
            // ユーザーがログインをキャンセルした
        }
    }
}
```

### AndroidX Activity Result API

`startActivityForResult` と `onActivityResult` は Android 11（API 30）以降で非推奨になりました。AndroidX Activity Result APIを使用する新しいAPIを提供しています。

以下のライブラリを追加してください。

```groovy
androidx.activity:activity-ktx:1.2.0 // 1.2.0以上
```

```kotlin
RakutenAuth.openLoginPage(context) { result ->
    if (result.resultCode == RESULT_OK) {
        RakutenAuth.handleActivityResult(result.data, object : LoginResultCallback {
            override fun loginSuccess() {
                // ログイン成功
            }
            override fun loginFailed(e: RakutenRewardAPIError) {
                // ログイン失敗
            }
        })
    }
}
```

## ログアウト

> ユーザーがログアウトする際は、必ず `logout` APIを呼び出してトークンやデータを正しくクリアしてください。

```kotlin
RakutenAuth.logout(object : LogoutResultCallback {
    override fun logoutSuccess() {
        // ログアウト完了
    }
    override fun logoutFailed(e: RakutenRewardAPIError) {
        // ログアウト失敗
    }
})
```

## ユーザー情報を取得する

ログイン後、楽天ポイントとランクを取得できます。

```kotlin
RakutenAuth.getUserInfo(
    success = { userInfo ->
        val points = userInfo.points
        val rank = userInfo.rank
    },
    failed = {
        // エラー処理
    }
)
```

| パラメータ | 説明 |
|---|---|
| `points` | 楽天ポイント合計 |
| `rank` | 楽天会員ランク |