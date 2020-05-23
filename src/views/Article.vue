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
            <span>{{model.category.title}}</span>
            <span>{{model.name}}</span>
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
              <div>
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
                <span class=" dandu iconfont icon-pinglun1"></span>
                <span>75454评论</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/Navbar";

export default {
  name: "Article",
  data() {
    return {
      model: {
        category: {},
        userinfo: {}
      },
      category: ""
    };
  },
  created() {
    this.articleitemData();
  },
  methods: {
    async articleitemData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
    }
  },
  components: {
    Navbar
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
      padding: 15px;
      .one {
        span {
          &:nth-child(1) {
            margin: 0 10px 0 0;
            color: #fb7299;
            background-color: #f4f4f4;
            border-radius: 4px;
            text-align: center;
          }
        }
      }
      .two {
        display: flex;
        color:#666;
        .two-one{
          flex: 4;
          padding: 8px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-child(1){
            color: purple;
            font-weight: 600;
          }
        }
        .two-two{
          flex: 1;
        }
      }
      .three{
        display: flex;
        color:#666;
        // justify-content: center;
        // align-items: center;
        .three-one{
          flex: 8;
          display: flex;
          align-items: center;
          div{
            margin-right: 15px;
            span{
              padding-right: 4px;
            }
          }
        }
        .three-two{
          flex: 3.5;
          div{
            .dandu{
              padding-right: 4px;
            }
          }
        }
      }
    }
  }
}
</style>