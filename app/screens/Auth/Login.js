module.exports = {
  template: '#login-page',
  data() {
    return {
      title: 'Sign in to your account',
      settingDone: false,
    }
  },
  methods: {
    login: function () {
      if (this.settingDone) {
        this.$router.push('/home')
      } else {
        this.$router.push('/logged')
      }
    },
  },
}
