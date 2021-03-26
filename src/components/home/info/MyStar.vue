<template>
  <div>
    <template v-if="starList">
      <el-table :data="filterStarList" style="width: 100%" key="myStar">
        <el-table-column prop="gameName" label="游戏名称" width="180">
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
            <el-button type="success" size="mini" @click="go(row.gameid)">跳转</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      暂无收藏记录
    </template>
  </div>
</template>

<script>
import { convertDeepCopy } from '@utils'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  props: {
    data: {
      type: Array
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      starList: []
    }
  },
  computed: {
    ...mapState(['allGame']),
    filterStarList() {
      return this.starList.map((i) => {
        const g = this.list.find((item) => {
          return i.gameid === item.id
        })
        i.gameName = (g && g.name) || '未知'
        return i
      })
    }
  },
  methods: {
    ...mapMutations(['setCurrentGame']),
    ...mapActions(['fetchAllGame']),
    go(id) {
      this.currentGame(id)
      this.$emit('go-to', id)
    },
    currentGame(id) {
      const game = this.allGame.find((i) => {
        return i.id === id
      })
      this.setCurrentGame(game)
    }
  },
  components: {
    // gameItem
  },
  created() {
    this.starList = convertDeepCopy(this.data)
    if (this.allGame === null) {
      this.fetchAllPost()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
