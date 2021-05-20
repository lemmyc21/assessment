"use strict";
// html ID との関連付け
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");

/**
 * 指定したHTML要素の子要素を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren (element) {
  while (element.firstChild) {
    // 子要素がある限り続行
    element.removeChild(element.firstChild);
  }
}

// 診断ボタンの挙動
assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前入力欄が空白時のガード句
    return;
  }

  // 診断処理の実行
  const result = assessment(userName);

  // 診断結果を初期化
  removeAllChildren(resultDivided);
  removeAllChildren(tweetDivided);

  // 診断結果表示エリアの作成
  const header = document.createElement("h3");
  header.innerText = "診断結果";
  resultDivided.appendChild(header);  // 「診断結果」というh3要素を子要素として追加する

  const paragraph = document.createElement("p");
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);  // 診断処理の結果を格納したp要素を子要素として追加する

  // TODO ツイートエリアの作成
  const anchor = document.createElement("a");
  const hrefValue =
  "https://twitter.com/intent/tweet?button_hashtag=" 
      + encodeURIComponent("あなたのいいところ") + "&ref_src=twsrc%5Etfw";

  //aタグに各種パラメータ設定
  anchor.setAttribute("href", hrefValue);
  anchor.className = "twitter-hashtag-button";
  anchor.setAttribute("data-text", result);
  anchor.innerText = "Tweet #あなたのいいところ";

  tweetDivided.appendChild(anchor);

  //scriptタグに各種パラメータ設定
  const script = document.createElement("script");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");

  tweetDivided.appendChild(script);


}

// ｴﾝﾀｰｷｰを押しても診断する処理
userNameInput.onkeydown = event => {
  if (event.key === "Enter") {
    assessmentButton.onclick();
  }
}

const answers = [
    "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
    "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
    "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
    "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
    "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
    "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
    "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
    "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
    "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
    "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
    "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
    "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
    "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
    "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
    "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
    "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。"
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
*/
function assessment(userName) {
    // 全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;  // 文字コードの合計(診断兼判別用)
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);  // 1文字ずつ文字コードを加算
    }

    // 文字コード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);

    return result;
}

console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ場合は常に同じ結果を出力する処理が正しくありません。'
  );
/*
console.log(assessment("太郎"));
console.log(assessment("次郎"));
console.log(assessment("次郎太"));
*/
