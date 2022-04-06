const { GetIP } = require('../../../mac');

module.exports = {
  template: '#setup-page',
  data() {
    return {};
  },
  methods: {
    getIp: function () {
      GetIP();
    },
  },
};
