<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <player></player>
    <router-view></router-view>
  </div>
</template>

<script>
import mHeader from './base/Mheader'
import tab from './base/tab'
import store from './store/index.js'
import player from './components/player'

export default {
  name: 'App',
  components:{
    mHeader,tab,player
  },
  store,
}
</script>

<style lang="less">
</style>
