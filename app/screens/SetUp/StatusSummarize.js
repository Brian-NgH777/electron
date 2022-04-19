module.exports = {
  template: '#status-summarize',
  data() {
    return {}
  },
  methods: {
    nextStep() {
      this.$store.commit({ type: 'nextStep' })
      return this.$router.push('/home')
    },
    backStep() {
      return this.$store.commit({ type: 'backStep' })
    },
  },
}
