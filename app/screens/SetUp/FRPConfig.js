const notifier = require('node-notifier');
const path = require('path');

module.exports = {
  template: '#frp-config',
  data() {
    return {
      connected: false,
    };
  },
  methods: {
    showNoti() {
      notifier.notify({
        title: 'Connect FRP',
        message: 'Connect successfully!',
      });
    },
    nextStep() {
      return this.$store.commit({ type: 'nextStep' });
    },
    connect() {
      this.connected = true;
      this.showNoti();
    },
  },
};
