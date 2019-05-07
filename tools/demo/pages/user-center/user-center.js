// pages/user-center/user-center.js
Page({
  data: {
    logoutEmitter: false
  },

  logoutButton() {
    this.setData({
      logoutEmitter: true
    })

    console.log('=xu=点击退出')
  },

  logoutSuccess() {
    console.log('=xu= 用户已退出')
    this.setData({logoutEmitter: false})
  },

  logoutFail() {
    console.log('=xu= 用户退出失败')
    this.setData({logoutEmitter: false})
  },

  loginSuccess() {
    console.log('=xu= 登录成功')
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  bindShowList() {
    console.log('=xu= 点击显示认证页')
    this.selectComponent('#loginComp').showCertificateList()
  }
})
