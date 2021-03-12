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
          <el-input placeholder="请输入内容" v-model="query.keyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-circle-plus-outline add-button" size="medium"
            @click="goPostAdd()">添加帖子
          </el-button>
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="postList" stripe style="width: 100%">
        <el-table-column prop="date" label="标题" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="作者" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="发帖时间" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="更新时间" min-width="180">
        </el-table-column>
        <el-table-column min-width="180" label="操作">
          <el-button type="primary" size="small">修改</el-button>
          <el-button type="success" size="small">详情</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      total: 10,
      postList: [{}]
    }
  },
  methods: {
    handleSizeChange(size) {
      this.query.size = size
    },
    handleCurrentChange(current) {
      this.query.page = current
    },
    goPostAdd() {
      console.log(123)
      this.$router.push('/_addPost')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
</style>
