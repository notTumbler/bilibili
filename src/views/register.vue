<template>
  <div class="register">
    <login-top middleTop="注册bilibili">
      <!-- <div slot="left"><span class="iconfont icon-fanhui"></span></div> -->
      <div slot="right" @click="$router.push('./login')">返回</div>
    </login-top>

    <login-text
      label="姓名"
      style="margin:4.167vw 0"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="res => model.name = res"
    />
    <!-- @inputChange="successIpt" -->
    <login-text
      label="账号"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res => model.username = res"
    />
    <login-text
      label="密码"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res => model.password = res"
    />
    <login-btn btnText="注册" @registerSubmit="registerSubmit" />
  </div>
</template>

<script>
import LoginTop from "@/components/common/LoginTop";
import LoginText from "@/components/common/LoginText";
import LoginBtn from "@/components/common/LoginBtn";
export default {
  name: "register",
  data() {
    return {
      model: {
        name: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // successIpt(content){
    //   this.name = content;
    // }
    async registerSubmit() {
      let rulg = /^.{6,16}$/;
      // 确保注册时所有数据都不为空，再发送请求
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        const res = await this.$http.post("/register", this.model);

        this.$toast(res.data.msg);
        // 将id和token存储到本地缓存里
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.objtoken);
        // 注册成功就跳转至登录页面
        if (res.data.code === 200) {
          setTimeout(() => {
            this.$router.push("./userinfo");
          }, 1000);
        }
      } else {
        this.$toast.fail("格式不正确,请重新输入");
      }
    }
  },

  components: {
    LoginTop,
    LoginText,
    LoginBtn
  }
};
</script>

<style scoped >
</style>