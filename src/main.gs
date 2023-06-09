function doPost(event) {
  const data = JSON.parse(event.postData.getDataAsString())

  // Slack API の認証チェック対応
  if (isSlackApiVerification(data)) {
    return ContentService.createTextOutput(data.challenge)
  }

  // Slackの3秒ルールでのイベント再送対策
  const timestamp = data.event.event_ts
  if (isCachedKey(timestamp)) {
    return ContentService.createTextOutput("OK")
  }

  const channelId = data.event.channel
  const userMessage = withoutMention(data.event.text)
  const aiMessage = chat(channelId, userMessage)

  sendMessage(channelId, aiMessage)

  return ContentService.createTextOutput("OK")
}
