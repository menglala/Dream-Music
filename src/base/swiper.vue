<!-- The ref attr used to find the swiper instance -->
<template>
<div class="swiper">
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide  :flag="false" v-for="(slider,index) in swiperSlides" :key="index">
      <img :src="slider.picUrl">
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
  </div>
</template>
 
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "carrousel",
  props: ["swiperSlides"],
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
          loop: true
        },
        pagination: {
          el: ".swiper-pagination",
          slidesPerView: 1,
          autoplay: 3000
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  img{width: 100%}
}
</style>