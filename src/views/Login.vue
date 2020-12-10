<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name: 'Register'}">註冊</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observerForm" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">使用者名稱</label>
                    <validation-provider name="email" rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="username"
                          placeholder="請輸入使用者名稱"
                          autocomplete="off"
                          class="layui-input"
                          v-model="username"
                        >
                      </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <validation-provider name="password" rules="required|min:6" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          placeholder="請輸入密碼"
                          autocomplete="off"
                          class="layui-input"
                          v-model="password"
                        >
                      </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="verifyCode" ref="codeField" rules="required|length:4" v-slot="{ errors }">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">驗證碼</label>
                          <div class="layui-input-inline">
                            <input
                              type="text"
                              name="verifyCode"
                              placeholder="請輸入驗證碼"
                              autocomplete="off"
                              class="layui-input"
                              v-model="verifyCode"
                            >
                          </div>
                          <div class>
                            <span class="svg" style="color: #c00;" @click="getCaptcha()" v-html="svg"></span>
                          </div>
                      </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button
                      class="layui-btn"
                      type="button"
                      @click="validate().then(handleOnSubmit)"
                    >立即登入</button>
                    <span style="padding-left:20px;">
                      <router-link :to="{name: 'Forget'}">忘記密碼</router-link>
                    </span>
                  </div>
                  <!-- <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                    <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
                  </div> -->
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, loginApi } from '@/api/login'
import { v4 as uuid } from 'uuid'

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      verifyCode: '',
      svg: ''
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }

    this.$store.commit('setSid', sid)
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      const sid = this.$store.state.sid

      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
          // testing
          this.username = 'yong_hew@taogo.com.tw'
          this.password = '111111'
          this.verifyCode = res.testcode
        }
      })
    },
    async handleOnSubmit () {
      const isValid = await this.$refs.observerForm.validate()

      if (!isValid) return

      loginApi({
        username: this.username,
        password: this.password,
        verifyCode: this.verifyCode,
        sid: this.$store.state.sid
      })
        .then((res) => {
          if (res.code === 200) {
            this.username = ''
            this.password = ''
            this.verifyCode = ''
            requestAnimationFrame(() => {
              this.$refs.observerForm.reset()
            })
            console.log(res)
          } else if (res.code === 401) {
            this.$refs.codeField.setErrors([res.msg])
          } else if (res.code === 404) {
            this.$alert('用戶名密碼不正確')
          }
        })
        .catch((err) => {
          console.log(err)
          const data = err.response.data
          if (data.code === 500) {
            this.$alert('用戶名不存在')
          } else {
            this.$alert('server 掛了')
          }
          console.log(err.response)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.svg {
  position: relative;
  top: -4px;
  &:hover {
    cursor: pointer;
  }
}
</style>
