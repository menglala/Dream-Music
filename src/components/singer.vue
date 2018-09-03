<template>
  <div class="singer">
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="scroll" class="scroll">
      <li v-for="(singer,index) in singers" :key="index" ref="singerGroup"       @touchmove="activeAside" :item-index2="index" @touchstart="activeAside">
        <p :item-index3="index">{{singer.title}}</p>
        <ul class="singer-list">
          <router-link :to="`/singer/${item.id}`"  tag="li" v-for="(item,index2) in singer.items" :key="index2">
            <img v-lazy="item.avater">
            <span>{{item.name}}</span>
          </router-link>
        </ul>
      </li>
    </scroller>
    <ul class="aside" ref="aside" @touchstart="asideclick" @touchmove.stop.prevent="asideMove">
      <li v-for="(title,index) in asideTitle" :key="index" :item-index="index" :class="{linkactive:index===isActive}">{{title}}</li>
    </ul>
    <router-view></router-view>
  </div>
</template>  

<script>
import { getSingerlist } from '../api/index.js'
import Singer from '../common/js/Singer.js'
import { ERR_OK } from '../api/commonParams.js'
import { getIndex } from '../common/js/dom.js'
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

const HOT = '热门'
const HOT_LENGTH = 10 // 热门歌手的数量
const ITEM_HEIGHT = 18 // 侧边入门每个li的高度是18

export default {
  data() {
    return { singers: [], isActive: 0, toElement: [], touch: {} }
  },
  created() {
    this._getSingerlist()
  },
  methods: {
    test() {
      console.log(1223)
    },
    _getSingerlist() {
      getSingerlist()
        .then(res => {
          if (res.code === ERR_OK) {
            this.singers = this.singerClassify(res.data.list)
          }
        })
        .catch(err => console.log(err))
    },
    singerClassify(list) {
      let map = { hot: { title: HOT, items: [] } }

      list.forEach((item, index) => {
        if (index < HOT_LENGTH) { // 创建热门歌手列表
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          )
        }
        const key = item.Findex

        if (!map[key]) {  // 创建a-z首字母的每个姓氏歌手列表
          map[key] = { title: key, items: [] }
        }
        map[key].items.push(
          new Singer({ id: item.Fsinger_mid, name: item.Fsinger_name })
        )
      })
      let hot = []
      let rest = []

      for (const key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          //热门歌手数组
          rest.push(map[key]) // rest=[{title:z,items:[]},{title:b,items:[]}...]
        } else if (map[key].title === HOT) {
          //其他歌手数组
          hot.push(map[key]) // hot[{title:热门,items:[]}]
        }
      }

      rest.sort((a, b) => {
        //将其他歌手按姓氏Unicode编码值排序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(rest) // 热门歌手和全部歌手连接成一个数组
    },
    async refresh(done) {
      await this._getSingerlist()
      done()
    },
    async infinite() {
      await this._getSingerlist()
      this.$refs.scroll.finishInfinite(true)
    },
    asideclick(e) {
      let index = getIndex(e.target, 'index')
      this.isActive = parseInt(index)
      this.$refs.scroll.scrollTo(0, this.toElement[index], true)
      this.touch.y1 = e.touches[0].pageY
    },
    asideMove(e) {
      let index = parseInt(getIndex(e.target, 'index'))
      this.touch.y2 = e.touches[0].pageY
      let distance = ((this.touch.y2 - this.touch.y1) / ITEM_HEIGHT) | 0 // number| 0 ===向下取整
      let targetY = distance + index
      targetY = targetY < 0 ? 0 : targetY
      targetY = targetY > this.toElement.length - 1 ? this.toElement.length - 1  : targetY
      this.$refs.scroll.scrollTo(0, this.toElement[targetY], true)
      this.isActive = targetY
      // 在滑动过程中滑出去侧边导航时,内容区域会无法滚动,在导航拉到某一区域在内容区域进行了滑动,在点击导航,第一次点击没有没有,第二次才能滚动到相应位置,因为这次滚动还在进行
    },
    saveHeight() {
      let singerList = this.$refs.singerGroup // 把每个歌手组与父元素的高度放到一个数组
      for (let i = 0; i < singerList.length; i++) {
        this.toElement.push(singerList[i].offsetTop)
      }
      this.toElement = this.toElement.map(item => item - 60)
    },
    activeAside(e) {
      let target = e.target.parentNode.parentNode
      let index2 = getIndex(target, 'index2')
      let index3 = getIndex(e.target, 'index3') // 当事件对象是'热门.A...'等标题时
      this.isActive = index2 === null ? parseInt(index3) : parseInt(index2)
    }
  },
  watch: {
    singers() {
      this.$nextTick(() => {
        this.toElement = []
        this.saveHeight()
      })
    }
  },
  computed: {
    asideTitle() {
      return this.singers.map(item => item.title.substr(0, 1))
    }
  },
}
</script>

<style lang="less" scoped>
@import '../common/less/variable.less';

.scroll {
  position: relative;
}
.singer {
  position: fixed;
  left: 0;
  top: 88px;
  width: 100%;
  bottom: 0;
  p {
    color: @color-text-l;
    font-size: 12px;
    padding-left: 20px;
    height: 30px;
    background-color: #333;
    line-height: 30px;
  }
}
.singer-list {
  li > img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    overflow: hidden;
  }
  li {
    height: 70px;
    padding: 20px 0 0 30px;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      color: @color-text-l;
      display: inline-block;
      margin-left: 20px;
    }
  }
}
.aside {
  position: fixed;
  right: 0;
  top: 140px;
  z-index: 10;
  background: #000;
  border-radius: 30px;
  padding: 12px 0;
  li {
    width: 20px;
    color: @color-text-l;
    font-size: 12px;
    padding: 3px;
    line-height: 1;
    text-align: center;
  }
}
.linkactive {
  color: @color-theme !important;
}
</style>
