// 不同环境下的接口URL，与main共用
const env = require('./behaviors/env.js')

Component({
  behaviors: [env],

  properties: {
    navigationBarTitleText: {
      type: String,
      value: ''
    },
    logoutEmitter: {
      type: Boolean,
      value: false
    }
  },

  data: {
    componentVisible: {
      main: true, // main 组件
      bindPhone: false, // 页面1
      createAccount: false, // 页面2
      bindAccount: false, // 页面3
      certificateList: false, // 页面4
      personalCertificate: false, // 页面5
      companyCertificate: false, // 页面6
      downloadApp: false, // 页面7
      hostPage: false, // 页面8
    }
  },

  methods: {
    // main组件触发该事件，用于将组件可见性状态传递给index，从而控制各页面组件显示隐藏
    setComponentVisible(e) {
      this.setData({
        componentVisible: e.detail.value
      })
    },

    // 父组件直接调用以显示认证页
    showCertificateList() {
      this.selectComponent('#main-comp').showComponentPage('certificateList')
    },

    mainLoginSuccess(e) {
      // 触发用户的登录成功回调
      this.triggerEvent('loginSuccess', {value: e.detail.value})
    },


    mainLogoutSuccess() {
      // 触发用户的解绑退出成功回调
      this.triggerEvent('logoutSuccess')
    }
  }
})
