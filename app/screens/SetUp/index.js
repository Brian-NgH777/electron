const { mapGetters } = require('vuex');
const { GetIP, InstallPackage } = require('../../../mac');
const Agreement = require('./Agreement');
const FRPConfig = require('./FRPConfig');
const ScanIp = require('./ScanIP');
const StatusSummarize = require('./StatusSummarize.js');

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
        'FRP Config',
        'IP Scan',
        'Status Summarize',
        'Go To Dashboard',
      ],
    };
  },
  computed: {
    ...mapGetters(['step']),
  },
  methods: {
    getIp: function () {
      GetIP();
    },
    installPackage: function () {
      InstallPackage();
    },
  },
  created() {
    const settingDone = localStorage.getItem('setting-done');
    if (settingDone) {
      this.$router.push('/home');
    }
  },
};
