/**
 * 通用的全局状态
 */
const hash = require('../util/md5.js')

module.exports = Behavior({
  lifetimes: {
    created() {
      if (!wx.getStorageSync('login_deviceId')) {
        wx.getSystemInfo({
          success(res) {
            const deviceId = hash.md5(
              res.model +
              res.pixelRatio +
              res.windowWidth +
              res.windowHeight +
              res.language +
              res.version +
              res.platform +
              Date()
            )
            wx.setStorageSync('login_deviceId', deviceId)
          }
        })
      }
    },

    attached() {
      this.setData({'globalState.deviceId': wx.getStorageSync('login_deviceId')})
    }
  },

  data: {
    globalState: {
      deviceId: '',
      at: '',
      rt: ''
    }
  },

  methods: {
    setToken({at = '', rt = ''} = {}) {
      this.setData({
        'globalState.at': at,
        'globalState.rt': rt
      })
      wx.setStorageSync('login_at', at)
      wx.setStorageSync('login_rt', rt)
    }
  }
})
