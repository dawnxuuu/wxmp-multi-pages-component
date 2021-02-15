Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在download-app][父main][linked]', target)
        this.setData({_main: target})
      },
      unlinked(target) {
        console.log('=xu=[在download-app][父main][unlinked]', target)
      }
    }
  },

  methods: {
    navigateToNext() {
      this.data._main.loginSuccess({data: '注册登录成功'})
    }
  },
})
