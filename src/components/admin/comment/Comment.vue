<template>
  <div class="comment">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-row :gutter="20" class="top-search">
        <el-col :span="6">
        </el-col>
        <el-col :span="6" :offset="12">
          <span></span>
        </el-col>
      </el-row>
      <el-table :data="commentList" stripe style="width: 100%">
        <el-table-column prop="postId" label="文章标题" min-width="180">
          <template v-slot="{row}">
            {{getPostTitleById(row.postId)}}
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" min-width="180">
        </el-table-column>
        <el-table-column prop="userId" label="评论用户" min-width="180">
          <template v-slot="{row}">
            {{getUserNameById(row.userId) }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="180">
          <template v-slot="{row}">
            {{row.createTime|formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template v-slot="{row}">
            <el-button type="danger" size="small"
              @click="deleteById(_deleteComment,fetchComment,row.id,'评论')">删除
            </el-button>
          </template>
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
import { _getComment, _deleteComment } from '@api'
import { aMixin } from '@mixins'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      query: {
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      commentList: []
    }
  },
  methods: {
    ...mapActions(['fetchAllUser', 'fetchAllPost']),
    _deleteComment,
    // 获取评论
    async fetchComment() {
      const { totalPageSize, comments } = await _getComment(this.query)
      this.commentList = comments
      this.total = totalPageSize
    },
    handleSizeChange(size) {
      this.query.pageSize = size
      this.fetchComment()
    },
    handleCurrentChange(current) {
      this.query.pageNum = current
      this.fetchComment()
    }
  },
  computed: {
    ...mapGetters(['getUserNameById', 'getPostTitleById'])
  },
  created() {
    this.fetchComment()
    this.fetchAllUser()
    this.fetchAllPost()
  },
  mixins: [aMixin]
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

/deep/.el-table .cell {
  white-space: nowrap;
}
.top-search {
  margin: 0;
}
</style>
