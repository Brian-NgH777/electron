const { mapState } = require('vuex')
const { GetIP, CreateCamera } = require('../../../mac')
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
      form: {
        link: '',
        snapLink: '',
        cameraName: '',
        ip: '',
        port: '',
        remotePort: '12345',
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
      addCameraModal: false,
    }
  },
  computed: mapState(['user']),
  watch: {
    cameraBranchSelected(val) {
      this.form.snapLink = `${val.template}${val.snap}`
      this.form.link = val.template
    },
    'form.link': {
      handler(val) {
        if (val) {
          const arr = [...val.matchAll(CAMERA_URL_REGEX)][0]
          if (arr) {
            const ip = arr[3]
            const port = arr[4]
            this.form.ip = ip
            this.form.port = port
          }
        }
      },
    },
  },
  methods: {
    addCamera() {
      if (
        this.form.link !== '' &&
        this.form.snapLink !== '' &&
        this.form.ip !== '' &&
        this.form.port !== '' &&
        this.user
      ) {
        CreateCamera({
          ...this.form,
          companyCode: this.user.company_code,
        })
      }
    },
    closeAddCameraModal() {
      this.addCameraModal = false
    },
    openAddCameraModal() {
      this.addCameraModal = true
    },
    chooseCamera(item) {
      this.form.link = item.ip
      this.form.snapLink = item.ip
      this.form.ip = item.ip
      this.form.cameraName = item.vendor.company ?? ''
      this.openAddCameraModal()
    },
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
