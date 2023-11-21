function execCommandVxt(url) {
  const newUrl = url.replace("://x.com/","://vxtwitter.com/")
                    .replace("://twitter.com/","://vxtwitter.com/")
                    .replace(/\?.*/,"")

  return JSON.stringify(
    {
      "response_type": "in_channel",
      "text": newUrl,
      "unfurl_links" : "true"
    }
  )
}

function execCommandYotei(date, time, eventName) {
  const template = "https://www.google.com/calendar/render?action=TEMPLATE&text={EVENT_NAME}&dates={bYEAR}{bMONTH}{bDAY}T{bHOUR}{bMIN}00Z/{aYEAR}{aMONTH}{aDAY}T{aHOUR}{aMIN}00Z"
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

  return JSON.stringify(
    {
      "response_type": "in_channel",
      "text": newUrl
    }
  )
}
