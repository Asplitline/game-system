<template>
  <div class="add-post">
    <el-form :model="postForm" :rules="postRules" ref="postForm">
      <el-form-item prop="title">
        <el-input v-model="postForm.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="textContent">
        <mavon-editor style="min-height:700px" v-model="postForm.textContent"
          ref="md-editor" @imgAdd="handleEditorImgAdd" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="small" class="btn-submit"
          @click="submitPost('postForm')">提交
        </el-button>
      </el-form-item>
    </el-form>
    <p-back/>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import pBack from '@/components/common/Back'
import { markdownToHtml, bindURL } from '@utils'
import { _uploadFile, _addPost } from '@api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      postRules: {
        title: { required: true, message: '请填写文章标题', trigger: 'blur' },
        textContent: {
          required: true,
          message: '请填写文章内容',
          trigger: 'blur'
        }
      },
      postForm: {}
    }
  },
  methods: {
    // 图片上传
    async handleEditorImgAdd(pos, file) {
      const formData = new FormData()
      formData.append('files', file)
      const path = await _uploadFile(formData)
      this.$refs['md-editor'].$img2Url(pos, bindURL(path))
    },
    // 返回文章列表
    backToLast() {
      this.$router.push('/share')
    },
    // 提交文章
    submitPost(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { success } = await _addPost(this.handlePostForm())
        if (success) {
          this.$message.success('发布成功')
          this.backToLast()
        } else {
          this.$message.error('发布失败')
        }
      })
    },
    // 处理文章表单
    handlePostForm() {
      const htmlContent = markdownToHtml(this.postForm.textContent)
      return {
        authorId: this.currentUser.id,
        title: this.postForm.title,
        textContent: this.postForm.textContent,
        htmlContent,
        createTime: Date.now(),
        updateTime: Date.now(),
        id: Date.now() % 999999999
      }
    }
  },
  components: {
    mavonEditor,
    pBack
  },
  computed: {
    ...mapState(['currentUser'])
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
