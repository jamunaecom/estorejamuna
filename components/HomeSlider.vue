<template>
  <div class="main-slider" id="home">
    <div class="container" style="padding-top:5px">
      <div class="row">
        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12 jtv-slideshow">
          <div id="jtv-slideshow">
            <div id="rev_slider_4_wrapper" class="rev_slider_wrapper fullwidthbanner-container">
              <div id="rev_slider_4" class="rev_slider fullwidthabanner">
                <hooper :progress="true" :autoPlay="true" :playSpeed="5000" style="height: 100%">
                  <slide v-for="(slider,key) in homeSliders.home_sliders" :key="key">
                       <nuxt-link
                              :to="{path:slider.slug}">
                    <img
                      :src="`${$axios.defaults.baseURL}`+slider.image"
                      data-bgposition="left top"
                      data-bgfit="cover"
                      data-bgrepeat="no-repeat"
                      alt="banner"
                      v-lazy-load
                    />
                    </nuxt-link>
                  </slide>

                  <hooper-pagination slot="hooper-addons"></hooper-pagination>
                </hooper>
                <div class="tp-bannertimer"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12 no-padding" v-if="mobileView ==false">
          <div class="col-sm-12"  v-for="(topBanner,key) in homeSliders.topBanners" :key="key">
               <nuxt-link
                              :to="{path:topBanner.slug}">
            <img :src="`${$axios.defaults.baseURL}`+topBanner.image" class="img-responsive" alt="banner" v-lazy-load />
               </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from '~/plugins/axios';
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination,

  },
      data() {
    return {
      mobileView:false,
        window: {
        width: 0,
        height: 0
      },
    }
    },
 computed: {
    homeSliders() {
      return this.$store.getters.gethomeSlider;
    }
  },
  mounted() {
    if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      }
    this.fetchHomeSliders();
  },
  methods: {

    fetchHomeSliders(){
         var self = this;
      axios.get("/api/home-slider").then(response => {
          self.$store.commit("sethomeSlider", response.data);
      });
    },
  },
};
</script>
<style scoped>
@media screen and (min-width: 1141px) and (max-width: 1920px){
  .hooper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 402px;
}
}
@media screen and (min-width: 992px) and (max-width: 1440px){
  .hooper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 402px;
}
}
@media screen and (min-width: 772px) and (max-width: 991px){
  .hooper {
  height: 250px;
}
}
@media screen and (min-width: 400px) and (max-width: 771px){
  .hooper {
  height: 220px;
}
}
@media screen and (min-width: 240px) and (max-width: 439px){
  .hooper {
  height: 150px;
}
}
.pr-img-area img {
    width: 100%;
    height: 100%;
}
</style>
