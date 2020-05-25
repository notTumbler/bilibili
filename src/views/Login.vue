<template>
  <div class="register">
    <login-top middleTop="登录bilibili">
      <div @click="$router.back()" slot="left">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <div slot="right" @click="$router.push('/register')">注册</div>
    </login-top>

    <!-- @inputChange="successIpt" -->
    <login-text
      label="账号"
      style="margin:4.167vw 0"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res => model.username = res"
    />
    <login-text
      label="密码"
      style="margin:4.167vw 0"
      placeholder="请输入密码"
      type="password"
      rule="^.{6,16}$"
      @inputChange="res => model.password = res"
    />
    <login-btn btnText="登录" @registerSubmit="AjaxInsert" />
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // successIpt(content){
    //   this.name = content;
    // }
    async AjaxInsert() {
      if (this.model.username && this.model.password) {
        const res = await this.$http.post("/login", this.model);
        this.$toast(res.data.msg);

        if (res.data.code == 301 || res.data.code == 302) {
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        setTimeout(() => {
          this.$router.push("/userinfo");
        }, 1000);
      } else {
        this.$toast.fail("格式不正确,请重新输入");
      }
    }
    // async registerSubmit() {
    //   let rulg = /^.{6,16}$/;
    //   // 确保注册时所有数据都不为空，再发送请求
    //   if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
    //     const res = await this.$http.post("/login", this.model);

    //     this.$toast.fail(res.data.msg);
    //   } else {
    //     this.$toast.fail("格式不正确,请重新输入");
    //   }
    // }
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