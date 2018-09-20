<template>
  <div class="search-wrapper">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="queryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" :data="shortcut" ref="shortcut">
        <div>
          <div class="hot-keys-wrapper">
            <h1>热门搜索</h1>
            <ul class="hot-keys">
              <li v-for="(hotkey, index) in hotkeys" :key="index" @click="addQuery(hotkey.k)">
                <span>{{hotkey.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1>
              <span class="title">搜索历史</span>
              <span class="icon" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <ul class="search-list">
              <li v-for="(item, index) in searchHistory" :key="index" @click="addQuery(item)">
                <span class="text" v-html="item"></span>
                <span class="icon" @click.stop="deleteSearchHistory(item)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query" @listenScroll="blurInp" @select="saveSearchHistory"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="确定要所有清空历史记录吗?" confirmText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import searchBox from '../base/search-box'
import suggest from '../components/suggest'
import { getHotKey } from '../api/index.js'
import { mapMutations, mapActions } from 'vuex'
import scroll from '../base/scroll'
import confirm from '../base/confirm'
import { searchMixin } from '../common/js/mixin.js'

export default {
  mixins: [searchMixin],
  data() {
    return { hotkeys: [], query: '', showFlag: false }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    shortcut() {
      return this.hotkeys.concat(this.searchHistory)
    }
  },
  methods: {
    ...mapActions(['clearSearchHistory']),
    showConfirm() {
      this.$refs.confirm.show()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === 0) {
          this.hotkeys = res.data.hotkey.slice(0, 10)
        }
      })
    },

    queryChange(text) {
      this.query = text
    }
  },
  watch: {
    query(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    searchBox,
    suggest,
    scroll,
    confirm
  }
}
</script>

<style lang="less" scoped>
.shortcut-wrapper {
  position: fixed;
  top: 170px;
  bottom: 0px;
  overflow: hidden;
  width: 100%;
}
.search-history {
  margin: 0 20px;
  h1 {
    display: flex;
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 14px;
    height: 40px;
    align-items: center;
    .title {
      flex: 1;
    }
  }
  .search-list {
    li {
      display: flex;
      color: hsla(0, 0%, 100%, 0.5);
      align-items: center;
      height: 40px;
      .text {
        flex: 1;
      }
    }
    .icon-delete {
      font-size: 12px;
    }
  }
}
.hot-keys-wrapper {
  margin: 0 20px 20px;
  h1 {
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 14px;
    margin-bottom: 20px;
    padding: 8px 0 0 0;
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
.search-result {
  width: 100%;
  position: fixed;
  top: 170px;
  bottom: 0;
}
.shortcut {
  width: 100%;
  height: 100%;
}
</style>


