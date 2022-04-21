const { Auth } = require('aws-amplify')
const { isDev } = require('../../configs')
const moment = require('moment')

module.exports = {
  template: '#home',
  components: {},
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
      pulse: isDev ? './assets/images/pulse.png' : '../assets/images/pulse.png',
      read: isDev ? './assets/images/read.png' : '../assets/images/read.png',
      alert: isDev ? './assets/images/alert.png' : '../assets/images/alert.png',
      plus: isDev ? './assets/images/plus.png' : '../assets/images/plus.png',
      profile: isDev
        ? './assets/images/profile.png'
        : '../assets/images/profile.png',
      slowMotion: isDev
        ? './assets/images/slow-motion.png'
        : '../assets/images/slow-motion.png',
      freeTrial: true,
      frpStatus: true,
      columns: ['Status', 'IP Address', 'Name', ''],
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
      alerts: [
        {
          type: 'heal',
          title: 'FRP Connection status',
          desc: 'FRP Connection was disconnected, this may be affected to standard processing of the system.',
          createdAt: new Date(),
        },
        {
          type: 'motion',
          title: 'Camera detected',
          desc: 'The camera has detected motion, check if necessary',
          createdAt: new Date(),
        },
        {
          type: '',
          title: 'this is title 1',
          desc: 'this is description',
          createdAt: new Date(),
        },
        {
          type: '',
          title: 'this is title 2',
          desc: 'this is description',
          createdAt: new Date(),
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
    moment,
    getAlertIcon(type) {
      switch (type) {
        case 'heal':
          return this.pulse
        case 'motion':
          return this.slowMotion
        default:
          return this.alert
      }
    },
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
