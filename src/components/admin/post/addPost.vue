<template>
  <div class="addPost">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加帖子</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入文章标题" v-model="postData.title">
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-edit-outline add-button" size="medium"
            @click="submitPost()">发布文章
          </el-button>
        </el-col>
      </el-row>
      <mavon-editor v-model="postData.value" style="min-height:560px"></mavon-editor>
    </el-card>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import marked from 'marked'
import 'mavon-editor/dist/css/index.css'

export default {
  data() {
    return {
      postData: {
        value: '',
        html: '',
        title: ''
      }
    }
  },
  components: {
    mavonEditor
  },
  methods: {
    submitPost() {
      this.postData.html = marked(this.postData.value)
      console.log(this.postData)
    }
  },
  created() {}
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
