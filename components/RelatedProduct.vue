<template>
  <!--related product-->
  <div class="container">
    <div class="modal" v-bind:class="{ 'is-active': catActive }">
      <div class="modal-background"></div>
      <div class="modal-card" :style="modalSize">
        <header class="modal-card-head">
          <p class="modal-card-title text-center">Cart Item</p>
          <button class="delete" @click="close" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <table class="table is-responsive">
            <tbody>
              <tr>
                <td>
                  <figure class="image is-128x128">
                    <img
                      :src="filePath + cart_item.feature_image"
                      :alt="cart_item.pro_name"
                    />
                  </figure>
                </td>
                <td>
                  <p>{{ cart_item.pro_name }}</p>

                  <p class="special-price">
                    <span class="price">Tk {{ cart_item.discount_price }}</span>
                  </p>

                  <br />

                  <p class="old-price">
                    <span class="price">Tk {{ cart_item.regular_price }} </span>
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
                Continus Shopping
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
          <table class="table is-responsive">
            <td
              v-for="(compair_product, index_key) in compairProducts"
              :key="index_key"
            >
              <thead>
                <tr>
                  <th>Product {{ index_key + 1 }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      :src="filePath + compair_product.feature_image"
                      :alt="compair_product.pro_name"
                    />
                  </td>
                </tr>
                <tr>
                  <td>{{ compair_product.pro_name }}</td>
                </tr>
                <tr>
                  <td>
                    <p class="special-price">
                      <span class="price"
                        >Tk {{ compair_product.discount_price }}</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="old-price">
                      <span class="price"
                        >Tk {{ compair_product.regular_price }}</span
                      >
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a
                      class="button is-small is-danger"
                      @click="removeCompair(index_key)"
                      >Remove Compare</a
                    >
                  </td>
                </tr>
              </tbody>
            </td>
          </table>
        </section>
      </div>
      <button @click="close" class="modal-close"></button>
    </div>

    <div class="home-tab">
      <div class="tab-title text-left">
        <h2>Related Products</h2>
      </div>
      <div id="productTabContent" class="tab-content">
        <div class="tab-pane active in" id="computer">
          <div class="featured-pro">
            <div class="slider-items-products">
              <div
                id="computer-slider"
                class="product-flexslider hidden-buttons"
              >
                <div class="slider-items slider-width-col4">
                  <vueper-slides
                    class="no-shadow"
                    :fixed-height=height
                    :visible-slides="itemShow"
                    slide-multiple
                    :gap="1"
                    autoplay
                    :infinite="true"
                    :arrows="true"
                    :bullets="false"
                    disable-arrows-on-edges
                    :dragging-distance="200"
                    :breakpoints="{
                      800: { visibleSlides: 2, slideMultiple: 2 },
                      480: { visibleSlides: 1, slideMultiple: 1 },
                    }"
                  >
                    <vueper-slide
                      v-for="(slide, related_key) in relatedProducts"
                      :key="related_key"
                    >
                      <template v-slot:content>
                        <div class="product-item">
                          <div class="item-inner">
                            <div class="product-thumbnail">
                              <div
                                class="icon-sale-label"
                                v-show="slide.discount_amount != 0"
                              >
                                <div class="ribbon ribbon--red">
                                  <span v-if="slide.discount_type == 2"
                                    >{{ slide.discount_amount }}%</span
                                  >
                                  <span v-else
                                    >Tk {{ slide.discount_amount }}</span
                                  >
                                  <br />
                                  Off
                                </div>
                              </div>
                              <div class="icon-sale-label sale-right" v-show="slide.discount_amount <= 0 && slide.pro_level.id != 1">

                              <p class="pro_badge">
                      <span>{{slide.pro_level.name}}</span>
                            </p>
                            </div>
                              <div class="pr-img-area">
                                <nuxt-link
                                  :style="{
                                    cursor: 'pointer',
                                    'text-decoration': 'none',
                                  }"
                                  :to="{ path: '/product/' + slide.slug }"
                                  :title="slide.pro_name"
                                >
                                  <figure>
                                    <img
                                      class="first-img"
                                      :src="filePath + slide.thumb_image"
                                      :alt="slide.pro_name"
                                      v-lazy-load
                                    />
                                    <img
                                      class="hover-img"
                                      :src="filePath + slide.thumb_image"
                                      :alt="slide.pro_name"
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
                                      @click="addToWish(slide)"
                                    >
                                      <i
                                        class="fa fa-heart"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </div>
                                  <div class="mt-button add_to_compare">
                                    <a
                                      title="Compare"
                                      @click="compairProduct(slide)"
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
                                    :to="{ path: '/product/' + slide.slug }"
                                    :title="slide.pro_name"
                                    >{{ slide.pro_name }}</nuxt-link
                                  >
                                </div>
                                <div class="item-content row">
                                  <div class="item-price col-sm-6 col-6">
                                    <div
                                      class="price-box"
                                      v-if="slide.discount_amount != 0"
                                    >
                                      <p class="special-price">
                                        <span class="price-label"
                                          >Special Price:</span
                                        >
                                        <span class="price"
                                          >Tk
                                          {{
                                            priceFormate(slide.discount_price)
                                          }}</span
                                        >
                                      </p>
                                      <br />
                                      <p class="old-price">
                                        <span class="price-label"
                                          >Regular Price:</span
                                        >
                                        <span class="price"
                                          >Tk
                                          {{
                                            priceFormate(slide.regular_price)
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
                                          >Tk
                                          {{
                                            priceFormate(slide.discount_price)
                                          }}</span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                  <div class="cart-btn col-sm-6 col-6">
                                    <button
                                      type="button"
                                      class="add-to-cart"
                                      @click="addToCard(slide)"
                                    >
                                      <span>
                                        <i class="fa fa-shopping-basket"></i>
                                        Add
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </vueper-slide>
                  </vueper-slides>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import Swal from "sweetalert2";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  props: ["relatedProducts"],
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      filePath: "https://erp.estorejamuna.com",
      isActive: false,
      cart_item: [],
      products: [],
      catActive: false,
      error: "",
      category: "",
      itemShow: 4,
      modal_width: "width:30%",
      height:"400px",
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  mounted() {
    this.window.width = window.innerWidth;
    if (this.window.width <= 480) {
      this.itemShow = 1;
    } else if (this.window.width <= 800) {
      this.itemShow = 3;
    } else {
      this.height="320px";
      this.itemShow = 4;
    }
  },
  computed: {
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
        } else {
          return "width:30%";
        }
      }
    },

    show_window() {
      if (process.browser) {
        return true;
      }
    },
  },
  methods: {
    formatPrice(value) {
      let data = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      return data + ".00";
    },

    priceFormate(price) {
      return (
        new Intl.NumberFormat({
          style: "decimal",
          minimumFractionDigits: 2,
          maximumSignificantDigits: 3,
        }).format(Number(price).toFixed(2)) + ".00"
      );
    },
    compairProduct(item) {
      this.$store.dispatch("addToCompair", item);
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
      this.$snotify.clear();
      if (this.$store.getters.loggedIn) {
        this.$router.push("/checkout/delivery-details/");
      } else {
        this.$router.push("/checkout");
      }
    },
  },
};
</script>
<style scoped>
.vueperslides__track {
  position: relative !important;
}
</style>
