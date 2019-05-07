/**
 * 微信登录注册主逻辑
 */
module.exports = Behavior({
  methods: {
    loginMain() {
      const that = this

      wx.login({
        success(res) {
          if (res.code) {
            console.log('=xu= code', res.code)
            that.loginSuccess({data: '成功'})
          } else {
            that.mainErrorModal({netError: true})
          }
        },
        fail(res) {
          console.log('微信登录出错', res) // eslint-disable-line
          that.mainErrorModal({netError: true})
        }
      })
    },

    mainLogout() {
      console.log('=xu= 退出')
      this.logoutSuccess()
    },

    mainErrorModal({netError, msg = '出现异常！可稍候再试...'} = {}) {
      if (netError) {
        wx.showToast({
          title: '网络开小差啦~',
          image: './img/userCenter/cry.png',
          duration: 3000,
          mask: true
        })
      } else {
        wx.showModal({
          title: '提示',
          content: msg,
          confirmText: '知道了',
          confirmColor: '#446DFF',
          showCancel: false
        })
      }
    }
  }
})
