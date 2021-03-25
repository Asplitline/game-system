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
          <el-input placeholder="请输入内容" v-model="query.keyword" class="search-ipt"
            @keyup.enter.native="fetchLog()" :clearable="true" @clear="fetchLog()"
            @keyup.esc.native="clearIpt(fetchLog)">
            <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="logList" stripe style="width: 100%">
        <el-table-column prop="description" label="日志内容" min-width="180">
        </el-table-column>
        <el-table-column prop="lx" label="日志类型" min-width="180">
          <template v-slot="{row}">
            <el-tag :type="logName[row.lx].type" v-if="logName[row.lx]">
              {{logName[row.lx].name}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="操作地址" min-width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" min-width="180">
          <template v-slot="{row}">
            {{row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="{row}">
            <el-button type="danger" size="small"
              @click="deleteById(_deleteLog,fetchLog,row.id,'日志')">
              删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchLog,$event)"
        @current-change="handleCurrentChange(fetchLog,$event)" :page-sizes="[1, 2, 5, 10]"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { _getLogList, _deleteLog } from '@api'
import { aMixin } from '@mixins'
export default {
  data() {
    return {
      logList: [{}],
      logName: [
        {},
        { name: '操作日志', type: 'primary' },
        { name: '登录日志', type: 'danger' }
      ]
    }
  },
  methods: {
    _deleteLog,
    async fetchLog() {
      const { list, total } = await _getLogList(this.query)
      this.logList = list
      this.total = total
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchLog()
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/css/common.less';
</style>
