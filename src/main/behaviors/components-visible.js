/**
 * 控制子组件显示与隐藏
 */
module.exports = Behavior({
  properties: {
    navigationBarTitleText: {
      type: String,
      value: ''
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
    showComponentPage(page) {
      if (Object.keys(this.data.componentVisible).indexOf(page) === -1) throw new Error(`调用showComponentPage参数错误：${page}`)
      const _default = {
        'componentVisible.hostPage': false,
        'componentVisible.main': true,
        'componentVisible.bindPhone': false,
        'componentVisible.createAccount': false,
        'componentVisible.bindAccount': false,
        'componentVisible.certificateList': false,
        'componentVisible.personalCertificate': false,
        'componentVisible.companyCertificate': false,
        'componentVisible.downloadApp': false
      }


      this.setData(Object.assign(_default, {[`componentVisible.${page}`]: true}))


      const barTitleMap = {
        hostPage: this.data.navigationBarTitleText,
        bindPhone: '绑定手机号',
        createAccount: '创建账号',
        bindAccount: '绑定已有账号',
        certificateList: '认证列表',
        personalCertificate: '个人认证',
        companyCertificate: '公司认证',
        downloadApp: '下载app'
      }

      // 重置导航栏标题
      wx.setNavigationBarTitle({
        title: barTitleMap[page]
      })

      // 将控制组件页显示的属性传给index页面
      this.triggerEvent('setComponentVisible', {value: this.data.componentVisible})
    }
  }
})
