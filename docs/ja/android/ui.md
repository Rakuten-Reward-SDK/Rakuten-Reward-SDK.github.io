# Built-in UI

楽天リワードSDKはすぐに使えるUIコンポーネントを提供しているため、リワードインターフェースをゼロから構築する必要はありません。使用するには `rewardsdknative-ui` モジュールをインポートしてください。

## SDKポータル

SDKポータルでは、アクティブなミッション、未獲得のリワード、現在のポイント、ポイント履歴など、リワードサービスの情報をユーザーに表示します。

### ポータルを開く

```kotlin
RakutenReward.openSDKPortal(
    isPortalOpenedCallback = { result ->
        when (result) {
            is Failed -> {
                // 起動失敗 — result.error でエラー内容を確認
            }
            is Success -> {
                // ポータルの起動に成功
            }
        }
    },
    activityResultCallback = {
        // ユーザーがポータルを閉じた
    }
)
```

`isPortalOpenedCallback` は起動結果を返し、`activityResultCallback` はユーザーがポータルを閉じた際に呼び出されます。

### エラーコード一覧

| エラーコード | 原因 |
|---|---|
| `SDKNOTACTIVE` | SDKがオプトアウトされている |
| `USER_NOT_CONSENT` | ユーザーがまだ同意していないか、同意ダイアログを拒否した |
| `INVALIDREQUEST` | Activityの参照がありません。[ActivityでSDKを開始する](./integration#activityでsdkを開始する)を参照してください |

### ポータル画面

![ポータル画面1](/assets/android/ja/portal1.png) ![ポータル画面2](/assets/android/ja/portal2.png)

![ポータル画面3](/assets/android/ja/portal3.png) ![ポータル画面4](/assets/android/ja/portal4.png)

![ポータル画面5](/assets/android/ja/portal5.png)

## リワードボタン

SDKは公式の `RewardButton` も提供しています。このボタンはSDKポータルを開くためのボタンで、SDKセッション状態を自動的に反映し（オフラインや無効時はグレーアウト）、未獲得リワードのバッジを表示します。

### レイアウトに追加する

```xml
<com.rakuten.gap.ads.mission_ui.ui.reward.RewardButton
    android:layout_width="60dp"
    android:layout_height="60dp"
    app:badge_position="top_right"
    app:button_style="dark"
    app:show_badge="true" />
```

### XML属性

| 属性 | 関連メソッド |
|---|---|
| `badge_position` | `setBadgePosition(BadgePosition)` |
| `button_style` | `setButtonStyle(RewardButtonStyle)` |
| `show_badge` | `setBadgeVisible(Boolean)` |

### 公開メソッド

| メソッド | 説明 |
|---|---|
| `setBadgePosition(position: BadgePosition)` | バッジの位置を設定する |
| `setBadgeVisible(visible: Boolean)` | 未獲得数バッジの表示・非表示を切り替える |
| `setButtonStyle(buttonStyle: RewardButtonStyle)` | ボタンのスタイルを設定する |
| `setCustomImage(@DrawableRes resourceId: Int)` | カスタムボタン画像を設定する |

### ボタンスタイル

| | Dark | Light |
|---|---|---|
| プレビュー | ![dark](/assets/android/ja/button/dark.png) | ![light](/assets/android/ja/button/light.png) |

### バッジ位置

| TOP_LEFT | TOP_RIGHT | CENTER | BOTTOM_LEFT | BOTTOM_RIGHT |
|:---:|:---:|:---:|:---:|:---:|
| ![top_left](/assets/android/ja/button/top_left.png) | ![top_right](/assets/android/ja/button/top_right.png) | ![center](/assets/android/ja/button/center.png) | ![bottom_left](/assets/android/ja/button/bottom_left.png) | ![bottom_right](/assets/android/ja/button/bottom_right.png) |