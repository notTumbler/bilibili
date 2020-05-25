<template>
  <div class="comment">
    <div v-for="(item,index) in commentList" :key="index">
      <!-- 评论-用户名 -->
      <div class="comment_top">
        <div class="user_img">
          <img :src="item.userinfo.user_img" v-if="item.userinfo&&item.userinfo.user_img" />
          <img src="@/assets/logo.png" v-else />
          <span v-if="item.userinfo">{{item.userinfo.name}}</span>
          <span v-else>匿名用户</span>
        </div>
        <div class="user_info">
          <p>
            <span>{{item.comment_date}}</span>
          </p>
        </div>
      </div>
      <!-- 评论-内容 -->
      <div class="comment_bottom">
        <div>
          <p>{{item.comment_content}}</p>
          <p @click="publishClick(item.comment_id)">回复</p>
        </div>
      </div>
      <cmResponse :commentChild="item.child"></cmResponse>
      <!-- <comment ></comment> -->
    </div>
  </div>
</template>

<script>
import cmResponse from "@/components/article/cmResponse";
export default {
  name: "comment",
  data() {
    return {
      commentList: null
    };
  },
  components: {
    cmResponse
  },
  created() {
    this.commentData();
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if (res.data) {
        this.$emit("lengthselect", res.data.length);
      }
      this.commentList = this.changeCommentData(res.data);
      // this.commentList = res.data;
    },
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    },
    publishClick(id){
      this.$emit('publishClick',id);
    }
  }
};
</script>

<style scoped  lang="less" >
.comment {
  padding: 5px 5px;
  .comment_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user_img {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      span {
        margin-left: 8px;
        color: purple;
      }
    }
    .user_info {
      color: #666;
    }
  }
  .comment_bottom {
    margin-top: 5px;
    div {
      display: flex;
      justify-content: space-between;
      p:nth-child(1) {
        padding: 0 15px;
        font-size: 14px;
        color: #555;
      }
      p:nth-child(2){
        color: palevioletred;
        margin-right: 10px;
      }
    }
  }
}
</style>