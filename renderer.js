require('./tailwind.config')
const { createApp } = require('vue')
const VueRouter = require('vue-router')
const Vuex = require('vuex')
const store = require('./store')

// Import components
const SetUp = require('./app/screens/SetUp')
const Login = require('./app/screens/Auth/Login')
const Dashboard = require('./app/screens/Home')

const routes = [
  { path: '/', component: Login },
  { path: '/logged', component: SetUp },
  { path: '/home', component: Dashboard },
]

const Store = Vuex.createStore(store)

// Create App
const App = createApp({
  store: Store,
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
