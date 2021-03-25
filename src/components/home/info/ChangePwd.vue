<template>
  <div class="edit-password" v-else-if="activeIndex === 2">
    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" size="small"
      label-width="100px" :hide-required-asterisk="true">
      <el-form-item prop="oldPassword">
        <span slot="label"><i class="icon-lock iconfont"></i>旧密码</span>
        <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <span slot="label"><i class="icon-lock iconfont"></i>新密码</span>
        <el-input v-model="passwordForm.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span slot="label"><i class="icon-lock iconfont"></i>确认密码</span>
        <el-input v-model="passwordForm.confirmPassword" type="password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPwd()">修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    uid: {
      type: Number
    }
  },
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {},
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交修改
    submitPwd() {
      this.$refs.passwordForm.validate((valid) => {
        if (!valid) return
        this.$emit('submit-pwd', {
          id: this.uid,
          password: this.passwordForm.confirmPassword
        })
        this.$refs.passwordForm.resetFields()
      })
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.el-form-item {
  text-align: left;
}
</style>