<template>
  <div class="m-header">
    <div class="logo"></div>
    <h1>Dream Music</h1>
    <router-link to="/user" tag="div" class="icon">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
  export default{
    name:"m-header",
  }
</script>

<style lang="less" scoped>
  @import '../common/less/mixin.less';
  @import '../common/less/variable.less';

  .m-header{position: fixed;top: 0;left: 0;
  width: 100%;text-align: center;color:@color-theme;height: 44px;font-size:18px;
  .logo{width: 30px;height: 32px;background: url("../assets/logo@3x.png") no-repeat;background-size: 100%;display: inline-block;margin: 6px 5px 0 0;}
  h1{display: inline-block;line-height: 44px;vertical-align: top;}
  .icon-mine{font-size: 20px;position: absolute;top: 0;right: 0;padding: 12px;color: @color-theme;}
  }
</style>
