<template>
  <div>
    <div class="editBanner" @click="bannerClick">
      <span>{{left}}</span>
      <span>
        <slot name="right"></slot>
      </span>
    </div>
    <div >
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "editBanner",
  props: ["left"],
  data() {
    return {};
  },
  methods: {
    bannerClick() {
      this.$emit("bannerClick");
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
.editBanner {
  background-color: white;
  padding: 4.167vw;
  border-bottom: 0.278vw solid #eee;
  font-size: 3.889vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #666;
  }
}


</style>