module.exports = {
  template: '#scan-ip',
  data() {
    return {
      cameraList: [
        {
          ip: '192.168.1.1',
        },
        {
          ip: '192.168.1.2',
        },
        {
          ip: '192.168.1.3',
        },
        {
          ip: '192.168.1.4',
        },
        {
          ip: '192.168.1.5',
        },
        {
          ip: '192.168.1.6',
        },
        {
          ip: '192.168.1.7',
        },
      ],
      loading: true,
    }
  },
  methods: {
    nextStep() {
      return this.$store.commit({ type: 'nextStep' })
    },
  },
  mounted: function () {
    setTimeout(() => (this.loading = false), 1500)
  },
}
