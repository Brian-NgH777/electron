const API_URL =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://api.viact.net'
    : 'https://api-dev.viact.net'

const API_URL_V2 =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://api-revamp.viact.net'
    : 'https://api-dev-revamp.viact.net'

const CAMERA_URL_REGEX =
  /^(rtsp|http|https|rtmp|hls):\/\/([^\s]+)([^\s/:]+)(?::([0-9]+))?/i

module.exports = {
  API_URL,
  API_URL_V2,
  isDev: true,
  CAMERA_URL_REGEX,
}
