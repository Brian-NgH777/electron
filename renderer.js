require('./tailwind.config')
const { createApp } = require('vue')
const VueRouter = require('vue-router')
const Vuex = require('vuex')
const store = require('./store')
const { initUserPool } = require('./app/hooks/Auth')
const { CognitoUserPool } = require('amazon-cognito-identity-js')
const { useLogin } = require('./app/hooks/Auth')

// Import components
const SetUp = require('./app/screens/SetUp')
const Login = require('./app/screens/Auth/Login')
const Dashboard = require('./app/screens/Home')
const { mapGetters } = require('vuex')

const routes = [
  { path: '/', component: Login },
  { path: '/logged', component: SetUp },
  { path: '/home', component: Dashboard },
]

const Store = Vuex.createStore(store)

// Create App
const App = createApp({
  store: Store,
  data() {
    return {
      initError: null,
    }
  },
  computed: {
    ...mapGetters(['userPool']),
  },
  watch: {
    userPool(val, prevVal) {
      if (val) {
        this.verifySession()
      }
    },
  },
  methods: {
    async init() {
      const { data, err } = await initUserPool()
      if (err && !data) {
        this.initError = err
      } else if (data && !err) {
        const userPool = new CognitoUserPool({
          ClientId: data.cognito_client_id,
          UserPoolId: data.cognito_pool_id,
        })
        this.$store.commit({ type: 'setUserPool', userPool })
      }
    },
    async verifySession() {
      return await new Promise((resolve, reject) => {
        const { authenticate } = useLogin()
        for (const x in localStorage) {
          if (x.match('CognitoIdentityServiceProvider')) {
            const user = this.userPool.getCurrentUser()
            if (user) {
              user.getSession((err, session) => {
                if (session && !err) {
                  authenticate().then(res => {
                    if (res.data) {
                      this.$store.commit({
                        type: 'setUser',
                        user: res.data,
                      })
                      this.$router.push('/home')
                    } else {
                      localStorage.clear()
                      this.$router.push('/')
                    }
                  })
                }
              })
            }
            resolve(true)
            break
          }
        }
        reject(false)
      })
    },
  },
  mounted() {
    this.init()
  },
})

// Router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

// App use
App.use(router)
App.use(Store)

// Mount App
App.mount('#app')
