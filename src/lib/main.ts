const ONE_CREDIT = 100;

function getData() {
  try {
    return BASE_DATA;
  } catch {
    return undefined;
  }
}

function numberFormat(value: number) {
  return value.toLocaleString('ja-JP');
}

export function main() {
  const data = getData();
  if (!data) {
    alert(
      '英傑大戦.netのデータリストページで実行してください。読み込み中であれば少し待ってから実行してください。'
    );
    return;
  }
  const playerData = data.playerData?.[0];
  if (!playerData) {
    alert('英傑大戦.netにログインした状態で実行してください。');
    return;
  }
  try {
    const totalGift = playerData.card_gift_num.reduce((total, giftNum) => total + giftNum, 0);
    const totalPlayNum = playerData.total_play_num;
    const totalPayment = (totalPlayNum + totalGift) * ONE_CREDIT;
    const message = `英傑大戦の総プレイ料金は
【 ${numberFormat(totalPayment)} 円 】です。
総プレイ回数: ${numberFormat(totalPlayNum)} 回、総贈り物回数: ${numberFormat(totalGift)} 回

※総プレイ料金は総プレイ回数、総贈り物回数からの予想値です。1クレジット${ONE_CREDIT}円で計算しています。
※印刷料金は含んでいません。`;
    alert(message);
  } catch (e) {
    console.error(e);
    alert('エラーが発生しました。このブックマークレットは使えなくなった可能性があります。');
  }
}
