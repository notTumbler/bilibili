<template>
  <div class="Home">
    <navbar />
    <div class="Home-bar">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="(item,index) in category" :key="index" :title="category[index].title">
          <van-list
            :immediate-check="false"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="真的一条也没有了"
            @load="onLoad"
          >
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
      <span @click="$router.push('/editCategory')" class="shezhi iconfont icon-shezhi"></span>
    </div>

    <router-view></router-view>
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
  // 因为先前给主页设置了keepalive,所以离开home页面的时候HOME页面并不会被销毁，于是当我们从选择栏目跳转回来的时候，页面不会改变，因此，选用这个钩子函数监听页面，并于里面渲染数据
  activated() {
    if (localStorage.getItem("newCat")) {
      let newCat = JSON.parse(localStorage.getItem("newCat"));
      this.changeCategory(newCat);
      this.selectArticle();
    }
  },
  methods: {
    // 获取分类栏目数据
    async selectCategory() {
      if (localStorage.getItem("newCat")) {
        return;
      }
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
      // console.log(this.category);
      this.selectArticle();
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
      // categoryitem没在data中，这个请求是异步的，如果category没有值，那么有些属性就被显示为undefined,除了下面这种方法，还可以在某个标签上加上v-if="category"的判断条件
      if (categoryitem) {
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
      }
    },
    // 通过下标获取被点击的部分的数据 点了哪个就是哪个
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    // 下拉加载部分方法
    onLoad() {
      const categoryitem = this.categoryItem();
      categoryitem.page += 1;
      this.selectArticle();
    }
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
  .Home-bar {
    position: relative;
    .shezhi {
      position: absolute;
      right: 0vw;
      top: 2.083vw;
      background-color: white;
      z-index: 100;
      padding: 1.111vw 1.389vw;
      font-size: 5.278vw;
    }
  }
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    width: 45%;
    margin: 1.389vw 0;
  }
}
</style>