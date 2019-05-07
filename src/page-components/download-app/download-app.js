Component({
  relations: {
    '../../main/main': {
      type: 'ancestor',
      linked(target) {
        console.log('=xu=[在download-app][父main][linked]', target)
      },
      unlinked(target) {
        console.log('=xu=[在download-app][父main][unlinked]', target)
      }
    }
  }
})
