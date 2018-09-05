<template>
  <div class="progress-bar">
    <div class="bar-inner" ref="progress" @click="progressClick">
      <div class="progress" ref="bar"></div>
      <div class="progress-btn-wrapper" ref="barBtn" @touchstart="touchBarStart" @touchmove="touchBarMove" @touchend="touchBarEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const btnWidth = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return { initiate: false }
  },
  created() {
    this.touch = {}
  },
  watch: {
    percent(newVal) {
      if (newVal > 0 && !this.initiate) {
        const progressWidth = this.$refs.progress.clientWidth - btnWidth
        // 在显示mini播放器的时候是-16 
        let offsetWith = newVal * progressWidth
        this.offsetWith(offsetWith)
      }
    }
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progress.getBoundingClientRect()
      let offsetWidth = e.pageX - rect.left
      this.offsetWith(offsetWidth)
      this.triggerPercent()
    },
    offsetWith(width) {
      this.$refs.bar.style.width = `${width}px`
      this.$refs.barBtn.style['transform'] = `translate3d(${width}px,0,0)`
      this.$refs.barBtn.style['webkitTransform'] = `translate3d(${width}px,0,0)`
    },
    touchBarStart(e) {
      this.initiate = true
      this.touch.startX = e.touches[0].pageX
      this.touch.barWidth = this.$refs.bar.clientWidth
    },
    touchBarMove(e) {
      if (!this.initiate) {
        return
      }
      this.touch.moveX = e.touches[0].pageX
      let deltaX = this.touch.moveX - this.touch.startX
      let offsetWith = Math.min(
        this.$refs.progress.clientWidth - btnWidth,
        Math.max(0, this.touch.barWidth + deltaX)
      )
      this.offsetWith(offsetWith)
    },
    touchBarEnd(e) {
      this.initiate = false
      this.triggerPercent()
    },
    triggerPercent() {
      const progressWidth = this.$refs.progress.clientWidth - btnWidth
      let percent = this.$refs.bar.clientWidth / progressWidth
      this.$emit('percentChange', percent)
    }
  }
}
</script>

<style lang="less" scoped>
.progress-bar {
  height: 30px;
  flex: 1;
  .bar-inner {
    position: relative;
    background: rgba(0, 0, 0, 0.3);
    height: 4px;
    top: 13px;
    .progress {
      height: 100%;
      background-color: #ffcd32;
      position: absolute;
    }
    .progress-btn-wrapper {
      position: absolute;
      top: -6px;
      left: -1px;
    }
    .progress-btn {
      width: 16px;
      height: 16px;
      background-color: #ffcd32;
      border: 3px solid #fff;
      box-sizing: border-box;
      border-radius: 50%;
    }
  }
}
</style>
