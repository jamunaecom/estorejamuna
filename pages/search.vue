<template>
  <div class="main-container" v-if="!isLoading">
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

                  <li class>Search</li>
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
          <section class="hero is-small">
            <div class="hero-body">
              <div class="container">
                <h1
                  class="title text-center"
                  style="text-transform: capitalize"
                >
                  Search
                </h1>
              </div>
            </div>
          </section>
          <div class="margin-bottom-20"></div>
          <div class="row">
            <div class="col-main col-sm-12 col-xs-12">
              <div class="shop-inner">
               
                <div class="product-grid-area">
                  <ul class="products-grid row">
                    <li
                      class="item col-lg-3 col-md-3 col-sm-4 col-6"
                      v-for="(product, index) in searchProducts"
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
                                    ></i>
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
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import Snotify, { SnotifyPosition, SnotifyStyle } from "vue-snotify";
Vue.use(Snotify);
import Swal from "sweetalert2";
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      filePath: "https://erp.estorejamuna.com",
      sorting: "Position",
      count: 12,
      isLoading: false,
      fullPage: true,
      sliderValue: 50,
      catProducts: [],
      data: [500, 200000],
      cat_status: false,
      minPrice: "500",
      maxPrice: "500000",
      minValue: "25000",
      range: [],
      catInfo: [],
      isActive: false,
      error: "",
      cart_item: [],
      catActive: false,
      keywords: this.$route.query.keywords,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  computed: {
    searchProducts() {
      return this.$store.getters.getsearchProducts;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    compairProducts() {
      return this.$store.getters.getCompairProduct;
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
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      var self = this;
      axios.get("/api/search/" + this.keywords).then((response) => {
        self.$store.commit("setsearchProducts", response.data.data);
        self.loading = false;
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 700);
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

    close: function () {
      this.isActive = false;
      this.catActive = false;
    },
    addToWish(item) {
      if (this.loggedIn) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
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
        }).then((result) => {
          setTimeout(() => {
            this.$router.push("/client-login");
          }, 1000);
        });
      }
    },
    compairProduct(item) {
      this.$store.dispatch("addToCompair", item);
      this.isActive = true;
      // this.$modal.show("dialog", {
      //   title: "Success!",
      //   text: "Item Add to Compare. Click below for view Compare Product!",
      //   buttons: [
      //     {
      //       title: "Compare",
      //       handler: () => {
      //         this.compair();
      //       }
      //     },
      //     {
      //       title: "Close"
      //     }
      //   ]
      // });
    },
    compair() {
      this.$modal.hide("dialog");
      this.isActive = true;
    },
    removeCompair(index) {
      this.$store.commit("compairRemove", index);
    },
    addToCard(item) {
      this.cart_item = item;
      this.$store.dispatch("addToCart", item);
      this.catActive = true;
    },
    checkout() {
      if (this.$store.getters.loggedIn) {
        this.$router.push("/delivery-details");
      } else {
        this.$router.push("/checkout");
      }
    },
  },
  watch: {
    keywords: function () {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Opps",
          timer: 5000,
        });
      }, 2000);
    },
  },
};
</script>