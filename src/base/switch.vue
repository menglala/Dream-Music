<template>
  <ul class="switch">
    <li v-for="(item, index) in switches" :key="index" @click="switchItem(index)" :class="{active:currentIndex===index}">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    switches:{
      type:Array,
      default:[]
    },
    currentIndex:{
      type:Number,
      default:0
    }
  },
  methods:{
    switchItem(index){
      this.$emit('switch',index)
    }
  }
}
</script>

<style lang="less" scoped>
.switch{
  display: flex;align-items: center;width: 240px;border: 1px solid #333;
  margin: 0 auto;border-radius: 5px;
  li{flex: 1;font-size: 14px;color: hsla(0,0%,100%,.3);padding: 8px;text-align: center;}
  .active{color: #fff;background-color: #333;}
}
</style>
