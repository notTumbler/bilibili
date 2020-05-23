<template>
  <div class="Detail" @click="$router.push(`/article/${detailitem.id}`)">
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
  }
};
</script>
Detail
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
    left: 10px;
    bottom: 8px;
    .bottom-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin: 0 2px;
        &:nth-child(2) {
          font-size: 12px;
          color: #666666;
        }
      }
    }
    .bottom-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin-right: 4px;
        font-size: 12px;
        &:nth-child(2) {
          font-size: 12px;
          color: #666666;
        }
      }
    }
  }
}
</style>