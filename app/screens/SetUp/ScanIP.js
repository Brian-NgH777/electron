const { GetIP } = require('../../../mac')
const { isDev } = require('../../configs')

module.exports = {
  template: '#scan-ip',
  data() {
    return {
      cameraList: [],
      loading: false,
      padlockIconUrl: isDev
        ? './assets/images/padlock.png'
        : '../assets/images/padlock.png',
      noConnectionIcon: isDev
        ? './assets/images/no-connection.png'
        : '../assets/images/no-connection.png',
      listProtocol: ['http://', 'rtsp://', 'rtmp://'],
      link: '',
      fullLink: '',
      fragment: '/ISAPI/Channel/1/picture',
      form: {
        protocol: 'http://',
        ip: '192.168.1.2',
        port: 554,
        username: 'admin',
        password: 'Viact@123',
      },
      testOK: false,
      testLoading: false,
    }
  },
  watch: {
    form: {
      handler(val) {
        const pos1 = this.getIPPosition(val.ip, 0)
        const pos2 = this.getIPPosition(val.ip, 1)
        const pos3 = this.getIPPosition(val.ip, 2)
        const pos4 = this.getIPPosition(val.ip, 3)
        const port = val.port
        const auth = this.getAuthCamera(val.username, val.password)
        this.link = `${auth}${pos1}.${pos2}.${pos3}.${pos4}:${port}`
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getFullLink() {
      return `${this.form.protocol}${this.link}${this.fragment}`
    },
    getIPPosition(val, pos) {
      if (val && val.split('.')[pos]) {
        return val.split('.')[pos]
      }
      return 'xxx'
    },
    getAuthCamera(username, pwd) {
      if ((!username && !pwd) || (username === '' && pwd === '')) return ''
      return `${username}:${pwd}@`
    },
    nextStep() {
      return this.$store.commit({ type: 'nextStep' })
    },
    backStep() {
      return this.$store.commit({ type: 'backStep' })
    },
    testConnection() {
      if (!this.testLoading) {
        this.testLoading = true
        this.fullLink = this.getFullLink()
        setTimeout(() => {
          this.testLoading = false
          this.testOK = true
        }, 3000)
      }
    },
    async scanIP() {
      this.loading = true
      const data = await GetIP()
      if (data) {
        this.loading = false
        const parseData = data.map(item => ({
          ...item,
          vendor: JSON.parse(item.vendor.replaceAll("'", '"')),
        }))
        this.cameraList = parseData
        console.log('scanned ip =', parseData)
      }
    },
  },
  mounted: function () {
    this.scanIP()
  },
}
