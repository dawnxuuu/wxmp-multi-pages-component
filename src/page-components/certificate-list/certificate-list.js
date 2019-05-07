/* eslint complexity: ["error", 50] */

const app = getApp() // eslint-disable-line

Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在certificate-list][父main][linked]', target)
        this.setData({_main: target})
      },
      unlinked(target) {
        console.log('=xu=[在certificate-list][父main][unlinked]', target)
      }
    }
  }
})
