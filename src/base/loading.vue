<template>
  <div class="loading">
    <img width="24px" height="24px" src="../assets/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style lang="less" scoped>
.loading{width: 100%;text-align: center;}
.desc{
  line-height: 20px;font-size: 14px;color: rgba(255, 255, 255, 0.5);
}
</style>
 
 
