const { mapGetters } = require('vuex')
const { GetIP, InstallPackage } = require('../../../mac')
const Agreement = require('./Agreement')
const FRPConfig = require('./FRPConfig')
const ScanIp = require('./ScanIP')
const StatusSummarize = require('./StatusSummarize.js')
const { isDev } = require('../../configs')

module.exports = {
  template: '#setup-page',
  components: {
    Agreement,
    ScanIp,
    StatusSummarize,
    'frp-config': FRPConfig,
  },
  data() {
    return {
      stepList: [
        'License Agreement',
        'Communication setup',
        'Internal network scan',
        'Status Summarize',
        'Go To Dashboard',
      ],
      helpIconUrl: isDev
        ? './assets/images/help.png'
        : '../assets/images/help.png',
    }
  },
  computed: {
    ...mapGetters(['step']),
  },
  methods: {
    getIp: function () {
      GetIP()
    },
    installPackage: function () {
      InstallPackage()
    },
  },
  created() {
    const settingDone = localStorage.getItem('setting-done')
    if (settingDone) {
      this.$router.push('/home')
    }
  },
}
