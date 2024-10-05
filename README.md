# AI Engine チャットログ管理プロジェクト

このプロジェクトは、AI EngineのチャットログをJSON形式でエクスポートし、Firebaseに保存し、さらにCSV形式で保存する一連の流れを実現します。

## 概要

1. **チャットログのエクスポート**: AI EngineからチャットログをJSON形式でエクスポートし、`discussions-2024-9-30.json`として保存します。
2. **Firebaseへの保存**: エクスポートしたJSONデータをFirebase Firestoreに保存します。
3. **CSV形式への変換**: JSONデータをCSV形式に変換して保存します。
4. **チャットログの要約**: チャットログを要約し、要約結果をCSV形式で保存します。
5. **スプレッドシート形式での表示**: Firestoreからデータを取得し、スプレッドシート形式で表示します。

## 使用するファイル

- `discussions-2024-9-30.json`: AI EngineからエクスポートしたチャットログのJSONファイル。
- `serviceAccountKey.json`: Firebase Admin SDKのサービスアカウントキー。
- `saveToFirestore.js`: JSON��ータをFirebase Firestoreに保存するためのスクリプト。
- `jsonToCSV.js`: JSONデータをCSV形式に変換して保存するためのスクリプト。
- `summaryToCSV.js`: チャットログを要約し、要約結果をCSV形式で保存するためのスクリプト。
- `exportToCSV.js`: Firestoreからデータを取得し、スプレッドシート形式で表示するためのスクリプト。

## 手順

### 1. チャットログのエクスポート

AI Engineの管理コンソールからチャットログをJSON形式でエクスポートし、`discussions-2024-9-30.json`として保存します。

### 2. Firebaseへの保存

以下のコマンドで`saveToFirestore.js`を実行し、JSONデータをFirebase Firestoreに保存します。

node saveToFirestore.js

### 3. JSONデータをCSV形式に変換

以下のコマンドで`jsonToCSV.js`を実行し、JSONデータをCSV形式に変換して保存します。

node jsonToCSV.js

### 4. チャットログの要約

以下のコマンドで`summaryToCSV.js`を実行し、チャットログを要約し、要約結果をCSV形式で保存します。

node summaryToCSV.js

### 5. スプレッドシート形式で表示

以下のコマンドで`exportToCSV.js`を実行し、Firestoreからデータを取得し、スプレッドシート形式で表示します。

node exportToCSV.js

## 注意事項

- Firebaseのセキュリティルールが適切に設定されていることを確認してください。
- 各スクリプトを実行する前に、必要なパッケージがインストールされていることを確認してください。

## 依存関係

このプロジェクトでは、以下のNode.jsパッケージを使用しています。

- `firebase-admin`: Firebase Admin SDK
- `json2csv`: JSONデータをCSV形式に変換するためのライブラリ

これらのパッケージは、以下のコマンドでインストールできます。

```bash
npm install firebase-admin json2csv
```

