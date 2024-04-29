<template>
  <div>
    <section class="banner-area">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div
                class="col-12 col-sm-4 col-lg-4 col-md-4"
                v-for="(bottomBanner, key) in BottomBanners"
                :key="key"
              >
                <div class="banner-block">
                  <nuxt-link :to="{ path: bottomBanner.slug }">
                    <img
                      :src="`${$axios.defaults.baseURL}` + bottomBanner.image"
                      alt="banner sunglasses"
                    />
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
        <hr />
        <div class="row">
          <div class="col-sm-12 margin-top-20 margin-bottom-20">
            <img
              class="img-responsive"
              src="/images/footer-banner.jpg"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "~/plugins/axios";
export default {
  computed: {
    BottomBanners() {
      return this.$store.getters.getBottomBanner;
    },
  },
  mounted() {
    this.fetchBottombanner();
  },
  methods: {
    fetchBottombanner() {
      var self = this;
      axios.get("/api/bottom-banner").then((response) => {
        self.$store.commit("setBottomBanner", response.data.bottom_banner);
      });
    },
  },
};
</script>
