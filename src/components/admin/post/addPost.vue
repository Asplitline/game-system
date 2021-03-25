<template>
  <div class="addPost">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/_post'}">帖子管理</el-breadcrumb-item>
        <el-breadcrumb-item>
          <template v-if="id">
            修改帖子
          </template>
          <template v-else>
            发布帖子
          </template>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入文章标题" v-model="postData.title">
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <template v-if="id">
            <el-button class="el-icon-edit-outline add-button" size="medium"
              @click="submitPost(1)">
              修改帖子
            </el-button>
          </template>
          <template v-else>
            <el-button class="el-icon-edit-outline add-button" size="medium"
              @click="submitPost(0)">
              发布帖子
            </el-button>
          </template>
        </el-col>
      </el-row>
      <mavon-editor v-model="postData.textContent" ref="md-editor"
        style="min-height:560px" @imgAdd="handleEditorImgAdd"></mavon-editor>
    </el-card>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { markdownToHtml, bindURL } from '@utils'
import { _uploadFile, _addPost, _editPost } from '@api'
import { mapState } from 'vuex'

const ADD = 0
const EDIT = 1

export default {
  props: {
    id: String
  },
  data() {
    return {
      postData: {
        textContent: '',
        htmlContent: '',
        title: ''
      }
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    // 提交添加添加文章
    async submitPost(flag) {
      if (!this.validatePost()) {
        return
      }
      this.postData.htmlContent = markdownToHtml(this.postData.textContent)
      this.postData.authorId = this.currentUser.id
      if (flag === EDIT) {
        this.postData.updateTime = Date.now()
        const { success } = await _editPost(this.postData)
        if (success) {
          this.$message.success('修改成功')
          this.$router.push('/_post')
        } else {
          this.$message.error('修改失败')
        }
      } else if (flag === ADD) {
        const { success } = await _addPost(this.postData)
        if (success) {
          this.$message.success('发布成功')
          this.$router.push('/_post')
        } else {
          this.$message.error('发布失败')
        }
      }
    },
    // 文章上传
    async handleEditorImgAdd(pos, $file) {
      const formdata = new FormData()
      formdata.append('files', $file)
      const path = await _uploadFile(formdata)
      this.$refs['md-editor'].$img2Url(pos, bindURL(path))
    },
    // 文章验证
    validatePost() {
      if (this.postData.title.length === 0) {
        this.$message.error('请输入文章标题')
        return false
      }
      if (this.postData.textContent.length === 0) {
        this.$message.error('请输入文章内容')
        return false
      }
      return true
    }
  },
  computed: {
    ...mapState(['currentUser', 'currentPost'])
  },
  created() {
    if (this.id) {
      this.postData = this.currentPost
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
.addPost {
  .top-search .add-button {
    background-color: @btn-red;
    &:hover {
      box-shadow: 1px 1px 1px 1px @btn-shadow-red;
    }
  }
}
</style>
