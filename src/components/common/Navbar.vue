<template>
  <div class="Navbar">
    <div class="logo">
      <img src="@/assets/bililogo.jpg" alt />
    </div>
    <div>
      <p>
        <span>请输入搜索内容</span>
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img :src="imgUrl" alt v-if="imgUrl" />
      <img src="@/assets/logo.png"  v-else @click="$router.push('/login')" />
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: ["userInfo"],
  data() {
    return {
      imgUrl: ""
    };
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgUrl = res.data[0].user_img;
    }
  }
};
</script>

<style scoped lang="less" >
.Navbar {
  height: 12.5vw;
  background-color: white;
  display: flex;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25vw;
    img {
      width: 80%;
      height: 100%;
    }
  }
  div:nth-child(2) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      position: relative;
      background-color: #f4f4f4;
      //
      height: 7.222vw;
      width: 85%;
      border-radius: 4.167vw;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 2.778vw;
        color: #666;
      }
      .ipt-icon {
        position: absolute;
        left: 2.222vw;
        top: 50%;
        transform: translate(0, -45%);
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 8.333vw;
      width: 8.333vw;
      border-radius: 50%;
      border: 0.278vw solid #cccccc;
    }
    p {
      padding: 2.222vw;
      background-color: #fb7299;
      color: white;
      font-size: 2.778vw;
      margin: 0 1.389vw;
      border-radius: 1.111vw;
    }
  }
}
</style>