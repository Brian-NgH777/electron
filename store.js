module.exports = {
  state() {
    return {
      step: 1,
      userPool: null,
      cognitoUser: null,
      user: null,
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
  },
}
