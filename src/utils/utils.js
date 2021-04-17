export function getTweetId(tweetUrl) {
  var tweetArray = tweetUrl.split('/')
  var lastString = tweetArray[tweetArray.length - 1]
  var strip = lastString.split('?') // remove additional parameters
  var tweetId = strip[0]
  return tweetId
}
