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
            @keyup.enter.native="fetchUser()" :clearable="true" @clear="fetchUser()"
            @keyup.esc.native="clearIpt(fetchUser)">
            <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
        </el-col>
      </el-row>
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="avatarImgUrl" label="头像" width="80">
          <template v-slot="{row}">
            <el-avatar :src="bindURL(row.avatarImgUrl)" v-if="row.avatarImgUrl">
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" min-width="100">
        </el-table-column>
        <el-table-column prop="name" label="用户名" min-width="100">
        </el-table-column>
        <el-table-column prop="phone" label="手机" min-width="100">
        </el-table-column>
        <el-table-column prop="qq" label="qq" min-width="100">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="100">
        </el-table-column>
        <el-table-column prop="level" label="身份" min-width="80">
          <template v-slot="{row}">
            <el-tag :type="levelName[row.level].type" v-if="levelName[row.level]">
              {{levelName[row.level].name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="{row}">
            <el-button type="primary" size="small" @click="showEditUserDialog(row)">编辑
            </el-button>
            <el-button type="warning" size="small" @click="resetPassword(row.id)">重置
            </el-button>
            <el-button type="danger" size="small"
              @click="deleteById(_deleteUser,fetchUser,row.id,'用户')">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchUser,$event)"
        @current-change="handleCurrentChange(fetchUser,$event)"
        :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%"
      class="edit-dialog" @close="clearDialog('editUserForm')"
      :close-on-click-modal="false">
      <el-form :model="editUserForm" :rules="editUserRules" ref="editUserForm" size="mini"
        :hide-required-asterisk="true" class="edit-form">
        <el-form-item label="账号" prop="username">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="editUserForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="level">
          <br>
          <el-radio v-model="editUserForm.level" :label="0">用户</el-radio>
          <el-radio v-model="editUserForm.level" :label="1">管理员</el-radio>
          <el-radio v-model="editUserForm.level" :label="2">超级管理员</el-radio>
        </el-form-item>
        <el-form-item label="头像" prop="avatarImgUrl">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess" name="files">
            <img v-if="editUserForm.avatarImgUrl"
              :src="bindURL(editUserForm.avatarImgUrl)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="个性签名" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none"
            placeholder="请输入内容" v-model="editUserForm.description">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="editDialogVisible = false" size="small">取 消
        </el-button>
        <el-button type="success" @click="editUser('editUserForm')" size="small">修 改
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { _getUserList, _deleteUser, _changePassword, _editUser } from '@api'
import { convertDeepCopy, bindURL, validateEmail } from '@utils'
import { aMixin } from '@mixins'
const DEFAULT_PASSWORD = 123456
export default {
  data() {
    return {
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      userList: [{}],
      total: 10,
      editDialogVisible: false,
      editUserForm: {},
      editUserRules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        qq: [{ required: true, message: '请输入qq号码', trigger: 'blur' }],
        level: [{ required: true, message: '请选择身份', trigger: 'blur' }],
        avatarImgUrl: [
          { required: true, message: '请选择头像', trigger: 'blur' }
        ]
      },
      levelName: [
        { name: '用户', type: 'primary' },
        { name: '管理员', type: 'warning' },
        { name: '超级管理员', type: 'danger' }
      ]
    }
  },
  methods: {
    bindURL,
    _deleteUser,
    // 获取用户
    async fetchUser() {
      const { list, total } = await _getUserList(this.query)
      this.userList = list
      this.total = total
    },
    // 显示修改对话框
    showEditUserDialog(row) {
      this.editDialogVisible = true
      this.editUserForm = convertDeepCopy(row)
    },
    // 修改用户
    editUser(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { success } = await _editUser(this.editUserForm)
        if (success) {
          this.$message.success('修改成功')
          this.fetchUser()
          this.editDialogVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
      console.log(this.editUserForm)
    },
    // 上传文件回调
    handleAvatarSuccess(res) {
      this.editUserForm.avatarImgUrl = res
    },
    // 重置密码
    async resetPassword(id) {
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { success } = await _changePassword({
            id,
            password: DEFAULT_PASSWORD
          })
          if (success) {
            this.$message.success('重置密码成功，密码为123456')
          } else {
            this.$message.error('重置密码失败')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  mixins: [aMixin],
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
