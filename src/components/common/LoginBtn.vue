<template>
  <div class="LoginBtn">

    <div class="btnparent" @click="registerClick">
      <div class="loginbtn">{{btnText}}</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name:"LoginBtn",
  props:['btnText'],
  data() {
    return {

    }
  },
  methods: {
    registerClick(){
      this.$emit('registerSubmit')
    }
  },
  components: {

  }
}
</script>

<style scoped >
.btnparent{
  padding: 4.167vw 2.778vw;
}
  .loginbtn{
    height: 12.5vw;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.25vw;
    font-size: 4.444vw;
  }
</style>