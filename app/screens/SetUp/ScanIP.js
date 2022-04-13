const { GetIP } = require('../../../mac')

module.exports = {
  template: '#scan-ip',
  data() {
    return {
      cameraList: [],
      loading: false,
    }
  },
  methods: {
    nextStep() {
      return this.$store.commit({ type: 'nextStep' })
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
