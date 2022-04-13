// const axios = require('../utils/Axios')
const { API_URL } = require('../configs')
const AWSCognito = require('amazon-cognito-identity-js')
const { Amplify, Auth } = require('aws-amplify')
const Axios = require('axios').default

async function initUserPool() {
  let config = null
  let count = 1
  while (!config || count < 10) {
    try {
      config = await (await Axios.get(API_URL)).data
      if (config) {
        Amplify.configure({
          Auth: {
            mandatorySignIn: true,
            region: config.cognito_pool_id?.split('_')[0],
            userPoolId: config.cognito_pool_id,
            userPoolWebClientId: config.cognito_client_id,
          },
          oauth: {
            domain: 'viact-dev.auth.ap-southeast-1.amazoncognito.com',
            responseType: 'token',
          },
        })
        return {
          err: null,
          data: config,
        }
      }
    } catch (e) {
      count = count + 1
      await new Promise(resolve => setTimeout(() => resolve(true), 1000))
    }
  }

  if (count === 10) {
    return {
      err: 'System has problem, please try again later.',
      data: null,
    }
  }
}

function useLogin() {
  async function authenticate() {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken()
    localStorage.setItem('token', token)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const user = (await Axios.get(`${API_URL}/api/authenticated`, options)).data
    if (user) {
      await Axios.get(`${API_URL}/api/verify-expiry`, options)
      return {
        err: null,
        data: user,
      }
    }
  }
  async function login(username, password, userPool) {
    const authDetails = new AWSCognito.AuthenticationDetails({
      Username: username,
      Password: password,
    })

    if (userPool) {
      const user = new AWSCognito.CognitoUser({
        Username: authDetails.getUsername(),
        Pool: userPool,
      })
      const data = await new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
          onSuccess: () => {
            user.getSession((err, session) => {
              if (err) {
                reject(err)
              } else {
                resolve(session)
              }
            })
          },
          onFailure: err => reject(err),
        })
      })
        .then(async res => {
          if (res) {
            return authenticate()
          }
        })
        .catch(err => ({
          data: null,
          err,
        }))
      return data
    }
  }

  return {
    login,
    authenticate,
  }
}

module.exports = {
  initUserPool,
  useLogin,
}
