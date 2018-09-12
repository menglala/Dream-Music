<template>
  <div class="rank">
    <div class="top-list">
      <scroller> 
        <li class="top-item" v-for="(top,index) in topList" :key="index" @click="selectList(top)">
          <div class="item-img">
            <img :src="top.picUrl" >
          </div>
          <ul class="songlist">
            <li v-for="(item, index) in top.songList" :key="index">
              <span>{{index+1}}</span>
              <span>{{normalizeList(item)}}</span>
            </li>
          </ul>
        </li>
      </scroller>
    </div>
    <div class="loading-wrapper">
     <loading v-if="topList.length<=0"></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getTopList} from '../api/index.js'
  import {ERR_OK} from '../api/commonParams.js' 
  import {mapMutations} from 'vuex'
  import loading from '../base/loading.vue'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)

  export default{
    data(){return{topList:[],}},
    created() {
      this._getTopList()
    },
    methods:{
      _getTopList(){
       getTopList().then(res=>{
         if (res.code===ERR_OK) {
           this.topList=res.data.topList
         }
       }) 
      },
      normalizeList(item){
        return `${item.songname} - ${item.singername}`
      },
      selectList(item){
        this.$router.push(`/rank/${item.id}`)
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList:'SET_TOP_LIST'
      })
    },
    components:{
      loading
    }
  }
</script>

<style lang="less" scoped>
.rank{position: fixed;top: 88px;bottom: 0;width: 100%;left: 0;overflow: scroll;}
.top-list{width: 100%;overflow: hidden;
.top-item{margin: 0 20px;display: flex;height: 100px;padding-top: 20px;}
}
.item-img img{width: 100px;height: 100px;}
.songlist{display: flex;flex: 1;color: hsla(0,0%,100%,.3);padding: 0 20px;justify-content: center;flex-direction: column;font-size: 12px;background-color: #333;overflow: hidden;
li{line-height: 26px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}}
.loading-wrapper{padding-top: 30px;}
</style>

