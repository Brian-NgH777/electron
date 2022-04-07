module.exports = {
  template: '#home',
  data() {
    return {};
  },
  methods: {
    logout() {
      return this.$router.push('/');
    },
    clearSettingDone() {
      localStorage.removeItem('setting-done');
    },
  },
};
