/* eslint prefer-promise-reject-errors:0 */

Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在bind-account][父main][linked]', target)
        this.setData({_main: target})
      },
      unlinked(target) {
        console.log('=xu=[在bind-account][父main][unlinked]', target)
      }
    }
  }
})
