<template>
  <div id="app">
    <client-only>
      <offline-alert />
    </client-only>


      <Header />
      <Navbar></Navbar>
      <div class="main">
        <Nuxt keep-alive />
        <div class="scroll-up" id="scroll" v-show="scroll_top">
          <a href="#"><span class="icon-chevrons-up"></span></a>
        </div>
      </div>
      <Footer></Footer>
    </div>

</template>

<script>
import Header from "~/components/Includes/Header";
import Navbar from "~/components/Includes/Navbar";
import Footer from "~/components/Includes/Footer";
export default {
  components: {
    Header,
    Navbar,
    Footer,
  },
  data() {
    return {
      scroll_top: false,
      page_view: false,
      show: false,
    };
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 600) {
        this.scroll_top = true;
      } else {
        this.scroll_top = false;
      }
    },
  },
  mounted() {
    if (process.browser) {
      this.show = true;
      window.addEventListener("scroll", this.handleScroll);
    }
  },
};
</script>
<style>
body {
  font-family: "rubik", sans-serif;
  font-weight: 400;
  color: #292929;
  background: #fff;
}
h1{
  font-size: 26px !important;
}
h2{
  font-size: 22px !important;
}
h3{
  font-size: 18px !important;
}
h1, h2, h3, h4, h5, h6{
  color: gray !important;
}
.main {
  min-height: 800px;
  /* padding-top: 90px !important; */
}
.product-item {
    background: #fff;
}
.item-content {
    padding: 0 5px;
}
.slick-slide img {
  width: 100%;
  background-position: left top;
}
.slick-slide {
  margin: 0px 0px;
  padding: 20px;
}
.slick-dots {
  bottom: 25px;
  color: #fff;
}
.slick-prev:before,
.slick-next:before {
  font-family: "slick";
  font-size: 30px;
  line-height: 2;
  opacity: 1;
  color: #00ace1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slick-prev {
  left: 15px !important;
  z-index: 1;
  top: 48% !important;
}
.slick-next {
  right: 15px !important;
  z-index: 1;
  top: 48% !important;
}
.carousel-item .carousel-caption {
  text-align: left;
}

.slick-prev:before,
.slick-next:before {
  font-family: "slick";
  font-size: 30px;
  line-height: 2;
  opacity: 1;
  color: #00ace1;
  background-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slick-prev {
  left: 15px;
  z-index: 1;
  top: 40%;
}
.slick-next {
  right: 15px;
  z-index: 1;
  top: 40%;
}

.hooper-navigation.is-vertical .hooper-prev {
  top: -22px !important;
  padding: 5px !important;
  bottom: auto;
  color: red;
  right: 0;
  left: 30% !important;
  transform: none;
  transform: initial;
}

.hooper-navigation.is-vertical .hooper-next {
  bottom: -22px !important;
  padding: 5px !important;
  left: 30% !important;
  color: red;
  transform: none;
  transform: initial;
}
</style>
