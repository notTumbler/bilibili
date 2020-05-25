<template>
  <div class="LoginTop">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">{{middleTop}}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginTop",
  props: {
    leftTop: {
      type: String,
      defalut: ""
    },
    middleTop: {
      type: String,
      defalut: ""
    }
    // rightTop:{
    //   type:String,
    //   defalut:''
    // }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="less" >
.LoginTop {
  height: 13.889vw;
  background-color: white;
  display: flex;
  .left {
    flex: 0.6;
    display: flex;
    align-items: center;
    padding: 3.889vw;
    // justify-content: center;
    font-size: 4.444vw;
    color: orangered;
  }
  .middle {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
.right {
  color: skyblue;
}
.left {
  padding-left: 0;
}
</style>