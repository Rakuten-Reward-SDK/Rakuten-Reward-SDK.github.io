# JavaScript拡張機能

JavaScript拡張機能ライブラリは、ネイティブのiOSまたはAndroidの `WebView` 内に読み込まれたWebページとネイティブのReward SDK APIを橋渡しします。これにより、WebベースのインターフェースからJavaScriptを通じてネイティブSDKの機能（アクションのログ記録やSDKポータルの起動など）を直接呼び出すことができます。

## インストール

以下の `<script>` タグをページの `<head>` タグ内に追加します：

```html
<header>
  <!-- ... ヘッダータグの終了前に配置 -->
  <script
    type="text/javascript"
    src="https://portal.reward.rakuten.co.jp/sdk-static/jsext/1.3.0/missionsdk-ext.js"
  ></script>
</header>
```

読み込み後、ライブラリは `window` オブジェクト経由でアクセスできます：

```javascript
const rewardSDKExt = window.RakutenRewardExt || {};
```

## プラットフォーム設定

APIを呼び出す前に、WebViewをホストするネイティブアプリに合わせてプラットフォームを設定します：

```javascript
// Android WebView
rewardSDKExt.setPlatform('android');

// iOS WKWebView
rewardSDKExt.setPlatform('ios');
```

## APIメソッド

### プラットフォーム設定

```javascript
rewardSDKExt.setPlatform('android' | 'ios')
```

| パラメータ | 型                       | 必須 | 説明                                    |
| --------- | ------------------------ | ---- | -------------------------------------- |
| platform  | `"android"` \| `"ios"`   | はい | ネイティブAPIを呼び出す前にプラットフォームを設定 |

---

### アクションログ

ミッションアクションを記録します。コールバックを省略すると、元のfire-and-forget動作が保持されます。

```javascript
// Fire-and-forget (元の動作)
rewardSDKExt.logAction('daily_login');

// 結果コールバック付き
rewardSDKExt.logAction('daily_login', (result) => {
  if (result.success) {
    console.log('アクションが記録されました');
  } else {
    console.error('失敗:', result.error);
  }
});
```

| パラメータ  | 型                                                          | 必須 | 説明                    |
| ---------- | ----------------------------------------------------------- | ---- | ---------------------- |
| actionCode | `string`                                                    | はい | 記録するミッションアクションコード |
| callback   | `(result:` [`ActionResult`](#actionresult)`) => void`       | いいえ | アクションの結果を受け取るコールバック |

---

### SDKポータルを開く

Reward SDKポータルUIを開きます。コールバックを省略すると、元のfire-and-forget動作が保持されます。

```javascript
// Fire-and-forget (元の動作)
rewardSDKExt.openSdkPortal();

// 結果コールバック付き
rewardSDKExt.openSdkPortal((result) => {
  if (result.success) {
    console.log('ポータルが開きました');
  } else {
    console.error('失敗:', result.error);
  }
});
```

| パラメータ | 型                                                          | 必須 | 説明                       |
| --------- | ----------------------------------------------------------- | ---- | ------------------------- |
| callback  | `(result:` [`ActionResult`](#actionresult)`) => void`       | いいえ | アクションの結果を受け取るコールバック |

---

### SPSポータルを開く

Super Point Screen (SPS) ポータルを開きます。コールバックを省略すると、元のfire-and-forget動作が保持されます。

```javascript
// Fire-and-forget (元の動作)
rewardSDKExt.openSpsPortal();

// 結果コールバック付き
rewardSDKExt.openSpsPortal((result) => {
  if (result.success) {
    console.log('SPSポータルが開きました');
  } else {
    console.error('失敗:', result.error);
  }
});
```

| パラメータ | 型                                                          | 必須 | 説明                       |
| --------- | ----------------------------------------------------------- | ---- | ------------------------- |
| callback  | `(result:` [`ActionResult`](#actionresult)`) => void`       | いいえ | アクションの結果を受け取るコールバック |

---

### ミッション一覧（簡易版）を取得

簡易版のミッション一覧を取得します。失敗時は空配列が返されます。

```javascript
rewardSDKExt.getMissionLite((missions) => {
  missions.forEach((m) => {
    console.log(m.name, m.actionCode, m.point + 'pt');
  });
});
```

| パラメータ | 型                                                                                          | 必須 | 説明                   |
| --------- | ------------------------------------------------------------------------------------------- | ---- | --------------------- |
| callback  | `(result:` [`SDKResult`](#sdkresult)`<`[`MissionLite`](#missionlite)`[]>) => void`          | いいえ | 簡易ミッション一覧を受け取るコールバック |

---

### ミッション詳細を取得

アクションコードを指定してミッションの詳細を取得します。失敗時または空のactionCodeの場合はnullが返されます。

```javascript
rewardSDKExt.getMissionDetails('daily_login', (mission) => {
  if (!mission) {
    console.error('ミッションが見つかりません');
    return;
  }
  console.log(mission.name, mission.progress + '/' + mission.times, mission.point + 'pt');
});
```

| パラメータ  | 型                                                                                           | 必須 | 説明                       |
| ---------- | -------------------------------------------------------------------------------------------- | ---- | ------------------------- |
| actionCode | `string`                                                                                     | はい | 取得するミッションのアクションコード |
| callback   | `(result:` [`SDKResult`](#sdkresult)`<`[`MissionDetails`](#missiondetails)`>) => void`       | いいえ | ミッション詳細を受け取るコールバック |

---

### 未請求リストを取得

完了したがポイントがまだ請求されていないミッションのリストを取得します。失敗時は空配列が返されます。

```javascript
rewardSDKExt.getUnclaimList((items) => {
  items.forEach((item) => {
    console.log(item.name, item.point + 'pt 未請求');
  });
});
```

| パラメータ | 型                                                                                          | 必須 | 説明                    |
| --------- | ------------------------------------------------------------------------------------------- | ---- | ---------------------- |
| callback  | `(result:` [`SDKResult`](#sdkresult)`<`[`UnclaimItem`](#unclaimitem)`[]>) => void`          | いいえ | 未請求アイテムリストを受け取るコールバック |

---

### ミッションポイントを請求

完了したミッションのポイントを請求します。成功時はネイティブの請求UI（バナーまたはモーダル）が表示されます。コールバックを省略すると、元のfire-and-forget動作が保持されます。

```javascript
// Fire-and-forget (元の動作)
rewardSDKExt.claimMissionPoint('daily_login', '20260617');

// 結果コールバック付き
rewardSDKExt.claimMissionPoint('daily_login', '20260617', (result) => {
  if (result.success) {
    console.log('ポイントが請求されました');
  } else {
    console.error('失敗:', result.error);
  }
});
```

| パラメータ    | 型                                                          | 必須 | 説明                                                          |
| ------------ | ----------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| actionCode   | `string`                                                    | はい | 未請求アイテムのアクションコード                               |
| achievedDate | `string`                                                    | はい | 達成日（`achieveddatestr`から取得、`yyyyMMdd`形式）           |
| callback     | `(result:` [`ActionResult`](#actionresult)`) => void`       | いいえ | 請求アクションの結果を受け取るコールバック                     |

---

### ユーザーポイント履歴を取得

```javascript
rewardSDKExt.getPointHistory((result) => {
  if (result.success) {
    console.log('ポイント履歴:', result.data); // [{ points: 1, month: '202504' }, ...]
  }
});
```

| パラメータ | 型                                                                                           | 必須 | 説明               |
| --------- | -------------------------------------------------------------------------------------------- | ---- | ----------------- |
| callback  | `(result:` [`SDKResult`](#sdkresult)`<`[`PointHistoryItem`](#pointhistoryitem)`[]>) => void` | いいえ | ポイント履歴を受け取るコールバック |

---

### ユーザーリワードポイントを取得

```javascript
rewardSDKExt.getUserRewardPoint((result) => {
  if (result.success) {
    console.log('リワードポイント:', result.data); // 10
  }
});
```

| パラメータ | 型                                                                    | 必須 | 説明                          |
| --------- | --------------------------------------------------------------------- | ---- | ---------------------------- |
| callback  | `(result:` [`SDKResult`](#sdkresult)`<number>) => void`               | いいえ | リワードポイントを受け取るコールバック |

---

## エラーハンドリング

すべてのSDKメソッドは `Promise` を返します。エラー（プラットフォーム未設定、無効なアプリキー、ネイティブSDKが存在しないなど）は非同期にスローされるため、通常の `try/catch` ブロックではキャッチできません。`await` で呼び出すか、`.catch()` を使用する必要があります。

### async/awaitを使用

```javascript
async function openPortal() {
  try {
    await rewardSDKExt.openSpsPortal((result) => {
      if (result.success) {
        console.log('SPSポータルが正常に開きました');
      } else {
        console.warn('SDKが失敗を返しました:', result.error);
      }
    });
  } catch (error) {
    // プラットフォームが設定されていない、アプリキーが無効などのエラー
    console.error('SDKエラー:', error);
  }
}
```

### Promise .catch()を使用

```javascript
rewardSDKExt.openSpsPortal((result) => {
  if (result.success) {
    console.log('SPSポータルが正常に開きました');
  } else {
    console.warn('SDKが失敗を返しました:', result.error);
  }
}).catch((error) => {
  console.error('SDKエラー:', error);
});
```

> **注:** コールバック内の `result.success === false` は、ネイティブSDKが呼び出しを完了したが失敗（例：`sdk_not_active`、`user_not_consent`）を報告したことを意味します。`catch` でキャッチされたスローされたエラーは、呼び出しがネイティブSDKに到達しなかったことを意味します（例：プラットフォーム未設定、無効なアプリキー）。

---

## 型定義

### SDKResult

すべてのコールバックベースのAPIから返される統一された結果の形。

| キー           | 型        | 説明                                               |
| ------------- | --------- | ------------------------------------------------- |
| success       | `boolean` | 操作が成功したかどうか                             |
| data          | `T`       | 成功時のデータペイロード（データAPIの場合）         |
| error         | `string`  | 失敗時にのみ存在 — [`ActionResult`](#actionresult) のエラーコードを参照 |
| consentStatus | `string`  | `error` が `user_not_consent` の場合に存在         |

---

### ActionResult

`SDKResult` の型エイリアス（データペイロードなし）。[`logAction`](#アクションログ)、[`openSdkPortal`](#sdkポータルを開く)、[`openSpsPortal`](#spsポータルを開く)、[`claimMissionPoint`](#ミッションポイントを請求) でコールバックが提供された場合に返されます。

**エラーコード**（すべてのAPIで `SDKResult.error` 経由で適用）

| エラーコード           | 説明                                   |
| -------------------- | ------------------------------------- |
| `invalid_appkey`     | 提供されたアプリキーが一致しません       |
| `sdk_not_active`     | SDKセッションが開始されていません（ユーザーがログインしていない） |
| `user_not_consent`   | ユーザーがReward利用規約に同意していません |
| `network_error`      | ネットワーク接続エラー                 |
| `invalid_request`    | 無効なパラメータまたはアクションコード   |
| `mission_reach_cap`  | ミッションが1日の達成上限に達しました    |
| `unknown`            | 予期せぬエラー                        |

---

### MissionLite

[`getMissionLite`](#ミッション一覧簡易版を取得) から返されます。

| キー              | 型               | 説明                                        |
| ---------------- | ---------------- | ------------------------------------------ |
| name             | `string \| null` | ミッション名                                |
| actionCode       | `string \| null` | アクションコード — [`logAction`](#アクションログ) に渡す |
| iconurl          | `string \| null` | ミッションアイコンURL                       |
| instruction      | `string \| null` | ミッション説明文                            |
| condition        | `string \| null` | ミッション達成条件                          |
| notificationtype | `string \| null` | `NONE`、`BANNER`、`MODAL`、`CUSTOM` のいずれか |
| point            | `number`         | 達成時に付与されるポイント                   |
| enddatestr       | `string \| null` | ミッション終了日（`yyyyMMdd` 形式）         |
| till             | `string \| null` | 残り日数（例：`"残り3日"`）                |
| additional       | `string \| null` | 追加メッセージ                              |
| times            | `number`         | ミッション達成に必要なアクション回数         |

---

### MissionDetails

[`getMissionDetails`](#ミッション詳細を取得) から返されます。[`MissionLite`](#missionlite) を拡張し、以下の追加フィールドを持ちます：

| キー        | 型        | 説明                                        |
| ---------- | --------- | ------------------------------------------ |
| reachedCap | `boolean` | 1日の達成上限に達したかどうか               |
| progress   | `number`  | 達成に向けた現在の進捗状況                  |

---

### UnclaimItem

[`getUnclaimList`](#未請求リストを取得) から返されます。

| キー              | 型                | 説明                                                                                  |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------ |
| name             | `string \| null`  | ミッション名                                                                         |
| iconurl          | `string \| null`  | ミッションアイコンURL                                                                |
| instruction      | `string \| null`  | ミッション説明文                                                                     |
| actionCode       | `string \| null`  | アクションコード — [`claimMissionPoint`](#ミッションポイントを請求) に渡す            |
| custom           | `boolean`         | 請求通知がカスタム通知かどうか                                                       |
| notificationtype | `string \| null`  | `NONE`、`BANNER`、`MODAL`、`CUSTOM` のいずれか                                        |
| point            | `number \| null`  | 請求可能なポイント                                                                   |
| unclaimed        | `number \| null`  | 未請求アイテム数                                                                     |
| achieveddatestr  | `string \| null`  | 達成日（`yyyyMMdd` 形式） — [`claimMissionPoint`](#ミッションポイントを請求) に渡す  |

---

### PointHistoryItem

[`getPointHistory`](#ユーザーポイント履歴を取得) の `data` 配列の各要素。

| キー    | 型       | 説明                         | 例         |
| ------ | -------- | --------------------------- | ---------- |
| points | `number` | その月に獲得したポイント      | `1`        |
| month  | `string` | ポイントを獲得した月（`YYYYMM` 形式） | `'202504'` |


::: info ネイティブ側のセットアップが必要です
ネイティブアプリ側でもWebViewのセットアップを完了する必要があります。[Android JavaScript拡張機能ガイド](/android/js-extension)または[iOS JavaScript拡張機能ガイド](/ios/js-extension)をご参照ください。
:::