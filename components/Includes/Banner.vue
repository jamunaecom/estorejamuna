<template>
<div>
    <section class="banner-area">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-lg-4 col-md-4" v-for="(bottomBanner,key) in BottomBanners" :key="key">
              <div class="banner-block"> 
                <nuxt-link
                              :to="{path:bottomBanner.slug}">
                    <img :src="`${$axios.defaults.baseURL}`+bottomBanner.image" alt="banner"> 
                     </nuxt-link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="jtv-service-area">
    <div class="container">
	<hr>
      <div class="row">
		<div class="col-sm-12 margin-top-20 margin-bottom-20">
			<img class="img-responsive" src="/images/footer-banner.jpg" alt="banner">
		</div>
	  <!--
        <div class="col-sm-3 col-xs-12">
          <div class="block-wrapper ship">
            <div class="text-des">
              <div class="icon-wrapper"><i class="fa fa-paper-plane"></i></div>
              <div class="service-wrapper">
                <h3>World-Wide Shipping</h3>
                <p>On order over ৳99</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 col-xs-12 ">
          <div class="block-wrapper return">
            <div class="text-des">
              <div class="icon-wrapper"><i class="fa fa-rotate-right"></i></div>
              <div class="service-wrapper">
                <h3>100% secure payments</h3>
                <p>Credit/ Debit Card/ Banking </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 col-xs-12">
          <div class="block-wrapper support">
            <div class="text-des">
              <div class="icon-wrapper"><i class="fa fa-umbrella"></i></div>
              <div class="service-wrapper">
                <h3>Support 24/7</h3>
                <p>Call us: ( +123 ) 456 789</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-3 col-xs-12">
          <div class="block-wrapper user">
            <div class="text-des">
              <div class="icon-wrapper"><i class="fa fa-tags"></i></div>
              <div class="service-wrapper">
                <h3>Member Discount</h3>
                <p>25% on order over ৳199</p>
              </div>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from "~/plugins/axios";
export default {
computed: {
    BottomBanners() {
      return this.$store.getters.getBottomBanner;
    }
  },
  mounted() {
    this.fetchBottombanner();
  },
   methods: {

    fetchBottombanner(){
         var self = this;
      axios.get("/api/bottom-banner").then(response => {
          self.$store.commit("setBottomBanner", response.data.bottom_banner);
      });
    }, 
  },
  }

</script>