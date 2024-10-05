// saveToFirestore.js
const admin = require('firebase-admin');
const fs = require('fs');

// Firebase Admin SDKの初期化
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// JSONデータの読み込み
fs.readFile('discussions-2024-9-30.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('ファイルの読み込みエラー:', err);
    return;
  }

  const discussions = JSON.parse(data);

  // データの保存
  const batch = db.batch();
  discussions.forEach(item => {
    const docRef = db.collection('discussions').doc(item.id.toString());

    // messagesとextraを適切な形式に変換
    const messages = item.messages.map(message => ({
      role: message.role,
      content: message.content
    }));

    const extra = {
      session: item.extra.session,
      model: item.extra.model,
      temperature: item.extra.temperature
    };

    batch.set(docRef, {
      userId: item.userId,
      ip: item.ip,
      messages: messages, // 配列として保存
      extra: extra, // オブジェクトとして保存
      botId: item.botId,
      chatId: item.chatId,
      created: admin.firestore.Timestamp.fromDate(new Date(item.created)), // Timestampに変換
      updated: admin.firestore.Timestamp.fromDate(new Date(item.updated))  // Timestampに変換
    });
  });

  // バッチ処理のコミット
  await batch.commit();
  console.log('データがFirestoreに保存されました。');
});