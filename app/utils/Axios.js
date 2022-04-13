const axios = require('axios').default
const { API_URL_V2 } = require('../configs')

const instance = axios.create({
  baseURL: API_URL_V2,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getToken() {
  const token = localStorage.getItem('token')
  if (!token) return ''
  return token
}

instance.interceptors.request.use(config => {
  config.headers = {
    Authorization: `Bearer ${getToken()}`,
  }
  return config
})

module.exports = {
  instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
}
