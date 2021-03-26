<template>
  <div class="login">
    <div class="container">
      <div class="big-box" :class="{active:isActive}">
        <div class="login-box" v-if="!isActive">
          <h4>登录界面</h4>
          <div class="form-item">
            <input type="text" placeholder="账号" v-model="loginForm.username" v-focus>
            <transition name="fade">
              <span class="error" v-show="loginRules.username">请输入账号</span>
            </transition>
          </div>
          <div class="form-item">
            <input type="password" placeholder="密码" v-model="loginForm.password"
              @keyup.enter="login()">
            <transition name="fade">
              <span class="error" v-show="loginRules.password">请输入密码</span>
            </transition>
          </div>
          <div class="btns">
            <button class="btn-reset" @click="reset(loginForm,loginRules)">重置</button>
            <button class="btn-login" @click="login()">登录</button>
          </div>
        </div>
        <div class="register-box" v-else>
          <h4>注册界面</h4>
          <div class="form-item">
            <input type="text" placeholder="账号" v-model="registerForm.username">
            <transition name="fade">
              <span class="error" v-show="registerRules.username">请输入账号</span>
            </transition>
          </div>
          <div class="form-item">
            <input type="text" placeholder="用户名" v-model="registerForm.name">
            <transition name="fade">
              <span class="error" v-show="registerRules.name">请输入账号</span>
            </transition>
          </div>
          <div class="form-item">
            <input type="text" placeholder="手机号" v-model="registerForm.phone">
            <transition name="fade">
              <span class="error" v-show="registerRules.phone">请输入手机号码</span>
            </transition>
          </div>
          <div class="form-item">
            <input type="text" placeholder="邮箱" v-model="registerForm.email">
            <transition name="fade">
              <span class="error" v-show="registerRules.email">请输入邮箱</span>
            </transition>
          </div>
          <div class="form-item">
            <input type="text" placeholder="QQ" v-model="registerForm.qq">
            <transition name="fade">
              <span class="error" v-show="registerRules.qq">请输入QQ</span>
            </transition>
          </div>
          <div class="form-item">
            <input type="password" placeholder="密码" v-model="registerForm.password">
            <transition name="fade">
              <span class="error" v-show="registerRules.password">请输入密码</span>
            </transition>
          </div>
          <div class="btns">
            <button class="btn-back" @click="toggleLogin()">返回</button>
            <button class="btn-login" @click="register()">注册</button>
          </div>
        </div>
      </div>
      <div class="small-box" :class="{active:!isActive}">
        <div class="login-desc" v-if="!isActive">
          <span>你好</span>
          <p>还没有用户吗 ? 请先<strong>注册</strong>。</p>
          <a href="javascript:;" @click="toggleLogin()">注册</a>
        </div>
        <div class="register-desc" v-else>
          <span>欢迎回来</span>
          <p><strong>登录</strong>你的账号，尽情体验。</p>
          <a href="javascript:;" @click="toggleLogin()">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _login, _register } from '@api'
import { convertParams } from '@utils'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isActive: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: false,
        password: false
      },
      registerForm: {
        username: '',
        name: '',
        phone: '',
        email: '',
        qq: '',
        password: ''
      },
      registerRules: {
        username: '',
        name: '',
        email: '',
        phone: '',
        qq: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    // 转换登录
    toggleLogin() {
      this.isActive = !this.isActive
    },
    // 自定义验证
    validate(form, rules) {
      let flag = true
      if (Object.keys(form).length) {
        for (const key in form) {
          const val = form[key].trim()
          if (val.length === 0) {
            rules[key] = true
            flag = false
          } else {
            form[key] = val
            rules[key] = false
          }
        }
        return flag
      } else {
        for (const key in rules) {
          rules[key] = true
        }
        return false
      }
    },
    // 登录
    async login() {
      if (this.validate(this.loginForm, this.loginRules)) {
        const { success, data } = await _login(convertParams(this.loginForm))
        if (success) {
          this.$message.success('登录成功')
          this.setCurrentUser(data)
          if (data.level === 1 || data.level === 2) {
            this.$router.push('/admin')
          } else {
            this.$router.push('/home')
          }
        } else {
          this.$message.error('账号或密码错误')
        }
      } else {
        return
      }
    },
    // 重置
    reset(form, rules) {
      for (const key in rules) {
        rules[key] = false
        form[key] = ''
      }
    },
    // 注册
    async register() {
      if (this.validate(this.registerForm, this.registerRules)) {
        const form = Object.assign(
          {},
          {
            state: 0,
            level: 0,
            avatarImgUrl: 'headimg_placeholder.png',
            createTime: Date.now(),
            updateTime: Date.now(),
            id: Date.now() % 999999999
          },
          this.registerForm
        )
        const { success, message } = await _register(form)
        if (success) {
          this.$message.success('注册成功')
          this.reset(this.registerForm, this.registerRules)
          this.isActive = false
        } else {
          this.$message.error(message)
        }
      } else {
        return
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/variables.less';

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  .container {
    position: relative;
    width: 800px;
    height: 500px;
    background-color: #fff;
    border-radius: 20px;
    .big-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 70%;
      height: 100%;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      transition: all 1s;

      &.active {
        left: 30%;
        transition: all 1s;
      }
    }
    .small-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 30%;
      height: 100%;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      background: linear-gradient(90deg, #11998e, #38ef7d);
      transition: all 1s;
      &.active {
        left: 70%;
        transition: all 0.5s;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
      }
    }
  }

  .big-box {
    div[class$='-box'] {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;
      height: 100%;
      h4 {
        width: 51%;
        font-size: 24px;
        font-weight: normal;
        letter-spacing: 2px;
        margin-top: 0;
      }
      .form-item {
        width: 51%;
        position: relative;
        input {
          display: inline-block;
          width: calc(100% - 20px);
          height: 30px;
          margin-bottom: 30px;
          padding-left: 20px;
          outline: none;
          border: 1px solid #dfe1e5;
          &:focus {
            box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
            border-color: rgba(223, 225, 229, 0);
          }
        }
        .error {
          position: absolute;
          bottom: 8px;
          left: 20px;
          color: #f56c6c;
          font-size: 12px;
        }
      }
      .btns {
        width: 51%;
        // margin: 0 auto;
        button[class^='btn-'] {
          width: 30%;
          height: 30px;
          margin-left: 20px;
          background-color: transparent;
          border: 1px solid #dfe1e5;
          outline: none;
          transition: all 0.5s cubic-bezier(0.39, 0.575, 0.565, 1);
          letter-spacing: 2px;
          border-radius: 4px;
          cursor: pointer;
          &:active {
            transform: scale(1.02);
          }
          &:hover {
            background-color: #909399;
            color: #fff;
          }

          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }
  }

  .small-box {
    div[class$='-desc'] {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 18px;
      span {
        font-size: 24px;
        font-weight: 400;
      }
      p {
        margin: 24px 0;
        font-size: 14px;
        strong {
          font-size: larger;
          font-weight: normal;
        }
      }
      a {
        display: inline-block;
        border: 1px solid #fff;
        padding: 8px 18px;
        color: inherit;
        transition: all 0.2s ease-out;
        border-radius: 2px;
        font-size: 14px;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
