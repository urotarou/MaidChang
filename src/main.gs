function doPost(event) {
  // Slash Command
  const commandResult = handleSlashCommand(event.parameter.command, event.parameter.text)
  if (commandResult !== "") {
    return ContentService.createTextOutput(commandResult).setMimeType(ContentService.MimeType.JSON)
  }

  // Mention
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
  const threadTimeStamp = data.event.thread_ts || data.event.ts
  const option = {
    thread_ts: threadTimeStamp
  }
  const aiMessage = chat(channelId, userMessage)

  sendMessage(channelId, aiMessage, option)

  return ContentService.createTextOutput("OK")
}
