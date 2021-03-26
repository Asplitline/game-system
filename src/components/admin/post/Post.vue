<template>
  <div class="post">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
        <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword" class="search-ipt"
            @keyup.enter.native="fetchPost()" :clearable="true" @clear="fetchPost()"
            @keyup.esc.native="clearIpt(fetchPost)"> <i slot="prefix"
              class="el-input__icon el-icon-search search-icon"></i></el-input>

        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-circle-plus-outline add-button" size="medium"
            @click="goPostAdd()">添加帖子
          </el-button>
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="filterPost" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" min-width="180">
        </el-table-column>
        <el-table-column prop="author" label="作者" min-width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="发帖时间" min-width="180">
          <template v-slot="{row}">
            {{row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="180">
          <template v-slot="{row}">
            {{row.updateTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column min-width="180" label="操作">
          <template v-slot="{row}">
            <el-button type="primary" size="small" @click="goPostEditById(row)">修改
            </el-button>
            <el-button type="success" size="small" @click="goPostDetailById(row)">详情
            </el-button>
            <el-button type="danger" size="small"
              @click="deleteById(_deletePost,fetchPost,row.id,'文章')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchPost,$event)"
        @current-change="handleCurrentChange(fetchPost,$event)"
        :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { _getPostList, _deletePost } from '@api'
import { mapActions, mapMutations, mapState } from 'vuex'
import { aMixin } from '@mixins'
export default {
  data() {
    return {
      postList: []
    }
  },
  methods: {
    ...mapActions(['fetchAllUser']),
    ...mapMutations(['setCurrentPost']),
    _deletePost,
    // 跳转到发布文章
    goPostAdd() {
      this.$router.push('/_dPost')
    },
    // 获取文章
    async fetchPost() {
      const { list, total } = await _getPostList(this.query)
      this.postList = list
      this.total = total
    },
    // 跳转到修改界面
    goPostEditById(data) {
      this.setCurrentPost(data)
      this.$router.push('/_dPost/' + data.id)
    },
    // 跳转到详情页面
    goPostDetailById(data) {
      this.setCurrentPost(data)
      this.$router.push('/share/' + data.id)
    }
  },
  computed: {
    ...mapState(['allUser']),
    // 添加作者字段
    filterPost() {
      return this.postList.filter((p) => {
        const user = this.allUser.find((item) => {
          return item.id === p.authorId
        })
        user && (p.author = user.name)
        return p
      })
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchPost()
    this.fetchAllUser()
    // this.test(this.query)
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
</style>
