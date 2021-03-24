<template>
  <div class="add-post">
    <el-form :model="postForm" :rules="postRules" ref="postForm">
      <el-form-item prop="title">
        <el-input v-model="postForm.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="value">
        <mavon-editor style="min-height:700px" v-model="postForm.value" ref="md-editor"
          @imgAdd="handleEditorImgAdd()" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" class="btn-submit"
          @click="submitPost('postForm')">提交
        </el-button>
      </el-form-item>
    </el-form>
    <p-back @back="backToLast()" />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import pBack from '@/components/common/Back'
import { markdownToHtml, htmlToText } from '@utils'
export default {
  data() {
    return {
      postRules: {
        title: { required: true, message: '请填写文章标题', trigger: 'blur' },
        value: { required: true, message: '请填写文章内容', trigger: 'blur' }
      },
      postForm: {}
    }
  },
  methods: {
    handleEditorImgAdd() {},
    backToLast() {
      this.$router.push('/share')
    },
    submitPost(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        const { title, value } = this.postForm
        const htmlContent = markdownToHtml(value)
        const textContent = htmlToText(value)
        const post = {
          title,
          htmlContent,
          textContent,
          createTime: Date.now(),
          updateTime: Date.now(),
          id: Date.now() % 999999999
        }
        console.log(post)
      })
    }
  },
  components: {
    mavonEditor,
    pBack
  }
}
</script>

<style lang="less" scoped>
.add-post {
  padding-right: 100px;
  position: relative;
  .p-back {
    position: absolute;
    right: 30px;
    top: 0;
  }
  .btn-submit {
    margin-top: -10px;
    float: right;
  }
}
/deep/.el-input__inner:focus {
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.5);
}
</style>