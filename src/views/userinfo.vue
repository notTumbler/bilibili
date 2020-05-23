<template>
  <div class="userinfo">
    <navbar />
    <img src="@/assets/004.jpg" class="backImg" alt="">
    <userDetail :userInfo="model"/>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
import userDetail from '@/components/UserComponent/userDetail'
 
export default {
  name:"userinfo",
  data() {
    return {
      model:{}
    }
  },
  created(){
    this.UserinfoData();
  },
  methods:{
    async UserinfoData(){
      const res = await this.$http.get('/user/'+localStorage
      .getItem('id'))
      
      this.model = res.data[0];
    }
  },
  components: {
    Navbar,
    userDetail
  }
}
</script>

<style scoped lang="less">
  .userinfo{
    .backImg{
      height: 38.889vw;
      width: 100%;

    }
  }

</style>