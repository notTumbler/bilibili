<template>
  <div class="Article">
    <navbar />
    <div class="detailinfo">
      <div class="video">
        <!-- 也可以直接controls -->
        <video controls="controls" :src="model.content"></video>
        <div class="detailinfotext">
          <div class="one">
            <!-- 因为获取服务器是异步的，所以 vue 先绑定数据。
            先绑定了数据，你的category就是为空对象，所以ltitle属性便为 undefined，解决方法将data.model.category设置为空-->
            <div>
              <span class="span">{{model.category.title}}</span>
              <span>{{model.name}}</span>
            </div>
            <div @click="guanzhuClick">
              <span
                class="iconfont"
                :class="guanzhuactive?'icon-guanzhuer guanzhuColor':'icon-guanzhu'"
              >
                <span class="guanzhu">关注</span>
              </span>
            </div>
          </div>
          <div class="two">
            <div class="two-one">
              <span>{{model.userinfo.name}}</span>
              <span>146.2W次观看</span>
              <span>77777弹幕</span>
              <span>{{model.date}}</span>
            </div>
            <div class="two-two"></div>
          </div>
          <div class="three">
            <div class="three-one">
              <div @click="collectionClick" :class="{activeColor:active}">
                <span class="iconfont icon-shoucang"></span>
                <span>收藏</span>
              </div>
              <div>
                <span class="iconfont icon-xiazai"></span>
                <span></span>缓存
              </div>
              <div>
                <span class="iconfont icon-fenxiang"></span>
                <span></span>分享
              </div>
            </div>
            <div class="three-two">
              <div>
                <span class="dandu iconfont icon-pinglun1"></span>
                <span>75454评论</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 推荐列表 -->
        <div class="detailparent">
          <detail
            class="detailitem"
            :detailitem="item"
            v-for="(item,index) in commendList"
            :key="index"
          />
        </div>

        <!-- 评论 -->
        <commentTitle :commentlength="len" @commentPublish="commentPublish" ref="commentCom" />
        <comment @lengthselect="res => len = res" @publishClick="PostChildClick" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Detail from "./Detail";
import commentTitle from "@/components/article/commentTitle";
import comment from "@/components/article/comment";

export default {
  name: "Article",
  components: {
    Navbar,
    Detail,
    commentTitle,
    comment
  },
  data() {
    return {
      model: {
        category: {},
        userinfo: {}
      },
      commendList: [],
      len: 0,
      Postom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null
      },
      active: true,
      guanzhuactive: true
    };
  },
  watch: {
    $route() {
      this.articleitemData();
      this.commendData();
    }
  },
  created() {
    this.articleitemData();
    this.commendData();
    this.collectionInit();
  },

  methods: {
    // 获取视频数据
    async articleitemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      // model里有值之后才能检查是否关注
      if (this.model) {
        this.guanzhuInit();
      }
    },
    // 获取文章数据
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commendList = res.data;
    },
    // 发表以及评论
    async commentPublish(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      // console.log(str);
      this.Postom.comment_content = res;
      this.Postom.comment_date = str;
      this.Postom.article_id = this.$route.params.id;
      // console.log(this.Postom);
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postom
      );
    },
    // 回复一级评论
    PostChildClick(id) {
      this.Postom.parent_id = id;
      // 点击回复获取回复框焦点
      this.$refs.commentCom.focusipt();
    },
    // 收藏视频
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.active = true;
        } else {
          this.active = false;
        }
        this.$toast(res.data.msg);
      }
    },
    // 进入页面之后获取该视频是否被收藏
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id
            }
          }
        );
        // console.log(res);
        this.active = res.data.success;
      }
    },
    // 点击关注
    async guanzhuClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            sub_id: this.model.userid
          }
        );

        if (res.data.msg == "关注成功") {
          this.guanzhuactive = true;
        } else {
          this.guanzhuactive = false;
        }
        this.$toast(res.data.msg);
      }
    },
    // 进入页面之后获取该用户是否被关注
    async guanzhuInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: {
              sub_id: this.model.userid
            }
          }
        );
        // console.log(res);
        this.guanzhuactive = res.data.success;
      }
    }
  }
};
</script>

<style scoped lang="less">
.Article {
  background-color: white;
}
.detailinfo {
  .video {
    width: 100%;
    video {
      width: 100%;
    }
    .detailinfotext {
      padding: 4.167vw;
      .one {
        display: flex;
        justify-content: space-between;

        .span {
          margin: 0 2.778vw 0 0;
          color: #fb7299;
          background-color: #f4f4f4;
          border-radius: 1.111vw;
          text-align: center;
        }
        .guanzhu {
          margin-left: 1.111vw;
        }
      }
      .two {
        display: flex;
        color: #666;
        .two-one {
          flex: 10;
          padding: 2.222vw 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-child(1) {
            color: purple;
            font-weight: 600;
          }
        }
        .two-two {
          flex: 2;
        }
      }
      .three {
        display: flex;
        color: #666;
        // justify-content: center;
        // align-items: center;
        .three-one {
          flex: 8;
          display: flex;
          align-items: center;
          div {
            margin-right: 4.167vw;
            span {
              padding-right: 1.111vw;
            }
          }
        }
        .three-two {
          flex: 3.5;
          div {
            .dandu {
              padding-right: 1.111vw;
            }
          }
        }
      }
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
.activeColor {
  color: #fb7299;
}
.guanzhuColor {
  color: #fb7299;
}
</style>