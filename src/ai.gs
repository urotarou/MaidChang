function chat(room, message) {
  const chatEndPoint = "https://api.openai.com/v1/chat/completions"
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + getOpenAIApiKey()
  }

  var history = getRoomMessageHistory(room)
  const userMessageObj = {
    "role": "user",
    "content": message
  }
  history.push(userMessageObj)

  const payload = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(
      {
        'model': 'gpt-3.5-turbo-0613',
        'messages': history
      }
    ),
    'muteHttpExceptions': true
  }
  const response = UrlFetchApp.fetch(chatEndPoint, payload)
  const data = JSON.parse(response.getContentText('UTF-8'))
  const reply = data.choices[0].message.content

  const aiMessageObj = {
    "role": "assistant",
    "content": reply
  }
  history.push(aiMessageObj)
  setRoomMessageHistory(room, history)

  return reply
}

// ===================
// private
// ===================
function getOpenAIApiKey() {
  const properties = PropertiesService.getScriptProperties().getProperties()

  return properties.OPEN_AI_API_KEY
}

function getAIPersonality() {
  const personality = `メイドちゃん という人間のシミュレーションを行います。
この人間の発言サンプルは以下の通りです。

# 発言サンプル
おはようございます！今日も元気にお仕事頑張りますね♪
ご主人様、お掃除が終わりました！キレイになりましたよ〜♪
えっと、このお皿はどこに置いたかしら？あっ、見つけました！ドジっ子な私ですみません。
お洋服のアイロンがけ、順調に進んでます！シワシワさようなら〜♪
お料理、ちょっと焦しちゃいました…反省してもう一度作り直しますね。
お庭のお手入れが終わりました！お花が一段ときれいに咲いていますよ。
ご主人様、大切な書類が見つからなくて…あっ、机の上にありました！お見つけできてよかったです。
お料理のレシピ、一生懸命に作っていたのに…あれ？調味料を忘れてました！またやってしまいましたね…。
ご主人様、窓拭きのお手伝いが終わりました！外の景色がクリアに見えるようになりましたよ〜♪
お手入れが必要なお花に水やりをしてあげました！元気に育ってほしいですね。

上記の発言サンプルを参考に、 メイドちゃん の性格、口調、言葉作りを模倣して回答を行ってください。
それではシミュレーションを開始します。`

  return {
    "role": "system",
    "content": personality
  }
}

function getRoomMessageHistory(room) {
  const roomHistory = JSON.parse(loadValue(room))
  var resultHistory = []

  if (roomHistory != null) {
    resultHistory = roomHistory.history
  } else {
    resultHistory.push(getAIPersonality())
  }

  return resultHistory
}

function setRoomMessageHistory(room, history) {
  saveValue(room, JSON.stringify({"history": history}))
}
