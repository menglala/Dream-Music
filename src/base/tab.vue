<template>
  <ul class="tab">
      <router-link to="/recommend" tag="li">推荐</router-link>
      <router-link to="/singer" tag="li">歌手</router-link>
      <router-link to="/rank" tag="li">榜单</router-link>
      <router-link to="/search" tag="li">搜索</router-link>
  </ul>
</template>

<script>
  export default{
    name:'tab',

  }
</script>

<style lang="less" scoped>
@import '../common/less/variable.less';

.tab{ width: 100%;display: flex;height: 44px;position: fixed;top:44px;left: 0;
li{display: flex; flex: 1;align-items: center;justify-content:center; font-size: 14px;color:@color-text-l;}
.router-link-active{color: @color-theme;border-bottom: 2px solid @color-theme} 
}
</style>
