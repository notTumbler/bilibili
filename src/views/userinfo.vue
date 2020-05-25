<template>
  <div class="userinfo">
    <navbar />
    <img src="@/assets/004.jpg" class="backImg" alt />
    <userDetail :userInfo="model" />
    <div class="btn">
      <button @click="$router.push('/home')">返回首页</button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import userDetail from "@/components/UserComponent/userDetail";

export default {
  name: "userinfo",
  data() {
    return {
      model: {}
    };
  },
  created() {
    this.UserinfoData();
  },
  methods: {
    async UserinfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));

      this.model = res.data[0];
    }
  },
  components: {
    Navbar,
    userDetail
  }
};
</script>

<style scoped lang="less">
.userinfo {
  .backImg {
    height: 38.889vw;
    width: 100%;
  }
}
.btn {
  button {
    margin-top: 13.889vw;
    color: white;
    font-size: 5vw;
    background-color: #fb7299;
    outline: none;
    border: none;
    width: 100%;
    height: 13.889vw;
    border-radius: 2.222vw;
  }
}
</style>