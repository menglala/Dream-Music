<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteOne(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../common/less/variable";
  @import "../common/less/mixin.less";
  .search-list{
    .search-item{display: flex;
      align-items: center;
      height: 40px;
      overflow: hidden;
      .text{
        flex: 1;
        color: @color-text-l;
        }
      .icon{.extend-click()}
        .icon-delete{
          font-size: 14px;
          color: @color-text-d};
          }
  }
  .list-enter-active, .list-leave-active{transition: all 0.1s}
  .list-enter, .list-leave-to{ height: 0}
</style>