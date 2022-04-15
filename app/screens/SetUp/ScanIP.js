const { GetIP } = require('../../../mac')
const { isDev, CAMERA_URL_REGEX } = require('../../configs')

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
      liveIcon: isDev
        ? './assets/images/live-streaming.png'
        : '../assets/images/live-streaming.png',
      snapIcon: isDev
        ? './assets/images/snapshot.png'
        : '../assets/images/snapshot.png',
      link: '',
      snapLink: '',
      form: {
        ip: '',
        port: '',
        username: '',
        password: '',
      },
      testOK: false,
      testLoading: false,
      bulkForm: {
        username: '',
        password: '',
      },
      cameraBranch: [
        {
          name: 'Dahua',
          template: 'http://<username>:<password>@<ip>:<port>/',
          snap: 'cgi-bin/snapshot.cgi',
        },
        {
          name: 'Hikvision',
          template: 'http://<username>:<password>@<ip>:<port>/',
          snap: 'ISAPI/Streaming/channels/1/picture',
        },
      ],
      cameraBranchSelected: '',
    }
  },
  watch: {
    cameraBranchSelected(val) {
      this.snapLink = `${val.template}${val.snap}`
      this.link = val.template
    },
    // form: {
    //   handler(val) {
    //     let link = this.link
    //     const pos1 = this.getIPPosition(val.ip, 0)
    //     const pos2 = this.getIPPosition(val.ip, 1)
    //     const pos3 = this.getIPPosition(val.ip, 2)
    //     const pos4 = this.getIPPosition(val.ip, 3)
    //     const port = val.port
    //     const auth = this.getAuthCamera(val.username, val.password)
    //     link = `${auth}${pos1}.${pos2}.${pos3}.${pos4}:${port}`
    //     this.link = link
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    // link(val) {
    //   const linkArr = CAMERA_URL_REGEX.exec(val)
    //   console.log(linkArr)
    //   if (linkArr) {
    //     const ip = linkArr[3] ?? ''
    //     this.form.ip = ip
    //   }
    // },
  },
  methods: {
    // getIPPosition(val, pos) {
    //   if (val && val.split('.')[pos]) {
    //     return val.split('.')[pos]
    //   }
    //   return 'xxx'
    // },
    // getAuthCamera(username, pwd) {
    //   if ((!username && !pwd) || (username === '' && pwd === '')) return ''
    //   return `${username}:${pwd}@`
    // },
    nextStep() {
      return this.$store.commit({ type: 'nextStep' })
    },
    backStep() {
      return this.$store.commit({ type: 'backStep' })
    },
    okBulkAuth() {
      localStorage.setItem('bulk-auth', JSON.stringify(this.bulkForm))
      this.$store.commit({
        type: 'setBulkAuth',
        bulkAuth: this.bulkForm,
      })
    },
    testConnection() {
      if (!this.testLoading) {
        this.testLoading = true
        setTimeout(() => {
          this.testLoading = false
          this.testOK = true
        }, 5000)
      }
    },
    async scanIP() {
      this.loading = true
      const t = setTimeout(() => (this.loading = false), 20000)
      const data = await GetIP()
      clearTimeout(t)
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
