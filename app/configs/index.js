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
  AWS_S3_ACCESS_KEY:'AKIA2NACRACL2LO5LTEY',
  AWS_S3_SECRET_KEY:'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',
  AWS_S3_REGION:'ap-southeast-1',
  AWS_S3_BUCKET:'customindz-shinobi',
  isDev: false,
}
