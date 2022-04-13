const { Auth } = require('aws-amplify')
module.exports = {
  template: '#home',
  data() {
    return {}
  },
  methods: {
    logout() {
      Auth.signOut()
      localStorage.clear()
      return this.$router.push('/')
    },
    clearSettingDone() {
      localStorage.removeItem('setting-done')
    },
  },
}
