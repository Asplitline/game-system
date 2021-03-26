<template>
  <div class="my-post">
    <el-table :data="data" style="width: 100%" key="myPost">
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" min-width="180">
        <template v-slot="{row}">
          {{row.createTime|formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新日期" min-width="180">
        <template v-slot="{row}">
          {{row.updateTime|formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template v-slot="{row}">
          <el-button type="success" size="mini" @click="go(row.id)">跳转</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['setCurrentPost']),
    ...mapActions(['fetchAllPost']),
    go(id) {
      this.currentPost(id)
      this.$emit('go-to', id)
    },
    currentPost(id) {
      const post = this.allPost.find((i) => {
        console.log(i.id, id)
        return i.id === id
      })
      this.setCurrentPost(post)
    }
  },
  computed: {
    ...mapState(['allPost']),
    postList() {
      return this.data
    }
  },
  created() {
    if (this.allPost === null) {
      this.fetchAllPost()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
