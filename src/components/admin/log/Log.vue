<template>
  <div class="log">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
        <el-breadcrumb-item>日志列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <!-- <el-button class="el-icon-circle-plus-outline add-button" size="medium">添加游戏
          </el-button> -->
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="logList" stripe style="width: 100%">
        <el-table-column prop="date" label="日志内容" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="日志类型" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="操作地址" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="操作时间" min-width="180">
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="180">
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
      logList: [{}]
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/css/common.css';
</style>
