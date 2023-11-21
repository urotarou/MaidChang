function handleSlashCommand(command, params) {
  switch (command) {
    case "/vxt": // X to vxTwitter URL
      return execCommandVxt(params)

    case "/yotei": // create Google Calendar schedule
      return execCommandYotei(params)

    default:
      return ""
  }
}

// ===================
// private
// ===================
function execCommandVxt(url) {
  if (!url.startsWith("https://")) {
    const errorJson = createCommandErrorJson("URLを指定してね")

    return errorJson
  }

  const newUrl = url.replace("://x.com/","://vxtwitter.com/")
                    .replace("://twitter.com/","://vxtwitter.com/")
                    .replace(/\?.*/,"")

  const result =  JSON.stringify(
    {
      "response_type": "in_channel",
      "text": newUrl,
      "unfurl_links" : "true"
    }
  )

  return result
}

function execCommandYotei(params) {
  const splitParams = params.split(" ")

  if (splitParams.length !== 3 || splitParams[0].length !== 8 || splitParams[1].length !== 4){
    const errorJson = createCommandErrorJson("パラメータを指定してね: \"yyyymmdd hhmm イベント名\"")

    return errorJson
  }

  const template = "https://www.google.com/calendar/render?action=TEMPLATE&text={EVENT_NAME}&dates={bYEAR}{bMONTH}{bDAY}T{bHOUR}{bMIN}00Z/{aYEAR}{aMONTH}{aDAY}T{aHOUR}{aMIN}00Z"
  const date = splitParams[0]
  const time = splitParams[1]
  const eventName = splitParams[2]
  const beforeDatetime = new Date(
    date.slice(0, 4) + "/" + date.slice(4, 6) + "/" + date.slice(6) + " " + 
    time.slice(0, 2) + ":" + time.slice(2)
  )
  beforeDatetime.setHours(beforeDatetime.getHours() - 9)
  const afterDatetime = new Date(beforeDatetime)
  afterDatetime.setHours(afterDatetime.getHours() + 1)

  const newUrl = template.replace("{EVENT_NAME}", eventName)
          .replace("{bYEAR}", zeroPadding(4, beforeDatetime.getFullYear()))
          .replace("{bMONTH}", zeroPadding(2, beforeDatetime.getMonth() + 1))
          .replace("{bDAY}", zeroPadding(2, beforeDatetime.getDate()))
          .replace("{bHOUR}", zeroPadding(2, beforeDatetime.getHours()))
          .replace("{bMIN}", zeroPadding(2, beforeDatetime.getMinutes()))
          .replace("{aYEAR}", zeroPadding(4, afterDatetime.getFullYear()))
          .replace("{aMONTH}", zeroPadding(2, afterDatetime.getMonth() + 1))
          .replace("{aDAY}", zeroPadding(2, afterDatetime.getDate()))
          .replace("{aHOUR}", zeroPadding(2, afterDatetime.getHours()))
          .replace("{aMIN}", zeroPadding(2, afterDatetime.getMinutes()))

  const result = JSON.stringify(
    {
      "response_type": "in_channel",
      "text": newUrl
    }
  )

  return result
}

function createCommandErrorJson(message) {
  return JSON.stringify(
    {
      "text": message
    }
  )
}
