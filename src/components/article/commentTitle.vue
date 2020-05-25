<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>{{commentlength}}</span>
    </p>
    <div class="commentInfo">
      <img :src="myuser.user_img" v-if="myuser.user_img">
      <img src="@/assets/logo.png" v-else>
      <input ref="Postipt"
       v-model="contentInput" type="text" placeholder="说点什么吧QAQ">
      <button class="btn" @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props:[
    'commentlength'
  ],
  data() {
    return {
      myuser:{},
      contentInput:''
    };
  },
  created() {
    if(localStorage.getItem('token')){
      this.myUserinfo();
    }
  },
  methods: {
    async myUserinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.myuser = res.data[0];
    },
    commentPublish(){
      if (!this.myuser && !localStorage.getItem('token')&&!localStorage.getItem('id')) {
      this.$toast('请先登录');
      return;
      }
      this.$emit('commentPublish',this.contentInput);
    },
    // 获得输入框焦点
    focusipt(){
      this.$refs.Postipt.focus();
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
  .comment{
    padding: 20px 10px;
    .comment-title{
      span{
        margin-right: 10px;
        color: orange;
        font-size: 19px;
      }
    }
    .commentInfo{
      padding: 0;
      display: flex;
      img{
        // flex: 1;
        width: 34px;
        height: 34px;
        border-radius:  100% 6px 100%  ;
        border: 2px solid #cccccc;
        box-shadow: 5px 5px 10px black;
        
      }
      input{
        flex: 10;
        outline: none;
        border: none;
        background-color: #f4f4f4;
        width: 90%;
        border-radius: 20px;
        padding-left: 20px;
        margin-left: 10px;
      }
      button{
        outline: none;
        // border: 1px;
        flex: 2;
        background-color: #fb7299;
        font-size: 16px;
        border-radius: 8px;
        color: white;
        box-shadow: 5px 5px 10px black;
      }
  }
  }
</style>