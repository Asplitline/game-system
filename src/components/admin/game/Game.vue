<template>
  <div class="game">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>游戏列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="query.keyword" class="search-ipt"
            @keyup.enter.native="fetchGame()" :clearable="true" @clear="fetchGame()"
            @keyup.esc.native="clearIpt(fetchGame)">
            <i slot="prefix" class="el-input__icon el-icon-search search-icon"></i>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12">
          <el-button class="el-icon-circle-plus-outline add-button" size="medium"
            @click="showGameDialog(0)">添加游戏
          </el-button>
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="gameList" stripe style="width: 100%">
        <el-table-column prop="name" label="名称" min-width="100">
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="150">
        </el-table-column>
        <el-table-column prop="lx" label="游戏类型" min-width="80">
          <template v-slot="{row}">
            {{getCategoryNameById(row.lx)}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间" min-width="100">
          <template v-slot="{row}">
            {{row.createTime|formatDate}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="修改时间" min-width="100">
          <template v-slot="{row}">
            {{row.createTime|formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template v-slot="{row}">
            <el-button type="primary" size="small" @click="showGameDialog(1,row)">编辑
            </el-button>
            <el-button type="success" size="small" @click="goGameDetail(row)">详情
            </el-button>
            <el-button type="danger" size="small"
              @click="deleteById(_deleteGame,fetchGame,row.id,'游戏')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange(fetchGame,$event)"
        @current-change="handleCurrentChange(fetchGame,$event)"
        :page-sizes="[1, 2, 5, 10]" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 游戏对话框 -->
    <el-dialog :title="gameForm.flag === 0?'添加游戏':'修改游戏'"
      :visible.sync="gameDialogVisible" width="30%" @close="clearDialog('gameForm')"
      class="game-dialog">
      <el-form :model="gameForm" :rules="gameRules" ref="gameForm" class="game-form"
        size="small" :hide-required-asterisk="true">
        <el-form-item label="游戏名" prop="name">
          <el-input v-model="gameForm.name"></el-input>
        </el-form-item>
        <el-form-item label="游戏简介" prop="description">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容" resize="none" v-model="gameForm.description">
          </el-input>
        </el-form-item>
        <el-form-item label="游戏类型" prop="lx">
          <el-select v-model="gameForm.lx" placeholder="请选择">
            <el-option v-for="item in miniCategory" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏封面" prop="photo">
          <el-upload class="avatar-uploader" :action="bindURL('/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess" name="files">
            <img v-if="gameForm.photo" :src="bindURL(gameForm.photo)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="游戏公司" prop="company">
          <el-input v-model="gameForm.company"></el-input>
        </el-form-item>
        <el-form-item label="游戏链接" prop="url">
          <el-input v-model="gameForm.url"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="gameDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitGame(gameForm.flag)" size="small">
          {{['添 加','修 改'][gameForm.flag]}}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { _getGameList, _addGame, _editGame, _deleteGame } from '@api'
import { aMixin } from '@mixins'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { convertDeepCopy, bindURL } from '@utils'
const ADD = 0
const EDIT = 1
export default {
  data() {
    return {
      gameList: [],
      gameRules: {
        name: [{ required: true, message: '请输入游戏名', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入游戏简介', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入游戏公司', trigger: 'blur' }
        ],
        lx: [{ required: true, message: '请选择游戏类型', trigger: 'blur' }],
        photo: [{ required: true, message: '请选择游戏封面', trigger: 'blur' }],
        url: [{ required: true, message: '请输入游戏链接', trigger: 'blur' }]
      },
      gameForm: {},
      gameDialogVisible: false
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory']),
    ...mapMutations(['setCurrentGame']),
    _deleteGame,
    bindURL,
    // 获取游戏
    async fetchGame() {
      const { list, total } = await _getGameList(this.query)
      this.gameList = list
      this.total = total
    },
    // 显示游戏对话框
    showGameDialog(flag, data) {
      this.gameDialogVisible = true
      if (flag === ADD) {
        // _
      } else if (flag === EDIT) {
        this.gameForm = convertDeepCopy(data)
        this.gameForm.lx = parseInt(this.gameForm.lx)
      }
      this.gameForm.flag = flag
    },
    // 提交游戏对话框
    submitGame(flag) {
      this.$refs.gameForm.validate(async (valid) => {
        if (!valid) return
        if (flag === ADD) {
          this.gameForm.updateTime = Date.now()
          this.gameForm.id = Date.now() % 999999999
          const { success } = await _addGame(this.gameForm)
          this.showMsgBySuccess(success, '添加', this.fetchGame)
        } else if (flag === EDIT) {
          const { success } = await _editGame(this.gameForm)
          this.showMsgBySuccess(success, '修改', this.fetchGame)
        } else {
          console.log('error')
        }
        this.gameDialogVisible = false
      })
    },
    // 跳转到游戏详情
    goGameDetail(data) {
      this.setCurrentGame(data)
      this.$router.push('/game/' + data.id)
    },
    // 图片上传后回调
    handleAvatarSuccess(res) {
      this.$set(this.gameForm, 'photo', res)
    }
  },
  computed: {
    ...mapGetters(['getCategoryNameById', 'getMiniCategoryList']),
    // 过滤
    miniCategory() {
      return this.getMiniCategoryList()
    }
  },
  mixins: [aMixin],
  created() {
    this.fetchGame()
    this.fetchAllCategory()
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.el-select {
  width: 100%;
}

/deep/.el-table .cell {
  white-space: nowrap;
}
</style>
