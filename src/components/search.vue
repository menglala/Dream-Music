<template>
  <div class="search-wrapper">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="queryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="hot-keys-wrapper">
        <h1>热门搜索</h1>
        <ul class="hot-keys">
          <li v-for="(hotkey, index) in hotkeys" :key="index" 
          @click="addQuery(hotkey)">
            <span>{{hotkey.k}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
import searchBox from '../base/search-box'
import suggest from '../components/suggest'
import { getHotKey } from '../api/index.js'
import { mapMutations,mapGetters } from 'vuex'

export default {
  data() {
    return { hotkeys: [],query:'',}
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === 0) {
          this.hotkeys = res.data.hotkey.slice(0, 10)
        }
      })
    },
    addQuery(hotkey){
      this.query=hotkey.k
      // 点击热门搜索时,搜索框自动补充搜索热词
      this.$refs.searchBox.setQuery(hotkey.k)
    },
    queryChange(text){
      this.query=text
    }
  },
  components: {
    searchBox,suggest,
  }
}
</script>

<style lang="less" scoped>
.hot-keys-wrapper {
  margin: 0 20px;
  h1 {
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 14px;
    margin-bottom: 20px;padding: 8px 0 0 0;
  }
  .hot-keys li {
    display: inline-block;
    font-size: 14px;
    background-color: #333;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    color: hsla(0, 0%, 100%, 0.5);
  }
}
.search-wrapper {
  position: fixed;
  top: 88px;
  width: 100%;
  bottom: 0; 
}
.search-box-wrapper {
  margin: 20px;
}
.search-result{width: 100%;position: fixed;top: 170px;bottom: 0;}
</style>


