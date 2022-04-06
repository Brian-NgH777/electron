module.exports = {
  template: '#login-page',
  data() {
    return {
      title: 'Sign in to your account',
    };
  },
  methods: {
    login: function () {
      this.$router.push('/logged');
    },
  },
};
