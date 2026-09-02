# 基本セットアップ

## 要件

SDKを統合する前に、プロジェクトが以下の最低要件を満たしていることを確認してください。

| 要件 | 最小バージョン |
|---|---|
| Android Studio | Arctic Fox 以上 |
| Minimum SDK | API 24 — Android 7.0 |
| Compile SDK | API 36 |
| AndroidX | 必須 |

## Gradleのセットアップ

### ステップ1 — Mavenリポジトリの追加

**プロジェクトレベル**の `build.gradle` に、`allprojects` のリポジトリブロックへ楽天のMaven URLを追加してください。

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

### ステップ2 — 依存関係の追加

**アプリレベル**の `build.gradle` に、Bill of Materials（BoM）をインポートしてすべてのSDKライブラリバージョンを一元管理し、個別バージョンを指定せずにモジュールを宣言します。

```groovy
dependencies {
    // BoMのインポート — すべてのReward SDKライブラリバージョンを管理
    implementation platform('com.rakuten.android:rewardsdknative-bom:x.x.x')

    // Core SDK（必須）
    implementation 'com.rakuten.android:rewardsdknative-core'

    // Built-in UI — ミッションポータル、通知（オプション）
    implementation 'com.rakuten.android:rewardsdknative-ui'
}
```

> 最新のSDKバージョンは[こちら](https://github.com/rakuten-ads/Rakuten-Reward-Native-Android)をご参照ください。

::: info ViewBinding と DataBinding
`rewardsdknative-ui` モジュールには ViewBinding と DataBinding が必要です。アプリでまだ有効にしていない場合は、アプリレベルの `build.gradle` に以下を追加してください。

```groovy
buildFeatures {
    viewBinding true
    dataBinding true
}
```
:::

# 認証

## ログインオプション
リワードSDK では3種類のログイン方法を提供しております。  
ご利用の環境に合わせて、適切なものをご利用ください。  
初期設定では、RAKUTEN_AUTH　になっております。

| ログインオプション    | 説明                                                 |
|--------------|----------------------------------------------------|
| RAKUTEN_AUTH | 初期設定、ログインやユーザーの処理を全てリワードSDKが担当します                  |
| RID          | ログイン部分はID SDKが担当します(RID)。トークンをリワードSDKに渡す必要があります    |  

## ログインオプションを切り替える

初期設定では、リワードSDKが用意したログインになります。(RAKUTEN_AUTH)  

### RAKUTEN_AUTH
```kotlin
RakutenReward.tokenType = RakutenRewardTokentype.RAKUTEN_AUTH
```

### RID
```kotlin
RakutenReward.tokenType = RakutenRewardTokentype.RID
```

SDK APIを利用するには、開発者がAPI（API-C）トークンを設定する必要があります。
```kotlin
val tokenProvider = object: RewardTokenProvider {
    override suspend fun getAccessToken(): String {
        // 認証システムからトークンを返却
        return if (isUserLoggedIn()) {
            yourAuthManager.getAccessToken()
        } else {
            ""  // ユーザーがログインしていない場合は空文字列を返却
        }
    }
}
RakutenReward.init("<AppCode>", tokenProvider)
```

ログインの実装方法についてはID SDKのログインドキュメントをご参照ください。

> :grey_exclamation:  **ユーザーがログアウトする際は、必ず`logout` APIを呼び出してトークンやデータを正しくクリアしてください。**

# ログアウト
ユーザーをログアウトする。  
> ユーザーがログアウト時にトークンやデータをちゃんと消すためにログアウトAPIを呼ぶ必要があります。  

```kotlin
private fun logout() {
    RakutenAuth.logout(object : LogoutResultCallback {
        override fun logoutSuccess() {
            //ログアウト 完了
        }

        override fun logoutFailed(e: RakutenRewardAPIError) {
            //ログアウト失敗
        }
    })
}
```

# SDKの初期化
楽天リワードSDKを利用するにははじめに初期化が必要です(SDKユーザーの基本データを取得します)
SDKの機能を利用するのにはRakutenRewardクラスのメソッドを利用します

```kotlin
class App: Application() {

    override fun onCreate() {
        super.onCreate()
        // App CodeでSDKを初期化
        RakutenReward.init("<AppCode>")
    }
}
```

| パラメータ名  | 説明 |
|---------|-----------------------------------------|
| AppCode | アプリケーションキー (こちらは楽天リワードの開発者ポータルから取得できます) |

RAEやRIDオプションを利用する場合は、SDKを有効化するためにトークンを設定する必要があります。

### **\*バージョン 3.3.0 以降、手動初期化は不要です。**
アプリケーションのAndroidManifest.xmlに`App Code`を設定してください。
```xml
<application>
    <!-- Reward SDK Application Key -->
    <meta-data
        android:name="com.rakuten.gap.ads.mission_core.appKey"
        android:value="{Application Key}"/>
</application>
```

## 楽天のIDSDKを利用する場合  
楽天のIDSDKを使用し、ログインオプションに 、RID を選択した場合
アプリケーションキーの他にトークンを渡す必要があります。

## Activity と紐づけてSDK機能をアクティブにする:

### 1 RakutenRewardLightBaseActivity を拡張した Activity クラスを作る
```kotlin
class YourActivity : RakutenRewardBaseActivity {}
```

### 2 Android のライフサイクル上でメソッドをコールする
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
        super.onResume()
        RakutenRewardLifecycle.onResume(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        RakutenRewardLifecycle.onDestroy()
    }
}
```

### 3 AndroidX ライフサイクルイベントをバインドする
```kotlin
class YourActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RakutenRewardManager.bindRakutenRewardIn(this, this)
    }
}
```

この方法で行うためには Activity に LifecycleOwner を実装する必要があります

# ユーザー情報を取得する  
[ユーザー情報取得ガイド](./UserInfo.md)を参照してください。  
> こちらのAPIは `RAKUTEN_AUTH` のみ使える    

# ミッションの達成
ミッションを達成するには、[ミッション達成ガイド](./MissionAchivement.md)を参照してください。   

# SDK用意するUI  
[SDK UIガイド](./SdkPortal.md)を参照してください。

# SDKデバッグログ

バージョン3.1.1以降、SDKデバッグログを有効化できます。ApplicationクラスでこのAPIを使ってください。
```kotlin
override fun onCreate() {
    if (BuildConfig.DEBUG) {
        RakutenRewardConfig.isDebuggable()
    }
}
```

**DEBUGモードだけにこのAPIを使ってください。**

このAPIを使って、SDKロゴを見られます。タグは `RakutenRewardSDK`。

# コルーチン サポート

[![support version](http://img.shields.io/badge/core-3.3.3+-green.svg?style=flat)](https://github.com/rakuten-ads/Rakuten-Reward-Native-Android/releases/tag/rel_20220826_v3_3_0)  
SDK は suspend 関数の API を提供しています。
suspend 関数の API は `RakutenRewardCoroutine`クラスにあります。[APIリファレンス](../APIReference/README.md#rakutenrewardcoroutine)を参照してください。

suspend 関数の API を使う場合、コルーチンのスコープで呼んでください。例えば、 `viewModelScope` もしくわ `lifecycleScope`。
```kotlin
lifecycleScope.launch { 
    val result = RakutenRewardCoroutine.getMissions()
    when (result) {
        is Failed -> {
            // 失敗ケース
            result.error // エラーコード
        }
        is Success -> {
            // 成功ケース
            val missionList = result.data
        }
    }
}
```

# アプリのロケールを設定する
[![support version](http://img.shields.io/badge/core-7.5.0+-green.svg?style=flat)](https://github.com/rakuten-ads/Rakuten-Reward-Native-Android/releases/tag/rel_20250904_v7_5_0)  

Rakuten Reward SDKは5つの言語に対応しています：日本語、英語、韓国語、簡体字中国語、繁体字中国語

SDKポータルは、デバイスのロケールに従って言語を表示します。   
ただし、クライアントアプリが日本語のみ対応している場合、エンドユーザーのデバイスロケールが英語だと、クライアントアプリの画面は日本語で表示されるのに、SDKポータル画面は英語で表示されるため、ユーザー体験が一貫しない可能性があります。  

より良いユーザー体験のために、アプリのロケールを指定できるAPIを提供しています。これにより、SDKの画面も指定したロケールの言語で表示されます。 
[対応ロケール一覧](../apiData/README.md#supportedlocale)

```kotlin
RakutenRewardConfig.setAppLocale(Japanese)
```  

もしクライアントアプリがSDKで対応していない他の言語に対応している場合は、ISO 639言語コードを指定して`OtherLocale`としてアプリのロケールを設定できます。 
```kotlin
RakutenRewardConfig.setAppLocale(OtherLocale("th")) // タイ語
```  
SDKがそのロケールに対応していない場合は、日本語で表示されます。