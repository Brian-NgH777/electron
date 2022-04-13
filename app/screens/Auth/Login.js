const { useLogin } = require('../../hooks/Auth')
const { mapGetters } = require('vuex')
const { Auth } = require('../../../mac')

module.exports = {
  template: '#login-page',
  data() {
    return {
      title: 'Sign in to your account',
      username: 'louis_nguyen', // louis_nguyen
      password: '123456789Aa', // 123456789Aa
      loginError: false,
      loadingLogin: false,
    }
  },
  computed: {
    ...mapGetters(['userPool']),
  },
  methods: {
    login: async function (e) {
      this.loadingLogin = true
      const { login } = useLogin()
      e.preventDefault()
      const username = this.username.trim()
      const password = this.password.trim()
      const result = await login(username, password, this.userPool)
      this.loadingLogin = false
      if (result.err) {
        this.loginError = true
      } else if (result.data) {
        console.log(result.data)
        Auth('louis_nguyen')
        this.$store.commit({
          type: 'setUser',
          user: result.data,
        })
        const settingDone = localStorage.getItem('setting-done')
        if (settingDone) {
          this.$router.push('/home')
        } else {
          this.$router.push('/settings')
        }
      }
    },
  },
}
