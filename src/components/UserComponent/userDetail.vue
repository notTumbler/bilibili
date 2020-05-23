<template>
  <div class="userDetail">
    <div>
      <div class="user_img">
        <img :src="userInfo.user_img"  v-if="userInfo.user_img" />
        <img src="@/assets/005.jpg" v-else />
      </div>
      <div class="user_edit">
        <div class="user_edit_top">
          <p>
            <span>0</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span>关注</span>
          </p>
          <p>
            <span>0</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="user_edit_under">
          <div class="bianjiziliao"
          @click="$router.push('/edit')">编辑资料</div>
        </div>
      </div>
    </div>
    <!-- 个人资料 -->
    <div>
      <h4>{{userInfo.name}}</h4>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有留下……</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "userDetail",
  props:['userInfo'],
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="less">
.userDetail {
  background-color: white;
  padding: 0 3.333vw;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .user_img {
      img {
        width: 23.611vw;
        height: 23.611vw;
        border-radius: 50%;
      }
    }
    .user_edit {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .user_edit_top {
        display: flex;
        p {
          height: 8.333vw;
          margin: 3.889vw 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          padding: 1.667vw 3.889vw;
          &:nth-child(1) {
            border-right: 0.278vw solid orange;
          }
          &:nth-child(3) {
            border-left: 0.278vw solid orange;
          }
          span {
            padding-bottom: 0.833vw;
            font-size: 3.889vw;
            color: #666;
          }
        }
      }
      .user_edit_under {
        border: 0.278vw #fb7a9f solid;
        margin-bottom: 2.778vw;
        padding: 1.944vw 11.389vw;
        border-radius: 1.667vw;
        .bianjiziliao {
          color: #fb7a9f;
        }
      }
    }
  }
  > div:nth-child(2){
    h4{
      margin: 0.556vw;
      font-size: 4.444vw;
      font-weight: 600;
      color: rgba(128, 0, 128,.7);
    }
    p{
      padding: 1.389vw 0;
      color: #aaaaaa;
      font-size: 3.889vw;
    }
  }
}
</style>