// exportToCSV.js
const admin = require('firebase-admin');
const fs = require('fs');
const { parse } = require('json2csv');

// Firebase Admin SDKの初期化
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Firestoreからデータを取得してCSVに変換
async function exportToCSV() {
  const snapshot = await db.collection('discussions').get();
  const data = [];

  snapshot.forEach(doc => {
    const item = doc.data();
    data.push({
      id: doc.id,
      userId: item.userId,
      ip: item.ip,
      botId: item.botId,
      chatId: item.chatId,
      created: item.created ? item.created.toDate().toISOString() : null, // 存在確認
      updated: item.updated ? item.updated.toDate().toISOString() : null, // 存在確認
      messages: JSON.stringify(item.messages), // messagesをJSON文字列として保存
      extra: JSON.stringify(item.extra) // extraをJSON文字列として保存
    });
  });

  // CSV形式に変換
  const csv = parse(data);

  // CSVファイルの保存
  fs.writeFile('exportedData.csv', csv, (err) => {
    if (err) {
      console.error('CSVファイルの保存エラー:', err);
    } else {
      console.log('CSVファイルが作成されました: exportedData.csv');
    }
  });
}

// 実行
exportToCSV().catch(console.error);