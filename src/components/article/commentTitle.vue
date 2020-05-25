<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>{{commentlength}}</span>
    </p>
    <div class="commentInfo">
      <img :src="myuser.user_img" v-if="myuser.user_img" />
      <img src="@/assets/logo.png" v-else />
      <input ref="Postipt" v-model="contentInput" type="text" placeholder="说点什么吧QAQ" />
      <button class="btn" @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["commentlength"],
  data() {
    return {
      myuser: {},
      contentInput: ""
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.myUserinfo();
    }
  },
  methods: {
    async myUserinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.myuser = res.data[0];
    },
    commentPublish() {
      if (
        !this.myuser &&
        !localStorage.getItem("token") &&
        !localStorage.getItem("id")
      ) {
        this.$toast("请先登录");
        return;
      }
      this.$emit("commentPublish", this.contentInput);
    },
    // 获得输入框焦点
    focusipt() {
      this.$refs.Postipt.focus();
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.comment {
  padding: 5.556vw 2.778vw;
  .comment-title {
    span {
      margin-right: 2.778vw;
      color: orange;
      font-size: 5.278vw;
    }
  }
  .commentInfo {
    padding: 0;
    display: flex;
    img {
      // flex: 1;
      width: 9.444vw;
      height: 9.444vw;
      border-radius: 100% 1.667vw 100%;
      border: 0.556vw solid #cccccc;
      box-shadow: 1.389vw 1.389vw 2.778vw black;
    }
    input {
      flex: 10;
      outline: none;
      border: none;
      background-color: #f4f4f4;
      width: 90%;
      border-radius: 5.556vw;
      padding-left: 5.556vw;
      margin-left: 2.778vw;
    }
    button {
      outline: none;
      // border: 0.278vw;
      flex: 2;
      background-color: #fb7299;
      font-size: 4.444vw;
      border-radius: 2.222vw;
      color: white;
      box-shadow: 1.389vw 1.389vw 2.778vw black;
    }
  }
}
</style>