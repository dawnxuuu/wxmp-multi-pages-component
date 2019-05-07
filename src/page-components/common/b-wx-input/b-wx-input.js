Component({
  behaviors: ['wx://form-field'],

  lifetimes: {
    attached() {
      if (this.data.passwordIcon && !this.data.password) throw new Error('若要设置 passwordIcon = true，必须 password = true')

      this.setData({
        'init.clearIcon': this.data.clearIcon,
        'init.password': this.data.password,
        'init.passwordIcon': this.data.passwordIcon,
        clearIcon: false,
        passwordIcon: false
      })
    }
  },

  properties: {
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    password: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: 140
    },
    'cursor-spacing': {
      type: Number,
      value: 0
    },
    focus: {
      type: Boolean,
      value: false
    },
    'confirm-type': {
      type: String,
      value: 'done'
    },
    'confirm-hold': {
      type: Boolean,
      value: false
    },
    'adjust-position': {
      type: Boolean,
      value: true
    },

    clearIcon: {
      type: Boolean,
      value: true
    },
    passwordIcon: {
      type: Boolean,
      value: false
    }
  },

  data: {
    value: '',
    init: {
      password: '',
      passwordIcon: '',
      clearIcon: ''
    },
    passwordIconSrc: './images/pwd-hide.png',
    forbidInput: false
  },

  methods: {
    bindInput(e) {
      if (this.data.forbidInput) {
        this.setData({forbidInput: false})
        return
      }

      // 清空按钮和密码可见按钮
      if (e.detail.value) {
        if (this.data.init.clearIcon) this.setData({clearIcon: true})
        if (this.data.init.passwordIcon) this.setData({passwordIcon: true})
      } else {
        this.setData({clearIcon: false, passwordIcon: false})
      }

      this.triggerEvent('input', e.detail)
      this.setData({value: e.detail.value})
    },
    bindFocus(e) {
      this.setData({forbidInput: false})
      if (e.detail.value) {
        if (this.data.init.clearIcon) this.setData({clearIcon: true})
        if (this.data.init.passwordIcon) this.setData({passwordIcon: true})
      }

      this.triggerEvent('focus', e.detail)
    },
    bindBlur(e) {
      this.setData({forbidInput: true, clearIcon: false})
      this.triggerEvent('blur', e.detail)
    },
    bindConfirm(e) {
      this.triggerEvent('confirm', e.detail)
    },
    bindClearIconTap() {
      this.setData({
        clearIcon: false,
        passwordIcon: false,
        forbidInput: true,
        value: ''
      })
      this.triggerEvent('clear')
    },
    bindPasswordIconTap() {
      const hide = './images/pwd-hide.png'
      const show = './images/pwd-show.png'

      if (this.data.passwordIconSrc === hide) this.setData({passwordIconSrc: show, password: false})
      else this.setData({passwordIconSrc: hide, password: true})
    }
  }
})
