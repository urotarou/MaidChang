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
