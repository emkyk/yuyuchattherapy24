// summaryToCSV.js
const fs = require('fs');
const { parse } = require('json2csv');

// JSONデータの読み込み
fs.readFile('discussions-2024-9-30.json', 'utf8', (err, data) => {
  if (err) {
    console.error('ファイルの読み込みエラー:', err);
    return;
  }

  const discussions = JSON.parse(data);
  const summarizedData = [];

  discussions.forEach(item => {
    const id = item.id;
    const messages = item.messages;

    // メッセージの要約
    const summary = messages.map(message => message.content).join(' ');

    // 要約を配列に追加
    summarizedData.push({
      id: id,
      userId: item.userId,
      ip: item.ip,
      botId: item.botId,
      chatId: item.chatId,
      created: item.created,
      updated: item.updated,
      summary: summary // 要約を追加
    });
  });

  // CSV形式に変換
  const csv = parse(summarizedData);

  // CSVファイルの保存
  fs.writeFile('summarizedMessages.csv', csv, (err) => {
    if (err) {
      console.error('CSVファイルの保存エラー:', err);
    } else {
      console.log('CSVファイルが作成されました: summarizedMessages.csv');
    }
  });
});