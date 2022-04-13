// const notifier = require('node-notifier')
const { InstallPackage } = require('../../../mac')
const { isDev } = require('../../configs')

module.exports = {
  template: '#frp-config',
  data() {
    return {
      frpTutorialStyle: {
        backgroundImage: `url(${
          isDev
            ? './assets/images/iot-connect.png'
            : '../assets/images/iot-connect.png'
        })`,
      },
      connected: false,
      process: 0,
      intervalProcess: null,
      stepProcess: [
        { title: 'Starting...', active: 1 },
        { title: 'Auth token frpc client...', active: 20 },
        { title: 'Create file config ini...', active: 40 },
        { title: 'Connecting...please wait!', active: 60 },
        { title: 'Connected!', active: 100 },
      ],
      prevTitle: '',
    }
  },
  watch: {
    process(val) {
      if (val === 100) {
        this.connected = true
        clearInterval(this.intervalProcess)
      }
    },
  },
  methods: {
    async showNoti() {
      await InstallPackage('louis_nguyen')
      // notifier.notify({
      //   title: 'Connect FRP',
      //   message: 'Connect successfully!',
      // })
    },
    nextStep() {
      if (!this.connected) return
      return this.$store.commit({ type: 'nextStep' })
    },
    connect() {
      this.intervalProcess = setInterval(() => {
        this.process += 1
      }, 50)
      this.showNoti()
    },
    getTextStep(num) {
      const d = this.stepProcess.filter(item => item.active === num)[0]
      if (d) {
        this.prevTitle = d.title
        return d
      }
      return null
    },
  },
  destroyed() {
    clearInterval(this.intervalProcess)
  },
}
