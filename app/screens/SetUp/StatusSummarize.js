module.exports = {
  template: '#status-summarize',
  data() {
    return {}
  },
  methods: {
    nextStep() {
      this.$store.commit({ type: 'nextStep' })
      localStorage.setItem('setting-done', true)
      return this.$router.push('/home')
    },
  },
}
