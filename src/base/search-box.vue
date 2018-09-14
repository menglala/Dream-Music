<template>
  <div class="icon search-box">
    <i class="icon-search"></i>
    <input type="text" :placeholder="placeholder" v-model="query" ref="queryInp">
    <i class="icon-dismiss" @click="clearSearch" v-show="query"></i>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {debounce} from '../common/js/util.js'

export default {  
  props:{
    placeholder:{
      type:String,
      default:'搜索歌曲,歌手......'
    }
  },
  data(){
    return{ query:'',}
  },
  created() {
    // 使用了debounce节流函数,在每次修改搜索词的时候会延迟发送请求并清空未发送的请求,节约流量
    this.$watch('query', debounce((newVal)=>{
      this.$emit('query',newVal)
    },200)) 
  },
  methods:{
    clearSearch(){
      this.query =''
    },
    setQuery(text){
      this.query=text
    },
    blur(){
      this.$refs.queryInp.blur()
    }
  }
}
</script>

<style lang="less" scoped>
  .search-box{width: 100%;height: 40px;background-color: #333;padding: 0 6px;border-radius: 6px;display: flex;align-items:center;box-sizing:border-box;
    i{font-size: 24px;color: #6f6363;}
    .icon-dismiss{font-size: 16px;}
    input{background-color: #333;flex: 1;margin: 0 5px;outline: 0;color: #fff;
    font-size: 14px;line-height: 18px;}
  }
</style>


