const app = getApp() // eslint-disable-line

Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在personal-certificate][父main][linked]', target)
        this.setData({
          _main: target
        })
      },
      unlinked(target) {
        console.log('=xu=[在personal-certificate][父main][unlinked]', target)
      }
    }
  }
})
