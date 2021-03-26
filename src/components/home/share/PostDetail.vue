<template>
  <div class="post-detail">
    <div class="p-user">
      <img :src="bindURL(handlePost.avatar)" alt="" class="p-avatar">
      <div>
        <span class="p-author">{{handlePost.author}}</span>
        <span class="p-date">发布于 - {{handlePost.createTime | formatDate}} </span>
      </div>
    </div>
    <div class="p-main">
      <div class="p-title">{{handlePost.title}}</div>
      <div class="p-content" v-html="handlePost.htmlContent" v-hljs></div>
    </div>
    <div class="p-comment">
      <img :src="bindURL(handlePost.avatar)" alt="" class="p-avatar">
      <textarea cols="80" rows="2" class="p-textarea" v-model="comment"></textarea>
      <button class="btn-comment" @click="submitComment()"
        :disabled="commentIsEmpty">评论</button>
    </div>
    <div class="p-clist" v-for="item in handleCommentList" :key="item.id">
      <img :src="bindURL(item.avatar)" alt="" class="p-avatar">
      <div class="p-clist-content">
        <span class="p-author">{{item.author}}</span>
        <span class="p-date">{{item.createTime|formatDate}}</span>
        <div class="p-content">
          {{item.content}}</div>
      </div>
      <div class="p-clist-tips">
        <!-- <a href="javascript:;"><i class="iconfont icon-appstore"></i>回复</a> -->
      </div>
    </div>
    <p-back />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { convertDeepCopy, bindURL } from '@utils'
import { _addComment, _getCommentByPostId } from '@api'
import pBack from '@/components/common/Back'
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      comment: '',
      commentList: []
    }
  },
  methods: {
    bindURL,
    // 返回
    backToLast() {
      this.$router.push('/share')
    },
    // 提交评论
    async submitComment() {
      const { success } = await _addComment(this.handleComment())
      if (success) {
        this.$message.success('评论成功')
        this.comment = ''
        this.fetchComment()
      } else {
        this.$message.error('评论失败')
      }
    },
    // 处理评论
    handleComment() {
      return {
        id: Date.now() % 99999999,
        postId: parseInt(this.id),
        userId: this.currentUser.id,
        createTime: Date.now(),
        content: this.comment.trim()
      }
    },
    async fetchComment() {
      const comment = await _getCommentByPostId(this.id)
      this.commentList = comment
    }
  },
  computed: {
    ...mapState(['currentPost', 'currentUser']),
    ...mapGetters(['getUserAvatarById', 'getUserNameById']),
    handlePost() {
      const post = convertDeepCopy(this.currentPost)
      post.avatar = this.getUserAvatarById(post.authorId)
      return post
    },
    // 评论框为空检测
    commentIsEmpty() {
      return this.comment.trim().length === 0
    },
    handleCommentList() {
      return this.commentList.map((i) => {
        i.avatar = this.getUserAvatarById(i.userId)
        i.author = this.getUserNameById(i.userId)
        return i
      })
    }
  },
  components: {
    pBack
  },
  created() {
    this.fetchComment()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
.post-detail {
  position: relative;
  margin: 0 160px 0;
  padding: 20px;
  background-color: #fff;
  text-align: left;
  border: 1px solid #ccc;
  .p-user {
    display: flex;
    margin-bottom: 20px;
    span {
      display: block;
      text-indent: 1em;
      height: 20px;
      line-height: 20px;
    }
    .p-author {
      color: #333;
    }
    .p-date {
      font-size: 14px;
      color: #909090;
    }
  }
  .p-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: top;
  }
  .p-main {
    div {
      border-bottom: 1px solid #ccc;
      padding-bottom: 16px;
    }
    .p-title {
      color: #212529;
      font-size: 32px;
    }
    .p-content {
      color: #333;
      font-size: 16px;
      /deep/img {
        width: 100%;
      }
    }
  }
  .p-comment {
    position: relative;
    margin-top: 6px;
    padding: 10px;
    background-color: #f2f2f2;
    textarea {
      outline: none;
      resize: none;
      font-size: 16px;
      border-radius: 4px;
      &:focus {
        border-color: rgb(66, 185, 131);
        box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.8);
        & + .btn-comment {
          opacity: 1;
        }
      }
    }
    .p-textarea {
      vertical-align: top;
      box-sizing: border-box;
      height: 40px;
      border: 1px solid #ccc;
      margin-left: 20px;
    }
    .btn-comment {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      padding: 6px 16px;
      border-radius: 3px;
      font-size: 16px;
      border: 1px solid #fff;
      color: #fff;
      background-color: @main-green;
      letter-spacing: 0.1em;
      transition: all 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
      opacity: 0;
      cursor: pointer;
      &:focus {
        outline: none;
        opacity: 1;
      }
      &:hover {
        color: #fff;
        box-shadow: 0 0 0 3px rgba(@main-green, 0.8);
      }
    }
  }
  .p-clist {
    display: flex;
    padding: 1em 2em;
    padding-left: 2em;
    border-bottom: 1px solid #ccc;
    .p-clist-content {
      padding-left: 1.5em;
      padding-bottom: 1.5em;
    }
    .p-author {
      color: #333;
      font-size: 14px;
      font-weight: 600;
    }
    .p-date {
      color: #8a9aa9;
      margin-left: 0.5em;
      font-size: 14px;
    }
    .p-content {
      margin-top: 0.8em;
      font-size: 14px;
      line-height: 20px;
      max-width: 600px;
      img {
        width: 100%;
      }
    }
  }
  .p-back {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
