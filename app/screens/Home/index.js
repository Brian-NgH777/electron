const { Auth } = require('aws-amplify')
const { isDev } = require('../../configs')

module.exports = {
  template: '#home',
  data() {
    return {
      pointGreen: isDev
        ? './assets/images/points.png'
        : '../assets/images/points.png',
      pointRed: isDev
        ? './assets/images/points-red.png'
        : '../assets/images/points-red.png',
      cctvCamera: isDev
        ? './assets/images/cctv-camera.png'
        : '../assets/images/cctv-camera.png',
      brokenLink: isDev
        ? './assets/images/broken-link.png'
        : '../assets/images/broken-link.png',
      linked: isDev
        ? './assets/images/linked.png'
        : '../assets/images/linked.png',
      userInfo: isDev
        ? './assets/images/info.png'
        : '../assets/images/info.png',
      chart: isDev ? './assets/images/chart.png' : '../assets/images/chart.png',
      freeTrial: true,
      frpStatus: true,
      devicesList: [
        {
          status: true,
          ip: '192.168.1.2',
          name: 'Dahua overview sp-1',
        },
        {
          status: false,
          ip: '192.168.1.3',
          name: 'Dahua vision spi 2040',
        },
        {
          status: false,
          ip: '192.168.1.4',
          name: 'Hikvision sla 902',
        },
        {
          status: true,
          ip: '192.168.1.5',
          name: 'Hikvision poo 1280',
        },
        {
          status: true,
          ip: '192.168.1.10',
          name: '',
        },
        {
          status: true,
          ip: '192.168.1.22',
          name: '',
        },
      ],
    }
  },
  computed: {
    deviceOn() {
      return this.devicesList.filter(o => o.status)
    },
    deviceOff() {
      return this.devicesList.filter(o => !o.status)
    },
  },
  methods: {
    endFreeTrial() {
      this.freeTrial = false
    },
    logout() {
      Auth.signOut()
      localStorage.clear()
      return this.$router.push('/')
    },
    clearSettingDone() {
      this.$store.commit({
        type: 'resetStep',
      })
    },
  },
}
