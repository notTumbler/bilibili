<template>
  <div class="editCategory">
    <navbar />
    <div class="side">
      <div class="side_top">
        <van-divider
          dashed
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 4.444vw' }"
        >主页中栏目</van-divider>
        <div class="side_top_content">
          <div v-for="(item, index) in newCat" :key="index" @click="substract(index)">{{item.title}}</div>
        </div>
      </div>
      <div class="side_under">
        <van-divider
          dashed
          :style="{ color: 'orange', borderColor: 'orange', padding: '0 4.444vw' }"
        >可添加栏目</van-divider>
        <div class="side_under_content">
          <div v-for="(item, index) in additable" :key="index" @click="add(index)">{{item.title}}</div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="$router.push('/home')">返回主页</button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
export default {
  name: "editCategory",
  components: {
    Navbar
  },
  data() {
    return {
      newCat: [],
      additable: []
    };
  },
  created() {
    if (localStorage.getItem("newCat") && localStorage.getItem("additable")) {
      this.newCat = JSON.parse(localStorage.getItem("newCat"));
      this.additable = JSON.parse(localStorage.getItem("additable"));
      return;
    }
    this.selectCategory();
  },
  methods: {
    // 得到分类数据
    async selectCategory() {
      const res = await this.$http.get("/category");
      // console.log(res);
      this.newCat = res.data;
    },
    // 删减栏目
    substract(index) {
      if (this.newCat.length < 5) {
        this.$toast("四个,可不能再少了T_T");
        return;
      }
      this.additable.push(this.newCat[index]);
      this.newCat.splice(index, 1);
    },
    // 添加栏目
    add(index) {
      this.newCat.push(this.additable[index]);
      this.additable.splice(index, 1);
    }
  },
  watch: {
    // 将newCat存到缓存之中
    newCat() {
      localStorage.setItem("newCat", JSON.stringify(this.newCat));
      localStorage.setItem("additable", JSON.stringify(this.additable));
    }
  }
};
</script>

<style scoped  lang="less">
.editCategory {
  .side {
    padding: 1.389vw;
    .side_top {
      .side_top_content {
        padding: 0 4.444vw;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        div {
          margin: 2.778vw;
          border: 0.278vw solid green;
          padding: 1.944vw 3.944vw;
        }
      }
    }
    .side_under {
      .side_under_content {
        padding: 0 4.444vw;
        display: flex;
        flex-wrap: wrap;
        div {
          margin: 2.778vw;
          border: 0.278vw solid goldenrod;
          padding: 1.944vw 3.944vw;
        }
      }
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
}
</style>