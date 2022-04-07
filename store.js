module.exports = {
  state() {
    return {
      step: 2,
    };
  },
  mutations: {
    nextStep(state) {
      state.step += 1;
    },
    backStep(state) {
      state.step -= 1;
    },
  },
  getters: {
    step(state) {
      return state.step;
    },
  },
};
