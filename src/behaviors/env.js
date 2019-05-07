/**
 * 定义不同环境下的接口URL
 * 使用 this.data.url.passport
 */
module.exports = Behavior({
  lifetimes: {
    attached() {
      const url = {
        local: {
          apiOne: 'https://www.baidu.com/',
          apiTwo: 'https://www.google.com/'
        },
        pre: {
          apiOne: 'https://www.baidu.com/',
          apiTwo: 'https://www.google.com/'
        },
        production: {
          apiOne: 'https://www.baidu.com/',
          apiTwo: 'https://www.google.com/'
        }
      }

      this.setData({
        url: url[this.data.env]
      })
    }
  },

  data: {
    url: {}
  },

  properties: {
    env: {
      type: String,
      value: 'production'
    }
  }
})
