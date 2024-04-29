<template>
  <div class="container">
    <div class="home-tab">
      <div class="tab-title text-left">
        <h2>FEATURED PRODUCTS</h2>
      </div>
      <div class="modal" v-bind:class="{'is-active':catActive}">
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
                    <td class="column"> <figure class="image is-128x128">
                      <img :src="`${$axios.defaults.baseURL}`+cart_item.feature_image" :alt="cart_item.pro_name" />
                    </figure></td>
                  </tr>
                   <tr class="columns">
                    <td class="column"> {{cart_item.pro_name}}</td>
                  </tr>
                   <tr class="columns">
                    <td class="column"> <p class="special-price">
                        <span class="price">৳{{cart_item.discount_price}}</span>
                      </p></td>
                  </tr>
                   <tr class="columns">
                    <td class="column"> <p class="old-price">
                        <span class="price">৳{{cart_item.regular_price}}</span>
                      </p></td>
                  </tr>
                </tbody>
              
  
            </table>
             <hr />
            <div>
              <div class="field">
                <button class="button is-success is-pulled-right" @click="checkout">CheckOut</button>
              </div>
              <div class="field">
                <button class="button is-info is-pulled-left" @click="close">Continue Shopping</button>
              </div>
            </div>
          </section>
          
        </div>

        <button @click="close" class="modal-close"></button>
      </div>
      <div class="modal" v-bind:class="{'is-active':isActive}">
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
                   v-for="(compair_product,index_key) in compairProducts" :key="index_key"
                  >
                    <td class="column">
                     Product {{index_key+1}}
                    </td>
                    <td class="column">
                                           <img :src="`${$axios.defaults.baseURL}`+compair_product.feature_image" :alt="compair_product.pro_name" />

                    </td>
                    <td class="column">{{compair_product.pro_name}}</td>
                    <td class="column"> <p class="special-price">
                        <span class="price">৳{{compair_product.discount_price}}</span>
                      </p></td>
                    <td class="column">
                     <p class="old-price">
                        <span class="price">৳{{compair_product.regular_price}}</span>
                      </p>
                    </td>
                    <td class="column">
                       <a
                        class="button is-small is-danger"
                        @click="removeCompair(index_key)"
                      >Remove Compare</a>
                    </td>
                  </tr> 
                </tbody>
            </table>
          </section>
        </div>
        <button @click="close" class="modal-close"></button>
      </div>
      <div id="productTabContent" class="tab-content">
        <div class="tab-pane active in" id="computer">
          <div class="featured-pro">
            <div class="slider-items-products">
              <div id="computer-slider" class="product-flexslider hidden-buttons">
                <div class="slider-items slider-width-col4">
                  <hooper :infiniteScroll="true" :itemsToShow="handleResize" style="height: 100%" :autoPlay="true" :playSpeed="5000">
                    <slide v-for="(slide, i) in products" :key="i">
                      <div class="product-item">
                        <div class="item-inner">
                          <div class="product-thumbnail">
                            
                             <div class="icon-sale-label" v-show="slide.discount_amount != 0">
                             <div class='ribbon ribbon--red'>
                              <span v-if="slide.discount_type == 2">{{slide.discount_amount}}%</span>
                            <span v-else>৳{{slide.discount_amount}}</span>
                            <br>
                            Off
                              </div>
                          
                          </div>
                              <div class="icon-stock-ribbon stock-ribbon"  v-show="slide.pro_quantity <= 0">
                              Out Of Stock
                            </div>
                              <div class="icon-sale-label sale-right" v-show="slide.discount_amount <= 0 && slide.pro_level.id != 1">
                             
                              <p class="pro_badge">
                      <span>{{slide.pro_level.name}}</span>
                            </p>
                            </div>
                            <div class="pr-img-area">
                              <nuxt-link
                                :to="{path:'/product/'+slide.slug}"
                                :title="slide.pro_name"
                                :style="{ cursor: 'pointer','text-decoration':'none'}"
                              >
                                <figure>
                                  <img
                                    class="first-img"
                                    :data-src="`${$axios.defaults.baseURL}`+slide.thumb_image"
                                    :alt="slide.pro_name"
                                    v-lazy-load
                                  />
                                  <img
                                    class="hover-img"
                                    :data-src="`${$axios.defaults.baseURL}`+slide.thumb_image"
                                    :alt="slide.pro_name"
                                    v-lazy-load
                                  />
                                </figure>
                              </nuxt-link>
                            </div>
                            <div class="pr-info-area">
                              <div class="pr-button">
                                <div class="mt-button add_to_wishlist">
                                  <a title="Wishlist" @click="addToWish(slide)">
                                    <i class="fa fa-heart" aria-hidden="true"></i>
                               
                                  </a>
                                </div>

                                <div class="mt-button add_to_compare">
                                  <a @click="compairProduct(slide)" title="Compare">
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
                                <div class="item-price col-sm-6">
                                  <div class="price-box" v-if="slide.discount_amount != 0">
                                     <p class="special-price">
                                      <span class="price-label">Special Price</span>
                                      <span class="price">Tk {{priceFormate(slide.discount_price)}}</span>
                                    </p> 
                                    <p class="old-price">
                                      <span class="price-label">Regular Price:</span>
                                      <span class="price">Tk {{priceFormate(slide.regular_price)}}</span>
                                    </p>
                                   
                                  </div>
                                  <div class="price-box" v-else>
                                     <p class="special-price">
                                      <span class="price-label">Regular Price</span>
                                      <span class="price">Tk {{priceFormate(slide.discount_price)}}</span>
                                    </p> 
                                  </div>
                                </div>
                                <div class="cart-btn col-sm-6" v-show="slide.pro_quantity > 0">
                                  <button
                                    type="button"
                                    class="add-to-cart"
                                    @click="addToCard(slide)"
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
                    </slide>
                  </hooper>
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
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import Swal from "sweetalert2";
import Snotify, { SnotifyPosition, SnotifyStyle } from "vue-snotify";
Vue.use(Snotify);
export default {
  components: {
    Hooper,
    Slide,

    HooperPagination,
    Snotify
  },
  data() {
    return {
      isActive: false,
      products: [],
      cart_item: [],
      catActive: false,
      category: "",
      error: "",
      itemShow: 4,
      modal_width: "width:30%",
      window: {
        width: 0,
        height: 0
      }
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    sliders() {
      return this.$store.getters.getcatSlidersThree;
    },
    compairProducts() {
      return this.$store.getters.getCompairProduct;
    },
        handleResize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          this.itemShow = 2;
          return 2;
        } else if (this.window.width <= 800) {
          this.itemShow = 3;
          return 3;
        } else {
          this.itemShow = 4;
          return 4;
        }
      }
    },
    modalSize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          return "width:90%";
        }
        else if (this.window.width > 480  && this.window.width <= 768) {
          return "width:60%";
        } else {
          return "width:30%";
        }
      }
    }
  },
  mounted() {
    this.fetchImages();
  },
  methods: {

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
    close: function() {
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
          Authorization: "Bearer " + this.$store.state.token
        };
        this.$dlg.mask(
          "Adding to Wishlist",
          axios
            .post(
              "/api/addToWishlist",
              {
                item: item,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
              },
              {
                headers: headers
              }
            )
            .then(response => {
              this.$store.commit("addToWish", response.data);
              setTimeout(() => {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  timer: 5000,
                  text: "Item Added To Wishlist"
                });
              }, 2000);
            })
            .catch(error => {
              this.error = error.response.data.error;
              setTimeout(() => {
                Swal.fire({
                  icon: "error",
                  title: "Opps",
                  timer: 5000,
                  text: this.error
                });
              }, 1200);
            }),

          {
            closeTime: 1
          }
        );
      } else {
        Swal.fire({
          title: "Please Login First",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
          showCancelButton: true,
          showCloseButton: true
        }).then(result => {
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
    fetchImages() {
      var self = this;
      axios.get("/api/fetured-product").then(response => {
        setTimeout(() => {
            this.products = response.data.products;
          this.category = response.data.category;
          self.$store.commit("setcatSliderthree", response.data.products);
          self.loading = false;
        }, 100);
      });
    },
    formatPrice(value) {
  let data = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return data+'.00';
},

  priceFormate(price){
      return new Intl.NumberFormat( {  style: 'decimal',  minimumFractionDigits: 2,maximumSignificantDigits: 3 }).format( Number(price).toFixed(2))+".00";
    },
    url_slug(value) {
      value = value.replace(/^\s+|\s+$/g, ""); // trim
      // value = value.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = " ";
      var to = "-";
      for (var i = 0, l = from.length; i < l; i++) {
        value = value.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      value = value
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return value;
    }
  }
};
</script>
<style>
.pr-img-area img {
  width: 100%;
  height: 100%;
}
.off{
    line-height:44px;
}

.sale-right{
    line-height:0px;
}
.item-title {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #333333;
  font-family: "verdana", sans-serif;
}
.modal-card {
  width: 80%;
  top: 0%;
}
.modal {
  z-index: 10000000000;
}
</style>
