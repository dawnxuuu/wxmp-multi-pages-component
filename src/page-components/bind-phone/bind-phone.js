Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在bind-phone][父main][linked]', target)
        this.setData({_main: target})
      },
      unlinked(target) {
        console.log('=xu=[在bind-phone][父main][unlinked]', target)
      }
    }
  },

  methods: {
    navigateToNext() {
      this.data._main.showComponentPage('createAccount')
    }
  },
})
