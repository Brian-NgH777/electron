const API_URL =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://api.viact.net'
    : 'https://api-dev.viact.net'

const API_URL_V2 =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://api-revamp.viact.net'
    : 'https://api-dev-revamp.viact.net'

module.exports = {
  API_URL,
  API_URL_V2,
  env: 'PROD', // PROD
}
