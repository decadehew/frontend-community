import { extend, localize } from 'vee-validate'
// eslint-disable-next-line
import { required, email, min, length, confirmed, max, is_not } from 'vee-validate/dist/rules'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'

extend('email', email)
extend('min', min)
extend('required', required)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)
extend('is_not', is_not)

extend('name', {
  validate (value, args) {
    return !(/^\d+/).test(value)
  },
  message: '不能以純數字為名稱'
})

localize('zh_TW', {
  messages: {
    ...zhTW.messages,
    required: '請輸入{_field_}'
  },
  names: {
    email: '郵箱',
    password: '密碼',
    confirmPassword: '確認密碼',
    oldpassword: '旧密码',
    name: '昵称',
    username: '帳號',
    verifyCode: '驗證碼',
    title: '标题',
    catalog: '分类'
  },
  fields: {
    email: {
      email: '請輸入正確{_field_}',
      required: '請輸入{_field_}'
    },
    name: {
      min: (field, { length }) => {
        return `請在${field}輸入至少${length}個字串`
      }
    },
    password: {
      min: (field, { length }) => {
        return `${field}不能小於${length}個字元`
      },
      confirmed: (field, { target }) => {
        return `两次輸入的${field}不一致！`
      }
    },
    verifyCode: {
      length: (field, { length }) => {
        return `${field}的長度須為${length}`
      }
    }
  }
})
