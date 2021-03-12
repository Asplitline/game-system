<template>
  <div class="login">
    <div class="container">
      <div class="big-box" :class="{active:isActive}">
        <div class="login-box" v-if="!isActive">
          <h4>登录界面</h4>
          <input type="text" placeholder="账号">
          <input type="password" placeholder="密码">
          <div class="btns">
            <button class="btn-reset">重置</button>
            <button class="btn-login">登录</button>
          </div>
        </div>
        <div class="register-box" v-else>
          <h4>注册界面</h4>
          <input type="text" placeholder="账号">
          <input type="text" placeholder="用户名">
          <input type="password" placeholder="邮箱">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码">
          <div class="btns">
            <button class="btn-back">返回</button>
            <button class="btn-login">注册</button>
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
export default {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleLogin() {
      console.log(123)
      this.isActive = !this.isActive
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
      input {
        display: inline-block;
        width: 50%;
        height: 30px;
        padding-left: 20px;
        margin-bottom: 30px;
        outline: none;
        border: 1px solid #dfe1e5;
        &:focus {
          box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
          border-color: rgba(223, 225, 229, 0);
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
</style>
