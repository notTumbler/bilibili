<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @focus="onFocus"
      shape="round"
      background="#fb7299"
    />

    <div class="hotsearch">
      <div class="title">
        <span>热搜</span>
      </div>
      <div class="content">
        <div class="content_left">
          <div class="contentDiv">1 Running Man 更新</div>
          <div class="contentDiv">2 传闻中的陈芊芊</div>
          <div class="contentDiv">3 超人回来了</div>
          <div class="contentDiv">4 特朗普打高尔夫</div>
        </div>
        <div class="content_right">
          <div class="contentDiv">5 我的世界沙雕行为</div>
          <div class="contentDiv">6 老番茄</div>
          <div class="contentDiv">7 边伯贤新歌MV</div>
          <div class="contentDiv">8 王毅回复战狼外交</div>
        </div>
      </div>
    </div>
    <div class="history">
      <div class="historyTitle">
        <span class="sousuo">搜索历史</span>
        <span class="zhankai" @click="spread" v-if="historyList.length">
          <span v-if="isSpread">隐藏</span>
          <span v-else>展开</span>
        </span>
      </div>
      <div class="historyContent" v-show="isSpread">
        <div class="contentDicTwo" v-for="(item, index) in historyList" :key="index">{{item}}</div>
      </div>
      <div v-if="historyList.length" class="clearHistory">
        <span @click="clear">
          <span class="iconfont icon-shanchu"></span>
          清空搜索历史
        </span>
      </div>
      <div class="clearHistory" v-else>没有更多内容咯~</div>
    </div>

    <!-- <van-cell @touchstart.native.stop="show = true">
    </van-cell>-->
    <van-number-keyboard
      :show="isKeyboard"
      @blur="closeKeyBoard"
      hide-on-click-outside
      safe-area-inset-bottom
      show-delete-key
    />
  </div>
</template>

<script>
export default {
  name: "search",
  components: {},
  data() {
    return {
      value: "",
      isSpread: true,
      historyList: [
        "北欧神话",
        "宫保鸡丁",
        "Node.js",
        "Vue.js",
        "Typescript",
        "Webpack",
        "酸辣土豆丝"
      ],
      isKeyboard: false
    };
  },
  methods: {
    onSearch() {
      this.$toast("亲爱的用户,搜索功能正在维护中~~~U_U~~~");
    },
    // onCancel() {
    //   this.$toast('字都打一半了，可不能取消噢~~')
    // },
    spread() {
      this.isSpread = !this.isSpread;
    },
    clear() {
      this.isSpread = false;
      this.historyList = "";
    },
    onFocus(e) {
      this.isKeyboard = e.isTrusted;
    },
    closeKeyBoard() {
      this.isKeyboard = false;
    }
  }
};
</script>

<style scoped lang="less" >
.search {
  .hotsearch {
    margin: 2.778vw;
    .title {
      color: #666666;
      font-size: 6.111vw;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .content_left {
        margin-left: 2.778vw;
      }
      .content_right {
        margin-right: 2.778vw;
      }
      .contentDiv {
        color: gray;
        background-color: white;
        margin: 2.222vw 0;
        padding: 1.389vw;
        border-top-right-radius: 2.778vw;
      }
    }
  }
  .history {
    margin: 2.778vw;
    padding: 1.667vw;
    .historyTitle {
      margin: 4.167vw 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sousuo {
        font-size: 5vw;
        color: #999;
      }
      .zhankai {
        color: skyblue;
      }
    }
    .historyContent {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-around;
      align-items: center;
      .contentDicTwo {
        color: gray;
        background-color: white;
        margin: 1.111vw 1.389vw;
        padding: 1.667vw 2.222vw;
      }
    }
  }
  .clearHistory {
    margin-top: 2.778vw;
    text-align: center;
    color: skyblue;
  }
}
</style>