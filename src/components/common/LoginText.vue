<template>
  <div class="LoginText">
    <van-field v-model="content" 
    :label="label" :type="type" :placeholder="placeholder"
    :rule="rule" 
    />
  </div>
</template>

<script>
export default {
  name:"LoginText",

  props:['label','type','placeholder','rule'],

  data() {
    return {
      content:''
    }
 },
 methods: {
   handlerulg(){
     const rue = new RegExp(this.rule)
     if (rue.test(this.content)) {
       this.$emit('inputChange',this.content)
     }
   }
 },
 watch: {
   content(){
     this.handlerulg();
   }
 },
  components: {

  }
}
</script>

<style scoped >

</style>