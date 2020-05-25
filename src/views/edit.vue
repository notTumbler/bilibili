<template>
  <div class="edit" v-if="model">
    <div style="margin-bottom:4.167vw">
      <Navbar />
    </div>

    <div class="uploadfile">
      <van-uploader class="uploadImg" preview-size="100vw" :after-read="afterRead" />
      <editBanner left="头像">
        <img :src="model.user_img" slot="right" v-if="model.user_img" />
        <img src="@/assets/logo.png" slot="right" v-else />
      </editBanner>
    </div>

    <editBanner left="昵称" @bannerClick="show=true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </editBanner>
    <editBanner left="UID">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </editBanner>
    <editBanner left="性别" @bannerClick="gendershow=true">
      <a href="javascript:;" slot="right">{{model.gender===1?'男':'女'}}</a>
    </editBanner>
    <editBanner left="出生日期"></editBanner>
    <editBanner left="个性签名" @bannerClick="textshow=true">
      <a href="javascript:;" slot="right">点击编辑</a>
      <div class="geqian" slot="bottom">{{model.user_desc}}</div>
    </editBanner>
    <div style="margin:0,padding:0"></div>

    <!-- 返回按钮 -->
    <div class="editback" @click="editback">返回个人中心</div>

    <!-- 昵称区域 -->
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="nichengClick"
      @cancel="content=''"
    >
      <van-field v-model="content" autofocus></van-field>
    </van-dialog>

    <!-- 个性签名区域 -->
    <van-dialog
      v-model="textshow"
      title="个性签名"
      type="textarea"
      show-cancel-button
      @confirm="geqianClick"
      @cancel="content=''"
    >
      <van-field v-model="content" autofocus></van-field>
    </van-dialog>
    <!-- 选择性别 -->
    <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import editBanner from "@/components/common/editBanner";
export default {
  name: "edit",
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      content: "",
      gendershow: false,
      actions: [
        { name: "男", val: 1 },
        { name: "女", val: 0 }
      ]
    };
  },
  created() {
    this.selectUser();
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      // 后台技术 暂时不知道
      // 把选中的图片给后台发过去，后台返回一个新的URL
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      this.model.user_img = res.data.url;
      // 但是仅仅这样的话，页面一刷新头像就没了
      // 所以再发送一次请求，将这个URL再存到数据库里
      this.UserUpdate();
    },
    // 这个请求是用来向数据库里更新this,model对象的，用户的任何信息修改后都得通过它存储到数据库里
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code === 200) {
        this.$toast("修改成功");
      }
    },
    nichengClick() {
      this.model.name = this.content;
      this.UserUpdate();
      //* content里的内容提交之后，清空，不然以后再改都会拼接上去了
      this.content = "";
    },
    geqianClick() {
      this.model.user_desc = this.content;
      this.UserUpdate();
      this.content = "";
    },
    // 选择完性别之后
    onSelect(data) {
      this.model.gender = data.val;
      this.UserUpdate();
      this.gendershow = false;
    },
    // 返回个人中心
    editback() {
      this.$router.push("/userinfo");
    }
  },
  components: {
    Navbar,
    editBanner
  }
};
</script>

<style scoped lang="less">
.edit {
  a {
    text-decoration: none;
    color: #666;
  }

  img {
    width: 12.778vw;
    height: 12.778vw;
    border-radius: 50%;
  }
  .uploadfile {
    position: relative;
    overflow: hidden;
    .uploadImg {
      position: absolute;
      opacity: 0;
    }
  }
  .geqian {
    background-color: rgba(255, 255, 255, 0.8);
    // width: 100%;
    padding: 4.444vw;
  }
  .editback {
    margin-top: 11.111vw;
    background-color: pink;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 5vw;
    padding: 3.889vw 0;
  }
}
</style>