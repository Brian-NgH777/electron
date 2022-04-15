module.exports = {
  state() {
    return {
      step: 1,
      userPool: null,
      cognitoUser: null,
      user: null,
      appLoading: false,
      bulkAuth: {
        username: '',
        password: '',
      },
      devicesList: [],
    }
  },
  mutations: {
    nextStep(state) {
      state.step += 1
    },
    backStep(state) {
      state.step -= 1
    },
    setUserPool(state, payload) {
      state.userPool = payload.userPool
    },
    setCognitoUser(state, payload) {
      state.cognitoUser = payload.cognitoUser
    },
    setUser(state, payload) {
      state.user = payload.user
    },
    setAppLoading(state, payload) {
      state.appLoading = payload.loading
    },
    setBulkAuth(state, payload) {
      state.bulkAuth = payload.bulkAuth
    },
  },
  getters: {
    step(state) {
      return state.step
    },
    userPool(state) {
      return state.userPool
    },
    setCognitoUser(state) {
      return state.cognitoUser
    },
    user(state) {
      return state.user
    },
    appLoading(state) {
      return state.appLoading
    },
    bulkAuth(state) {
      return state.bulkAuth
    },
  },
}
