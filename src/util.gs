// =================================
// Cache系
// =================================
function isCachedKey(key) {
  const cache = CacheService.getScriptCache()
  const isCached = cache.get(key)

  if (isCached) {
    return true
  } else {
    cache.put(key, true, 300)
    return false
  }
}

function saveValue(key, value) {
  const cache = CacheService.getScriptCache()

  cache.put(key, value, 1800)
}

function loadValue(key) {
  const cache = CacheService.getScriptCache()

  return cache.get(key)
}

// =================================
// 文字列系
// =================================
function withoutMention(message) {
  return message.replace(/^<.+> /, "").trim()
}

function zeroPadding(digits, number) {
  return number.toString().slice(-digits)
}
