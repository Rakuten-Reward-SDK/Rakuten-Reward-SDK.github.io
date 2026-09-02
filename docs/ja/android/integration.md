# インテグレーション

## 前提条件

* Android Studio Arctic Fox 以上
* Android API level 24 以上
* Android X をサポート
* 楽天 IDSDK もしくは SDKが用意するログインを使用する

## SDKの初期化

`Application` クラスで、楽天リワード開発者ポータルから取得したアプリコードを使ってSDKを初期化します。

### オプションA — AndroidManifest.xml（推奨）

アプリコードを `<meta-data>` エントリとして設定します。手動での初期化呼び出しは不要です。

```xml
<application>
    <meta-data
        android:name="com.rakuten.gap.ads.mission_core.appKey"
        android:value="{Your App Code}" />
</application>
```

### オプションB — Applicationクラス

または、`Application.onCreate()` 内で `RakutenReward.init()` を直接呼び出します。

```kotlin
class App : Application() {

    override fun onCreate() {
        super.onCreate()
        RakutenReward.init("<AppCode>")
    }
}
```

## リワードSDKをインポートする

Gradleの依存設定でアプリにインポートすることが出来ます。プロジェクト直下のbuild.gradleのrepositoriesに以下のように参照先を追加する必要があります。

**プロジェクト全体のbuild.gradle サンプル**

```groovy
allprojects {
    repositories {
        mavenCentral()
        maven {
            url "https://raw.githubusercontent.com/rakuten-ads/Rakuten-Reward-Native-Android/master/maven"
        }
    }
}
```

次に、アプリ直下のbuild.gradleのdependenciesに以下の指定を追加します。 

### Reward Android BoM（部品構成表）  
Reward Native Android 部品構成表（部品構成表）は、1 つのバージョン（BoM のバージョン）のみを指定することで、すべてのライブラリ バージョンを管理できます。  

アプリで Reward Native BoM を使用する場合、BoM は BoM のバージョンにマッピングされた個々のライブラリ バージョンを自動的に取得します。アプリで BoM のバージョンを更新すると、アプリで使用するすべてのライブラリが、その BoM のバージョンにマッピングされたバージョンに更新されます。  

Reward Native Android 部品構成表を使用して、モジュール（アプリレベル）の Gradle ファイル（通常は app/build.gradle）で依存関係を宣言する方法は次のとおりです。BoM を使用する場合、依存関係の行にライブラリのバージョンを個別に指定しないでください。  
```groovy
dependencies {
  // Import the BoM for the Reward Native platform
  implementation platform('com.rakuten.android:rewardsdknative-bom:8.3.0')

  // Declare the dependency for the core library
  implementation 'com.rakuten.android:rewardsdknative-core' 
  // Declare the dependency for the built-in UI
  implementation 'com.rakuten.android:rewardsdknative-ui'
}
```  

※ rewardsdknative-ui モジュールは viewbinding と databinding　を使用いたします。  
もしこちらのモジュールの場合で上記のご利用がない場合, 下記のような記述を build.gradle　に加えてください
```groovy
buildFeatures {
        viewBinding true
        dataBinding true
}
```

## ActivityでSDKを開始する

SDKはActivityのライフサイクルにバインドする必要があります。アーキテクチャに合った方法を選択してください。

### オプション1 — RakutenRewardBaseActivityを継承する

最もシンプルな方法です。`RakutenRewardBaseActivity` を継承すると、SDKが自動的にライフサイクルを管理します。

```kotlin
class YourActivity : RakutenRewardBaseActivity() {
    // 特別な設定は不要
}
```

### オプション2 — 手動でライフサイクルメソッドを呼び出す

`RakutenRewardBaseActivity` を継承できない場合は、手動でライフサイクルメソッドを呼び出します。

```kotlin
class YourActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RakutenRewardLifecycle.onCreate(this)
    }

    override fun onStart() {
        super.onStart()
        RakutenRewardLifecycle.onStart(this)
    }

    override fun onResume() {
        RakutenRewardLifecycle.onResume(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        RakutenRewardLifecycle.onDestroy()
    }
}
```

### オプション3 — AndroidXライフサイクルオブザーバー

`AppCompatActivity` をお使いの場合は、`onCreate` 内で `bindRakutenRewardIn` を呼び出すと、自動的にライフサイクルが監視されます。

```kotlin
class YourActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RakutenRewardManager.bindRakutenRewardIn(this, this)
    }
}
```

## RakutenRewardListener

`RakutenRewardListener` を使うと、ActivityやFragmentでSDKのステータス変更やミッションイベントを受け取ることができます。

### コールバック一覧

| コールバック | トリガータイミング |
|---|---|
| `onSDKStatusChanged(status: RakutenRewardSDKStatus)` | SDKのステータスが変更されたとき |
| `onUserUpdated(user: RakutenRewardUser)` | ユーザーデータが更新されたとき |
| `onUnclaimedAchievement(achievement: MissionAchievementData)` | ユーザーがミッションを達成したとき |
| `onSDKClaimClosed(achievement: MissionAchievementData, status: RakutenRewardClaimStatus)` | クレームUIが閉じられたとき |
| `onSDKClaimPresented(achievement: MissionAchievementData)` | クレームUIが表示されたとき |
| `onSDKConsentPresented()` | 同意ダイアログが表示されたとき |
| `onSDKConsentClosed()` | 同意ダイアログが閉じられたとき |

### 登録と解除

```kotlin
// 登録
RakutenReward.addRakutenRewardListener(this)

// 解除
RakutenReward.removeRakutenRewardListener(this)
```

> ActivityやFragmentでリスナーを登録した場合は、破棄時に必ず `removeRakutenRewardListener` を呼び出してメモリリークを防いでください。