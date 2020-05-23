<template>
  <div class="Home">
    <navbar />
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in category" :key="index" :title="category[index].title">
        <van-list :immediate-check="false" v-model="item.loading" :finished="item.finished" finished-text="真的一条也没有了" @load="onLoad">
          <div class="detailparent">
            <!-- v-if和v-for在同一标签中使用会报错 eslint-plugin-vue-->
            <!-- 所以这里用一个div来做v-if的判断 -->
            <!-- 加swipable也可以解决 -->
            <detail
              class="detailitem"
              :detailitem="categoryitem"
              v-for="(categoryitem,categoryindex) in item.list"
              :key="categoryindex"
            ></detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import detail from "@/views/Detail";
export default {
  name: "Home",
  components: {
    Navbar,
    detail
  },
  data() {
    return {
      category: [],
      active: ""
    };
  },
  created() {
    this.selectCategory();
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
      // console.log(this.category);
    },
    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.pagesize = 10;
        // 下拉加载更多需要的属性
        item.finished = false;
        item.loading = false;
        return item;
      });
      this.category = category1;
    },

    // 专门获取数据的方法
    async selectArticle() {
      //**不用在data中设置属性接收categoryitem,直接调用此函数获得其返回值
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      // 这个函数里的categoryitem就相当于刚改造完的数据里的被点击项
      // 防止新加载的数据覆盖掉之前的数据 不用categotyitem.list=res.data;
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    // 通过下标获取被点击的部分的数据 点了哪个就是哪个
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    // 下拉加载部分方法
    onLoad(){
      const categoryitem = this.categoryItem();
      categoryitem.page += 1;
      this.selectArticle();
    },
  },
  watch: {
    active() {
      this.selectArticle();
    }
  }
};
</script>

<style lang="less" scope>
.Home {
  background-color: antiquewhite;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    width: 45%;
    margin: 5px 0;
  }
}
</style>