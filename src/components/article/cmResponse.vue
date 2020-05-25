<template>
  <div class="cmResponse">
    <div v-for="(item,index) in commentChild" :key="index">
      <!-- 评论-上 -->
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
      <!-- 评论-下 -->
      <div class="comment_bottom">
        <div>
          <p class="xia">{{item.comment_content}}</p>
        </div>
      </div>
      <cmResponse :commentChild="item.child"></cmResponse>
    </div>
  </div>
</template>

<script>
export default {
  name: "cmResponse",
  props: ["commentChild"],
  components: {},
  data() {
    return {};
  }
};
</script>

<style scoped lang="less" >
.cmResponse {
  padding: 2.778vw 5.556vw;

  .comment_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user_img {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
      span {
        margin-left: 2.222vw;
        color: purple;
      }
    }
    .user_info {
      color: #666;
    }
  }
  .comment_bottom {
    margin-top: 1.389vw;
    background-color: #f4f4f4;
    p {
      padding: 0 4.167vw;
      font-size: 3.889vw;
      color: #555;
    }
  }
}
</style>