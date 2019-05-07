/* eslint prefer-promise-reject-errors:0 */

Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在create-account][父main][linked]', target)
        this.setData({
          _main: target
        })
      },
      unlinked(target) {
        console.log('=xu=[在create-account][父main][unlinked]', target)
      }
    }
  },

  methods: {
    // 切换页面
    bindSwitchPage(e) {
      this.setData({
        showMainPage: false,
        showCompanyPage: false,
        [e.currentTarget.id]: true
      })

      const barTitleMap = {
        showCompanyPage: '填写公司'
      }

      wx.setNavigationBarTitle({
        title: barTitleMap[e.currentTarget.id]
      })
    },

    // 显示主页面
    commonShowMainPage() {
      this.setData({
        showMainPage: true,
        showCompanyPage: false
      })
      wx.setNavigationBarTitle({
        title: '完善信息'
      })
    },
  }
})
