<template>
  <div class="LoginTop">
    <div>{{leftTop}}</div>
    <div>{{middleTop}}</div>
    <div class="slot-style">
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
  height: 50px;
  background-color: white;
  display: flex;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
.slot-style {
    color: skyblue;
  }
</style>