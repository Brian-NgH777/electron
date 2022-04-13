const { Auth } = require('aws-amplify')
module.exports = {
  template: '#home',
  data() {
    return {}
  },
  methods: {
    logout() {
      const settingDone = localStorage.getItem('setting-done')
      Auth.signOut()
      localStorage.clear()
      if (typeof settingDone !== 'undefined') {
        localStorage.setItem('setting-done', settingDone)
      }
      return this.$router.push('/')
    },
    clearSettingDone() {
      localStorage.removeItem('setting-done')
    },
  },
}
