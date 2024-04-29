<template>
  <div class="main-container" v-if="isLoading">
    <client-only>
      <div class="modal" v-bind:class="{ 'is-active': catActive }">
        <div class="modal-background"></div>
        <div class="modal-card" :style="modalSize">
          <header class="modal-card-head">
            <p class="modal-card-title text-center">Cart Item</p>
            <button class="delete" @click="close" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <table class="table is-fullwidth is-borderless">
              <tbody>
                <tr class="columns">
                  <td class="column">
                    <figure class="image is-128x128">
                      <img
                        :src="filePath + cart_item.feature_image"
                        :alt="cart_item.pro_name"
                      />
                    </figure>
                  </td>
                </tr>
                <tr class="columns">
                  <td class="column">{{ cart_item.pro_name }}</td>
                </tr>
                <tr class="columns">
                  <td class="column">
                    <p class="special-price">
                      <span class="price">৳{{ cart_item.discount_price }}</span>
                    </p>
                  </td>
                </tr>
                <tr class="columns">
                  <td class="column">
                    <p class="old-price">
                      <span class="price">৳{{ cart_item.regular_price }}</span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div>
              <div class="field">
                <button
                  class="button is-success is-pulled-right"
                  @click="checkout"
                >
                  CheckOut
                </button>
              </div>
              <div class="field">
                <button class="button is-info is-pulled-left" @click="close">
                  Continue Shopping
                </button>
              </div>
            </div>
          </section>
        </div>

        <button @click="close" class="modal-close"></button>
      </div>
      <div class="modal" v-bind:class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title text-center">Compare Product</p>
            <button class="delete" @click="close" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <table class="table is-fullwidth is-borderless">
              <tbody>
                <tr
                  class="columns"
                  v-for="(compair_product, index_key) in compairProducts"
                  :key="index_key"
                >
                  <td class="column">Product {{ index_key + 1 }}</td>
                  <td class="column">
                    <img
                      :src="filePath + compair_product.feature_image"
                      :alt="compair_product.pro_name"
                    />
                  </td>
                  <td class="column">{{ compair_product.pro_name }}</td>
                  <td class="column">
                    <p class="special-price">
                      <span class="price"
                        >৳{{ compair_product.discount_price }}</span
                      >
                    </p>
                  </td>
                  <td class="column">
                    <p class="old-price">
                      <span class="price"
                        >৳{{ compair_product.regular_price }}</span
                      >
                    </p>
                  </td>
                  <td class="column">
                    <a
                      class="button is-small is-danger"
                      @click="removeCompair(index_key)"
                      >Remove Compare</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
        <button @click="close" class="modal-close"></button>
      </div>
      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <ul>
                  <li class="home">
                    <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
                    <span>&raquo;</span>
                  </li>
                  <li v-if="this.fetchedData.parent != null">
                    <nuxt-link
                      :to="{
                        path: '/category/' + this.fetchedData.parent_slug,
                      }"
                      >{{ this.fetchedData.parent }}</nuxt-link
                    >
                    <span>&raquo;</span>
                  </li>
                  <li class>
                    <nuxt-link
                      :to="{ path: '/category/' + this.$route.params.id }"
                      style="text-transform: capitalize"
                    >
                      {{ this.fetchedData.cat_name }}</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Breadcrumbs End -->

      <!-- Main Container -->
      <div class="main-container col2-left-layout">
        <div class="container">
          <section
            v-if="categoryInfo.cat_banner != null"
            class="hero is-medium"
            v-bind:style="{
              'background-image':
                'url(' + filePath + categoryInfo.cat_banner + ')',
              width: '100%',
              'background-repeat': 'round',
            }"
          >
            <div class="hero-body">
              <div class="container">

              </div>
            </div>
          </section>
          <div class="margin-bottom-20"></div>
          <div class="row">
            <aside class="sidebar col-sm-3 col-xs-12">
              <div class="block category-sidebar">
                <div class="sidebar-title">
                  <h3>Categories</h3>
                </div>
              </div>
              <div class="block shop-by-side">
                <div class="sidebar-bar-title">
                  <h3>Shop By</h3>
                </div>
                <div class="margin-bottom-20"></div>
                <div class="block-content">
                  <div class="block product-price-range">
                    <div class="sidebar-bar-title">
                      <h3>Price</h3>
                    </div>

                    <div class="range-slider">
                      <VueSlider
                        ref="slider"
                        v-model="sliderValue"
                        @drag-end="slider"
                        :min="minPrice"
                        :max="maxPrice"
                        :enable-cross="enableCross"
                      ></VueSlider>
                    </div>
                    <div class="amount-range-price">
                      Range:৳{{ sliderValue }}
                    </div>
                  </div>
                </div>
                <div class="layered-Category">
                  <h2 class="saider-bar-title">Attributes</h2>
                  <BulmaAccordion
                    :dropdown="true"
                    :icon="'caret'"
                    :caretAnimation="{
                      duration: '.6s',
                      timerFunc: 'ease-in-out',
                    }"
                    :slide="{
                      duration: '.9s',
                      timerFunc: 'ease',
                    }"
                  >
                    <BulmaAccordionItem
                      v-for="(attr, key) in categoryAttributes"
                      :key="key"
                    >
                      <h4 slot="title">{{ attr.attr_lable }}</h4>
                      <div slot="content">
                        <Attributes
                          v-bind:attr_id="attr"
                          v-bind:cat_name="cate_id"
                          v-bind:minPrice="minPrice"
                          v-bind:maxPrice="maxPrice"
                        ></Attributes>
                      </div>
                    </BulmaAccordionItem>
                  </BulmaAccordion>
                </div>
              </div>
            </aside>
            <div class="col-main col-sm-9 col-xs-12">
              <div class="shop-inner">


                <div v-html="fetchedData.description"></div>
                <div class="toolbar">
                  <div class="sorter">
                    <div class="short-by">
                      <label>Sort By:</label>
                      <select v-model="sorting" v-on:change="sortBy">
                        <option>Position</option>
                        <option>Name</option>
                        <option>Price ASC</option>
                        <option>Price DESC</option>
                      </select>
                    </div>
                    <!--<div class="short-by page">-->
                    <!--  <label>Show:</label>-->
                    <!--  <select v-model="count" v-on:change="sortByCount">-->
                    <!--    <option>20</option>-->
                    <!--    <option>50</option>-->
                    <!--    <option>100</option>-->
                    <!--  </select>-->
                    <!--</div>-->
                  </div>
                </div>
                <div class="product-grid-area">
                  <ul class="products-grid row">
                    <li
                      class="item col-lg-4 col-md-4 col-sm-6 col-6"
                      v-for="(product, index) in catProducts"
                      :key="index"
                    >
                      <div class="product-item">
                        <div class="item-inner">
                          <!-- <div class="item-code">Product Code: {{product.pro_code}}</div> -->


                          <div class="product-thumbnail">
                            <div
                              class="icon-sale-label"
                              v-show="product.discount_amount != 0"
                            >
                              <div class="ribbon ribbon--red">
                                <span v-if="product.discount_type == 2"
                                  >{{ product.discount_amount }}%</span
                                >
                                <span v-else
                                  >৳{{ product.discount_amount }}</span
                                >
                                <br />
                                Off
                              </div>
                            </div>
                            <div
                              class="icon-stock-ribbon stock-ribbon"
                              v-show="product.pro_quantity <= 0"
                            >
                              Out Of Stock
                            </div>
                              <div class="icon-sale-label sale-right" v-show="product.discount_amount <= 0 && product.pro_level.id != 1" >

                              <p class="pro_badge">
                      <span>{{product.pro_level.name}}</span>
                            </p>
                            </div>
                            <div class="pr-img-area">
                              <nuxt-link
                                :style="{
                                  cursor: 'pointer',
                                  'text-decoration': 'none',
                                }"
                                :to="{ path: '/product/' + product.slug }"
                                :title="product.pro_name"
                              >
                                <figure>
                                  <img
                                    class="first-img"
                                    :data-src="filePath + product.thumb_image"
                                    :alt="product.pro_name"
                                    v-lazy-load
                                  />
                                  <img
                                    class="hover-img"
                                    :data-src="filePath + product.thumb_image"
                                    :alt="product.pro_name"
                                    v-lazy-load
                                  />
                                </figure>
                              </nuxt-link>
                            </div>
                            <div class="pr-info-area">
                              <div class="pr-button">
                                <div class="mt-button add_to_wishlist">
                                  <a
                                    title="Wishlist"
                                    @click="addToWish(product)"
                                  >
                                    <i
                                      class="fa fa-heart"
                                      aria-hidden="true"
                                    ></i
                                    >
                                  </a>
                                </div>

                                <div class="mt-button add_to_compare">
                                  <a
                                    @click="compairProduct(product)"
                                    title="Compare"
                                  >
                                    <i class="fa fa-link"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="item-info">
                            <div class="info-inner">
                                  <div class="item-title">
                            <nuxt-link
                              :style="{
                                cursor: 'pointer',
                                'text-decoration': 'none',
                              }"
                              :to="{ path: '/product/' + product.slug }"
                              :title="product.pro_name"
                              >{{ product.pro_name }}</nuxt-link
                            >
                          </div>
                              <div class="item-content row">
                                <div class="item-price col-sm-6 col-6">
                                  <div
                                    class="price-box"
                                    v-if="product.discount_amount != 0"
                                  >
                                    <p class="special-price">
                                      <span class="price-label"
                                        >Special Price:</span
                                      >
                                      <span class="price"
                                        >TK
                                        {{
                                          formatPrice(product.discount_price)
                                        }}</span
                                      >
                                    </p>
                                    <br />
                                    <p class="old-price">
                                      <span class="price-label"
                                        >Regular Price:</span
                                      >
                                      <span class="price"
                                        >TK
                                        {{
                                          formatPrice(product.regular_price)
                                        }}</span
                                      >
                                    </p>
                                  </div>
                                  <div class="price-box" v-else>
                                    <p class="special-price">
                                      <span class="price-label"
                                        >Regular Price:</span
                                      >
                                      <span class="price"
                                        >TK
                                        {{
                                          formatPrice(product.discount_price)
                                        }}</span
                                      >
                                    </p>
                                  </div>
                                </div>
                                <div
                                  class="cart-btn col-sm-6"
                                  v-show="product.pro_quantity > 0"
                                >
                                  <button
                                    type="button"
                                    class="add-to-cart"
                                    @click="addToCard(product)"
                                  >
                                    <span>
                                      <i class="fa fa-shopping-cart"></i>

                                      Add
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <infinite-loading
                  v-if="catProducts.length"
                  spinner="spiral"
                  @infinite="infiniteScroll"
                ></infinite-loading>

                <div v-html="fetchedData.footer_description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import Attributes from "~/components/Attributes";
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import Swal from "sweetalert2";
import "vue-slider-component/theme/default.css";
import { BulmaAccordion, BulmaAccordionItem } from "vue-bulma-accordion";

export default {
  async asyncData(context) {
    return context.$axios
      .get("/api/categories/" + context.route.params.id)
      .then((res) => {
        return { fetchedData: res.data.data[0] };
      });
  },

  //   async asyncData ({ context }) {
  //     const { data } = await axios.get(`https://erp.estorejamuna.com/api/categories`+ context.route.params.id)
  //     return { fetchedData: data.data[0] }
  //   },

  head() {
    return {
      title: this.fetchedData.meta_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.fetchedData.meta_description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.fetchedData.cat_name,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.fetchedData.meta_title,
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "https://erp.estorejamuna.com" + this.fetchedData.cat_icone,
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content: "http://estorejamuna.com" + "/shop/" + this.fetchedData.slug,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.fetchedData.meta_description,
        },
        {
          hid: "robots",
          name: "robots",
          content: this.fetchedData.radio_meta,
        },
      ],
      link: [{ rel: "canonical", href: this.fetchedData.canonical_url }],
    };
  },

  components: {
    VueSlider,
    Attributes,
    BulmaAccordion,
    BulmaAccordionItem,
  },
  data() {
    return {
      filePath: "https://erp.estorejamuna.com",
      sorting: "Position",
      count: 20,
      isLoading: false,
      showWindow: false,
      fullPage: true,
      catProducts: [],
      sliderValue: [500, 200000],
      cat_status: false,
      cate_id: this.$route.params.id,
      compair_modal: "width:35%",
      compair_image: "height:165px",
      minPrice: "",
      maxPrice: "",
      minValue: "25000",
      range: [],
      catInfo: [],
      isActive: false,
      error: "",
      cart_item: [],
      catActive: false,
      page: 1,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  created() {
    this.isLoading = false;
    this.fetchData();
  },
  mounted() {

    this.minPrice = 500;
    this.maxPrice = 500000;
    this.enableCross = false;
    this.catAttributes();
    this.catgory();
  },
  computed: {
    url() {
      return (
        "https://erp.estorejamuna.com/api/category-product/" +
        this.$route.params.id +
        "?page=" +
        this.page
      );
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    categoryInfo() {
      return this.$store.getters.getCatInfo;
    },
    categoryProducts() {
      return this.$store.getters.getcatProducts;
    },
    categoryAttributes() {
      return this.$store.getters.getcatAttributes;
    },
    compairProducts() {
      return this.$store.getters.getCompairProduct;
    },
    attr_array() {
      return this.$store.getters.getCatAttr;
    },
    modalSize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          return "width:90%";
        } else if (this.window.width > 480 && this.window.width <= 768) {
          return "width:60%";
        } else {
          return "width:30%";
        }
      }
    },
  },
  methods: {
    async fetchData() {
      const response = await axios.get(this.url);

      this.catProducts = response.data.data;

      if (this.catProducts.length < 1) {
        this.$router.push("/coming-soon");
      }
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++;
        axios
          .get(this.url)
          .then((response) => {
            if (response.data.data.length > 0) {
              response.data.data.forEach((item) => this.catProducts.push(item));
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },

    catgory() {
      axios.get("/api/categories/" + this.$route.params.id).then((response) => {
        this.maxPrice = response.data.data[0].max_price;
        this.minPrice = response.data.data[0].min_price;
        this.sliderValue = [this.minPrice, this.maxPrice];
        this.$store.commit("setCatInfo", response.data.data[0]);
        this.isLoading = true;
      });
    },
    slider: function () {
      let slide = this.$refs.slider.getValue();

      const options = {
        method: "post",
        url: "/api/cat_product/price-renge",
        data: {
          minPrice: slide[0],
          maxPrice: slide[1],
          cat_id: this.$route.params.id,
        },
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
      };

      axios(options).then((response) => {
        var self = this;
        setTimeout(() => {
          // self.$store.commit("setcatProducts", response.data.products);
          this.catProducts = response.data.products;
          self.loading = false;
        }, 1000);
      });
    },

    sortBy: function () {
      // this.$store.commit("SHORT_BY", this.sorting);
      let products = this.catProducts;
      this.catProducts = "";
      if (this.sorting == "Name") {
        products.sort(function (a, b) {
          if (a.pro_name < b.pro_name) return -1;
          if (a.pro_name > b.pro_name) return 1;
          return 0;
        });
        this.catProducts = products;
      } else if (this.sorting == "Position") {
        products.sort(function (a, b) {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });
        this.catProducts = products;
      } else if (this.sorting == "Price ASC") {
        products.sort(function (a, b) {
          if (a.discount_price < b.discount_price) return -1;
          if (a.discount_price > b.discount_price) return 1;
          return 0;
        });
        this.catProducts = products;
      } else if (this.sorting == "Price DESC") {
        products.sort(function (a, b) {
          if (a.discount_price > b.discount_price) return -1;
          if (a.discount_price < b.discount_price) return 1;
          return 0;
        });
        this.catProducts = products;
      }
    },
    sortByCount() {
      this.$store.commit("shortByProduct", this.count);
    },
    priceBy() {
      return this.catProducts.data.filter((item) => {
        if (
          this.value[0] < item.discount_amount &&
          item.discount_amount > this.value[1]
        )
          return 1;
        return 0;
      });
    },

    compairProduct(item) {
      this.$store.dispatch("addToCompair", item);
      var com_data = this.compairProducts.length;
      if (com_data == 1) {
        this.compair_modal = "width:35%";
        this.compair_image = "height:150px";
      } else if (com_data <= 2) {
        this.compair_modal = "width:80%";
        this.compair_image = "height:120px";
      } else if (com_data >= 4) {
        this.compair_modal = "width:90%";
        this.compair_image = "height:120px";
      } else if (com_data == 3) {
        this.compair_modal = "width:70%";
        this.compair_image = "height:120px";
      }
      this.isActive = true;
    },
    compair() {
      this.$modal.hide("dialog");
      this.isActive = true;
    },
    removeCompair(index) {
      this.$store.commit("compairRemove", index);
    },
    close: function () {
      this.isActive = false;
      this.catActive = false;
    },
    addToCard(item) {
      this.cart_item = item;
      this.$store.dispatch("addToCart", item);
      this.catActive = true;
    },
    addToWish(item) {
      if (this.loggedIn) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        };
        this.$dlg.mask(
          "Adding to Wishlist",
          axios
            .post(
              "/api/addToWishlist",
              {
                item: item,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
              },
              {
                headers: headers,
              }
            )
            .then((response) => {
              this.$store.commit("addToWish", response.data);
              setTimeout(() => {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  timer: 5000,
                  text: "Item Added To Wishlist",
                });
              }, 2000);
            })
            .catch((error) => {
              this.error = error.response.data.error;
              setTimeout(() => {
                Swal.fire({
                  icon: "error",
                  title: "Opps",
                  timer: 5000,
                  text: this.error,
                });
              }, 1200);
            }),

          {
            closeTime: 1,
          }
        );
      } else {
        Swal.fire({
          title: "Please Login First",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
          showCancelButton: true,
          showCloseButton: true,
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this.$router.push("/client/login");
            }, 1000);
          }
        });
      }
    },
    checkout() {
      if (this.$store.getters.loggedIn) {
        this.$router.push("/checkout/delivery-details/");
      } else {
        this.$router.push("/checkout");
      }
    },
    formatPrice(price) {
      return (
        new Intl.NumberFormat({
          style: "decimal",
          minimumFractionDigits: 2,
          maximumSignificantDigits: 3,
        }).format(Number(price).toFixed(2)) + ".00"
      );
    },
    url_slug(value) {
      value = value.replace(/-+/g, "&&").replace(/\s+/g, "-");

      return value;
    },
    catAttributes() {
      var self = this;
      axios
        .get("/api/category-attributes/" + this.$route.params.id)
        .then((response) => {
          self.$store.commit("setcatAttributes", response.data.attrs);
        });
    },
  },
  watch: {
    attr_array: function () {
      const options = {
        method: "post",
        url: "/api/cat_product/attr-filter",
        data: {
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          attr: this.attr_array,
          cat_name: this.cate_id,
        },
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
      };

      axios(options).then((response) => {
        var self = this;
        setTimeout(() => {
          // self.$store.commit("setcatProducts", response.data.products);
          this.catProducts = response.data.products;
          self.loading = false;
        }, 1000);
      });
    },
  },
};
</script>
<style scoped>
.off {
  line-height: 44px;
}

.sale-right {
  line-height: 0px;
}
.accordion > .card > .card-header {
  padding: 0px;
}
.range-slider {
  padding: 12px 20px;
}
.slider {
  /* overwrite slider styles */
  width: 200px;
}
.vue-slider-dot-tooltip-inner {
  background: #e450e4;
}
.vue-slider-process {
  background-color: #e450e4;
  border-radius: 15px;
}
</style>
