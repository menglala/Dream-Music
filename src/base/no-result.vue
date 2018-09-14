<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    }
  }
}
</script>

<style lang="less" scoped>
.no-result{text-align: center;
  .no-result-icon{width:86px;height: 90px;background-image: url('../assets/no-result@3x.png');background-size: 100%;margin: 0 auto;}
  .no-result-text{margin-top: 30px;font-size: 14px;color: hsla(0,0%,100%,.3);}
}
</style>