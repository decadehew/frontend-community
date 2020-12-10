<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'Login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observerForm" v-slot="{ validate }">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <validation-provider name="username" rules="required|email" v-slot="{ errors }">
                      <div class="layui-row">
                        <label for="L_email" class="layui-form-label">使用者名稱</label>
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
                        <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label">昵称</label>
                    <validation-provider name="name" rules="required|min:4|name" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="name"
                          placeholder="請輸入使用者昵称"
                          autocomplete="off"
                          class="layui-input"
                          v-model="name"
                        >
                    </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="password" rules="required|min:6|max:16|confirmed:confirmation" v-slot="{ errors }">
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label">密码</label>
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
                        <div class="layui-form-mid layui-word-aux">6 ~ 16</div>
                      </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <validation-provider vid="confirmation" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="confirmPassword"
                          autocomplete="off"
                          class="layui-input"
                          v-model="confirmPassword"
                        >
                      </div>
                      <div class="layui-form-mid">
                        <span class="errors">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="verifyCode" rules="required|length:4" v-slot="{ errors }">
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
                    >立即注册</button>
                  </div>
                  <!-- <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { getCode, registerApi } from '@/api/login'

export default {
  name: 'Register',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: 'hugo_lin@taogo.com.tw',
      password: '111111',
      confirmPassword: '111111',
      name: 'hugolin',
      verifyCode: '',
      svg: ''
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      const sid = this.$store.state.sid

      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
          this.verifyCode = res.testcode
        }
      })
    },
    async handleOnSubmit () {
      const isValid = await this.$refs.observerForm.validate()

      if (!isValid) return

      registerApi({
        username: this.username,
        name: this.name,
        password: this.password,
        verifyCode: this.verifyCode,
        sid: this.$store.state.sid
      })
        .then((res) => {
          if (res.code === 200) {
            this.username = ''
            this.password = ''
            this.repassword = ''
            this.name = ''
            this.code = ''
            requestAnimationFrame(() => {
              this.$refs.observerForm.reset()
            })
            // 如果用戶註冊成功
            this.$alert('註冊成功')
            setTimeout(() => {
              this.$router.push('/login')
            }, 1000)
          } else {
            this.$refs.observerForm.setErrors(res.msg)
          }
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
