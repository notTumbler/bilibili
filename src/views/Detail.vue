<template>
  <div class="Detail" @click="pathPush">
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" style="width:100%;height:100%" />
        <div class="imgparent-bottom">
          <div class="bottom-left">
            <span class="iconfont icon-bofangyi"></span>
            <span>667</span>
          </div>
          <div class="bottom-right">
            <span class="iconfont icon-danmu"></span>
            <span>{{detailitem. commentlen}}</span>
          </div>
        </div>
      </div>
      <p>{{ detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["detailitem"],
  data() {
    return {};
  },
  methods: {
    pathPush() {
      // 点击同一个视频链接两次就会报错，所以先判断
      if (this.$route.path != `/article/${this.detailitem.id}`) {
        this.$router.push(`/article/${this.detailitem.id}`);
      } else {
        this.$toast("努力加载ing…");
      }
    }
  }
};
</script>

<style scoped lang="less" >
.detailItem {
  p {
    font-size: 3.333vw;
  }
}
.imgparent {
  position: relative;
  .imgparent-bottom {
    width: 90%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 2.778vw;
    bottom: 2.222vw;
    .bottom-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin: 0 0.556vw;
        &:nth-child(2) {
          font-size: 3.333vw;
          color: #666666;
        }
      }
    }
    .bottom-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 1.111vw;
        font-size: 3.333vw;
        &:nth-child(2) {
          font-size: 3.333vw;
          color: #666666;
        }
      }
    }
  }
}
</style>