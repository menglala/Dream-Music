<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div class="confirmText btn" @click="confirm">{{confirmText}}</div>
            <div class="cancel btn" @click="cancel">{{cancelText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return { showFlag: false }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hidden() {
      this.showFlag = false
    },
    confirm() {
      this.$emit('confirm')
      this.hidden()
    },
    cancel() {
      this.$emit('cancel')
      this.hidden()
    }
  }
}
</script>

<style lang="less" scoped>
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.3);
  z-index: 300;
}
.confirm-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 301;
}
.confirm-content {
  width: 270px;
  background: #333;
  border-radius: 13px;
}
.text {
  padding: 19px 15px;
  line-height: 22px;
  font-size: 18px;
  color: hsla(0, 0%, 100%, 0.5);
  text-align: center;
}
.operate {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  .btn {
    color: hsla(0, 0%, 100%, 0.3);
    flex: 1;
    padding: 10px 0;
    line-height: 22px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
  }
  .cancel {
    border-left: 1px solid rgba(0, 0, 0, 0.3);
  }
}
</style>
