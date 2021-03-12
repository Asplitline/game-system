<template>
  <div class="user">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword" class="search-ipt"
            @keypress.enter.native="fetchUser()" :clearable="true" @clear="fetchUser()">
            <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
        </el-col>
      </el-row>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="avatarImgUrl" label="头像" width="180">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
          </el-avatar>
        </el-table-column>
        <el-table-column prop="username" label="账号" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="用户名" min-width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机" min-width="180">
        </el-table-column>
        <el-table-column prop="qq" label="QQ" min-width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180">
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="warning" size="small">重置</el-button>
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
import { getUserList } from '@api'
export default {
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      userList: [{}],
      total: 10
    }
  },
  methods: {
    handleSizeChange(size) {
      this.query.size = size
      this.fetchUser()
    },
    handleCurrentChange(current) {
      this.query.page = current
      this.fetchUser()
    },
    async fetchUser() {
      const { list, total } = await getUserList(this.query)
      this.userList = list
      this.total = total
    },
    clearIpt() {
      console.log(123)
      this.query.keyword = null
      this.fetchUser()
    }
  },
  created() {
    this.fetchUser()
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
.top-search {
  /deep/.el-input__inner {
    border-radius: 20px;
  }
  //   position: relative;
  //   .search-ipt {
  //     .search-btn {
  //       position: absolute;
  //       top: 50%;
  //       right: -40px;
  //       transform: translate(0, -50%);
  //       font-size: 20px;
  //       opacity: 0;
  //       border: 1px solid #ccc;
  //       border-radius: 50%;
  //       padding: 6px;
  //       transition: all 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  //       cursor: pointer;
  //     }
  //   }
}
</style>
