const SetUp = require('./app/pages/SetUp');
const Login = require('./app/pages/Auth/Login');

const routes = [
  { path: '/logged', component: SetUp },
  { path: '/', component: Login },
];

// Create App
const App = Vue.createApp({});

// Router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

// App use
App.use(router);

// Mount App
App.mount('#app');
