<template>
  <div class="category">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-circle-plus-outline add-button" size="medium">添加分类
          </el-button>
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="gameList" stripe style="width: 100%">
        <el-table-column prop="date" label="游戏类型" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="描述" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="添加时间" min-width="180">
        </el-table-column>
        <el-table-column prop="name" label="更新时间" min-width="180">
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="180">
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
      gameList: [{}]
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
</style>
