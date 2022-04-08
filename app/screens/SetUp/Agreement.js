module.exports = {
  template: '#agreement',
  props: ['step'],
  data() {
    return { lorems: 8, isBottom: false, agreementAreaRef: null }
  },
  methods: {
    scrolled() {
      if (this.agreementAreaRef) {
        if (
          this.agreementAreaRef.offsetHeight +
            this.agreementAreaRef.scrollTop >=
          this.agreementAreaRef.scrollHeight
        ) {
          this.isBottom = true
        }
      }
    },
    nextStep() {
      return this.$store.commit({ type: 'nextStep' })
    },
  },
  mounted: function () {
    const agreementArea = document.getElementById('agreement-area')
    if (agreementArea) {
      this.agreementAreaRef = agreementArea
      agreementArea.addEventListener('scroll', this.scrolled)
    }
  },
  destroyed: function () {
    this.agreementAreaRef.removeEventListener('scroll', this.scrolled)
  },
}
