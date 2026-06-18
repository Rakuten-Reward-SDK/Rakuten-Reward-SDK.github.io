# インテグレーション

## SDKの初期化

アプリ起動時に一度だけ初期化してください — `AppDelegate` またはSwiftUIの `App` 構造体内で、Rakuten Reward Developer Portalで取得したApp Codeを使用します。

```swift
RakutenReward.shared.initSdkThirdParty(appCode: "YOUR_APP_CODE")
```

| パラメータ | 説明 |
|---|---|
| `appCode` | Rakuten Reward Developer PortalのアプリケーションKey |

## ログイン

Rakuten Reward SDKの機能を利用するには、エンドユーザーが楽天アカウントにログインしている必要があります。SDKは `RakutenAuth` 経由でログインUIを提供します。

### ログインページを開く

ログイン状態を確認し、必要に応じてログインページを表示します：

```swift
if !RakutenReward.shared.isLogin() {
    RakutenReward.shared.openLoginPage { result in
        switch result {
        case .logInCompleted:
            // ログイン完了；SDKセッションは自動的に管理されます
        case .dismissByUser:
            // ユーザーがログインページを閉じました；後で再試行してください
        case .failToShowLoginPage:
            // ログインUIを表示できませんでした
        }
    }
}
```

### ログイン状態の確認

```swift
RakutenReward.shared.isLogin() // ユーザーがログイン済みの場合 true を返します
```

## ログアウト

ユーザーがアプリからサインアウトする際は必ず `logout` を呼び出してください。これによりトークンとキャッシュデータが適切にクリアされます。

```swift
RakutenReward.shared.logout { }
```

::: warning
ユーザーのサインアウト時は必ず `logout()` を呼び出してください。これを省略すると、古いトークンとユーザーデータがSDKに残ります。
:::

## ユーザー情報の取得

SDKのステータスが `.online` になると、`RakutenReward.shared.user` で現在のユーザーにアクセスできます。

```swift
let user = RakutenReward.shared.user

// ユーザーの表示名
user?.getName()

// Reward SDKポイントと楽天会員ランク
user?.currentPointRank()
```

### SDKUser プロパティ

| プロパティ / メソッド | 説明 |
|---|---|
| `signIn` | ユーザーがサインイン済みの場合 `true` |
| `point` | Reward SDKポイント残高 |
| `unclaimedMissionCount` | 未申請の達成数 |
| `getName()` | ユーザーの表示名 |
| `currentPointRank()` | 会員ポイントとランクを含む `MemberPointRank` を返します |

### MemberPointRank

| プロパティ | 型 | 説明 |
|---|---|---|
| `memberPoints` | `Int` | ユーザーの楽天会員ポイント合計 |
| `memberRank` | `String` | ユーザーの楽天会員ランク |

ポイントやランクが変わったときにUIを更新するにはユーザー更新を購読します：

```swift
RakutenReward.shared.didUpdateUser = { user in
    // 更新されたポイントとランクでUIを更新
}
```

`NotificationCenter` で更新を監視することもできます：

```swift
NotificationCenter.default.addObserver(
    forName: RakutenReward.userUpdatedNotification,
    object: nil,
    queue: .main
) { _ in
    // ユーザーデータが更新されました
}
```

## ポイント履歴

過去3ヶ月のリワードポイント履歴を取得します：

```swift
RakutenReward.shared.getPointHistory { result in
    switch result {
    case .success(let history):
        let records = history.getPointHistory() // [PointRecord]
        for record in records {
            print("\(record.month): \(record.point) pts")
        }
    case .failure(let error):
        break
    }
}
```

## SDKステータス

SDKは `RakutenReward.shared.status` と `didUpdateStatus` コールバックで状態を通知します。

| ステータス | 意味 |
|---|---|
| `.online` | SDKの準備完了；ユーザー情報は最新 |
| `.offline` | 初期化が完了していないか失敗しました |
| `.appcodeInvalid` | 渡したApp Codeが間違っています |
| `.tokenExpired` | トークンの有効期限切れ — 再ログインを促してください |
| `.userNotConsent` | ユーザーがRewardの利用規約に同意していません |
