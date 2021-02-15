// 不同环境下的接口URL
const env = require('../behaviors/env.js')
// 通用的全局状态
const globalState = require('./behaviors/global-state.js')
// 控制子组件显示与隐藏
const componentsVisible = require('./behaviors/components-visible.js')
// 微信登录注册主逻辑
const loginMain = require('./behaviors/login-main.js')

const app = getApp() // eslint-disable-line

Component({
  options: {
    multipleSlots: true
  },

  behaviors: [
    env,
    globalState,
    componentsVisible,
    loginMain
  ],

  lifetimes: {
    attached() {
      // 控制是否执行登录
      if (app.loggedIn === true) {
        this.showComponentPage('hostPage')
        return
      }

      this.loginMain()
    }
  },

  relations: {
    '../page-components/bind-phone/bind-phone': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[主main][子bind-phone][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[主main][子bind-phone][unlinked]', target)
      }
    },
    '../page-components/create-account/create-account': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[main][create-account][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[main][create-account][unlinked]', target)
      }
    },
    '../page-components/bind-account/bind-account': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[主main][子bind-account][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[主main][子bind-account][unlinked]', target)
      }
    },
    '../page-components/certificate-list/certificate-list': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[主main][子certificate-list][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[主main][子certificate-list][unlinked]', target)
      }
    },
    '../page-components/personal-certificate/personal-certificate': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[主main][子personal-certificate][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[主main][子personal-certificate][unlinked]', target)
      }
    },
    '../page-components/company-certificate/company-certificate': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[主main][子company-certificate][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[主main][子company-certificate][unlinked]', target)
      }
    },
    '../page-components/download-app/download-app': {
      type: 'descendant',
      linked(target) {
        console.log('=xu=[主main][子download-app][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[主main][子download-app][unlinked]', target)
      }
    }
  },

  properties: {
    logoutEmitter: {
      type: Boolean,
      default: false,
      observer(newVal) {
        if (newVal === true) this.mainLogout()
      }
    }
  },

  methods: {
    loginSuccess(res) {
      app.loggedIn = true

      wx.showTabBar()
      this.triggerEvent('mainLoginSuccess', {value: res})
      this.showComponentPage('hostPage')
    },

    logoutSuccess() {
      app.loggedIn = false
      this.triggerEvent('mainLogoutSuccess')
    },
  }
})
