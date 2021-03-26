<template>
  <div class="categoryDialogVisible">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword" class="search-ipt"
            @keyup.enter.native="fetchCategory()" :clearable="true"
            @clear="fetchCategory()" @keyup.esc.native="clearIpt(fetchCategory)">
            <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-circle-plus-outline add-button" size="medium"
            @click="showCategoryDialog(0)">添加分类
          </el-button>
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="categoryList" stripe style="width: 100%">
        <el-table-column prop="name" label="游戏类型" min-width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" min-width="180">
          <template v-slot="{row}">
            {{row.createTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="180">
          <template v-slot="{row}">
            {{row.updateTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="{row}">
            <el-button type="primary" size="small" @click="showCategoryDialog(1,row)">修改
            </el-button>
            <el-button type="danger" size="small"
              @click="deleteById(_deleteCategory,fetchCategory,row.id,'分类')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchCategory,$event)"
        @current-change="handleCurrentChange(fetchCategory,$event)"
        :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 分类对话框 -->
    <el-dialog :title="categoryForm.flag === 0?'添加类型':'修改类型'"
      :visible.sync="categoryDialogVisible" width="30%"
      @close="clearDialog('categoryForm')">
      <el-form :model="categoryForm" :rules="categoryRules" ref="categoryForm"
        :hide-required-asterisk="true">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="categoryForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类简介" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容" resize="none" v-model="categoryForm.description">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="categoryDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitCategory(categoryForm.flag)" size="small">
          {{['添 加','修 改'][categoryForm.flag]}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { aMixin } from '@mixins'
import {
  _addCategory,
  _getCategoryList,
  _editCategory,
  _deleteCategory
} from '@api'
import { convertDeepCopy } from '@utils'
const ADD = 0
const EDIT = 1
export default {
  data() {
    return {
      categoryList: [],
      categoryForm: {},
      categoryRules: {
        name: [{ required: true, message: '请输入游戏分类', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入分类说明', trigger: 'blur' }
        ]
      },
      categoryDialogVisible: false
    }
  },
  methods: {
    _deleteCategory,
    // 获取分类列表
    async fetchCategory() {
      const { list, total } = await _getCategoryList(this.query)
      this.total = total
      this.categoryList = list
    },
    // 显示分类对话框
    showCategoryDialog(flag, data) {
      this.categoryDialogVisible = true
      if (flag === ADD) {
        // _
      } else if (flag === EDIT) {
        this.categoryForm = convertDeepCopy(data)
      }
      this.categoryForm.flag = flag
    },
    // 提交分类列表
    submitCategory(flag) {
      this.$refs.categoryForm.validate(async (valid) => {
        if (!valid) return
        this.categoryForm.updateTime = Date.now()
        if (flag === ADD) {
          this.categoryForm.id = Date.now() % 999999999
          const { success } = await _addCategory(this.categoryForm)
          if (success) {
            this.$message.success('添加成功')
            this.categoryDialogVisible = false
            this.fetchCategory()
          } else {
            this.$message.error('添加失败')
          }
        } else if (flag === EDIT) {
          const { success } = await _editCategory(this.categoryForm)
          if (success) {
            this.$message.success('修改成功')
            this.categoryDialogVisible = false
            this.fetchCategory()
          } else {
            this.$message.error('修改失败')
          }
        }
      })
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchCategory()
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';
</style>
