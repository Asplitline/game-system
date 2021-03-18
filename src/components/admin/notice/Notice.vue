<template>
  <div class="notice">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword" class="search-ipt"
            @keyup.enter.native="fetchNotice()" :clearable="true" @clear="fetchNotice()"
            @keyup.esc.native="clearIpt(fetchNotice)">
            <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-circle-plus-outline add-button" size="medium"
            @click="showNoticeDialog(0)">发布公告
          </el-button>
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="noticeList" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" min-width="180">
        </el-table-column>
        <el-table-column prop="comment" label="简介" min-width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="180">
          <template v-slot="{row}">
            {{row.createTime|formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="180">
          <template v-slot="{row}">
            {{row.updateTime|formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="180">
          <template v-slot="{row}">
            <el-button type="primary" size="small" @click="showNoticeDialog(1,row)">编辑
            </el-button>
            <el-button type="success" size="small">详情</el-button>
            <el-button type="danger" size="small"
              @click="deleteById(_deleteNotice,fetchNotice,row.id,'公告')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchNotice,$event)"
        @current-change="handleCurrentChange(fetchNotice,$event)"
        :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 公告对话框 -->
    <el-dialog :title="noticeForm.flag === 0?'发布公告':'修改公告'" class="notice-dialog"
      :visible.sync="noticeDialogVisible" width="30%" @close="clearDialog('noticeForm')">
      <el-form :model="noticeForm" :rules="noticeRules" ref="noticeForm"
        class="notice-form" :hide-required-asterisk="true">
        <el-form-item label="公告标题" prop="name">
          <el-input v-model="noticeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="公告简介" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容" resize="none" v-model="noticeForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label="公告封面" prop="url">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess" name="files">
            <img v-if="noticeForm.avatarImgUrl" :src="bindURL(noticeForm.avatarImgUrl)"
              class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noticeDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitNotice(noticeForm.flag)" size="small">
          {{['发 布','修 改'][noticeForm.flag]}}
        </el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { aMixin } from '@mixins'
import { _getNoticeList, _deleteNotice } from '@api'
import { convertDeepCopy, bindURL } from '@utils'
const ADD = 0
const EDIT = 1

export default {
  data() {
    return {
      noticeList: [],
      noticeDialogVisible: false,
      noticeForm: {},
      noticeRules: {}
    }
  },
  methods: {
    _deleteNotice,
    bindURL,
    // 获取公告
    async fetchNotice() {
      const { list, total } = await _getNoticeList(this.query)
      this.noticeList = list
      this.total = total
    },
    // 显示公告对话框
    showNoticeDialog(flag, data) {
      this.noticeDialogVisible = true
      if (flag === ADD) {
        console.log(0)
      } else if (flag === EDIT) {
        this.noticeForm = convertDeepCopy(data)
      } else {
        console.log('error')
      }
      this.noticeForm.flag = flag
    },
    // 文件上传后回调
    handleAvatarSuccess(res) {
      this.noticeForm.url = res
    },
    // 提交公告
    submitNotice(flag) {
      console.log(flag)
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchNotice()
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.notice-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .notice-form {
    box-sizing: border-box;
    padding: 0 16%;
    /deep/.el-form-item__content {
      text-align: left;
    }
    /deep/.el-upload {
      border: 2px dashed rgba(64, 158, 255, 1);
      &:hover {
        border-color: rgba(64, 158, 255, 0.5);
      }
    }
  }
  /deep/.el-dialog__footer {
    text-align: center;
  }
}
</style>
