    <template>
  <div class="main-container">
    <section class="main-container col2-right-layout">
      <div class="main container">
        <div class="modal" v-bind:class="{'is-active':catActive}">
          <div class="modal-background"></div>
          <div class="modal-card" style="width:50%">
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
                        <img :src="filePath+cart_item.feature_image" />
                      </figure>
                    </td>
                    <td>
                      {{cart_item.pro_name}}
                      <tr>
                        <p class="special-price">
                          <span class="price">৳{{cart_item.discount_price}}</span>
                        </p>
                      </tr>
                      <tr>
                        <p class="old-price">
                          <span class="price">৳{{cart_item.regular_price}}</span>
                        </p>
                      </tr>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <footer class="modal-card-foot" style="justify-content: flex-end;">
              <button class="button is-primary" @click="close">Continus Shopping</button>
              <button class="button is-success has-text-right" @click="checkoutSingle">Checkout</button>
            </footer>
          </div>

          <button @click="close" class="modal-close"></button>
        </div>
        <div class="row">
          <aside class="right sidebar col-sm-3 col-xs-12">
            <ClientSidebar></ClientSidebar>
          </aside>
          <div class="col-main col-sm-9 col-xs-12">
            <div class="my-account">
              <div class="page-title">
                <h2>My Wishlist</h2>
              </div>
              <div class="dashboard">
                <div class="order-detail-content">
                  <div class="wishlist-item table-responsive">
                    <table class="col-md-12">
                      <thead>
                        <tr>
                          <th class="th-delate">Remove</th>
                          <th class="th-product">Images</th>
                          <th class="th-details">Product Name</th>
                          <th class="th-price">Unit Price</th>
                          <th class="th-total th-add-to-cart">Add to Cart</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,key) in items" :key="key">
                          <td class="th-delate">
                            <a @click="removeWishlist(item)">X</a>
                          </td>
                          <td class="th-product">
                            <nuxt-link :to="{path:'/product/'+item.slug}">
                              <img
                                :src="filePath+item.feature_image"
                                :alt="item.pro_name"
                              />
                            </nuxt-link>
                          </td>
                          <td class="th-details">
                            <h2>
                              <nuxt-link :to="{path:'/product/'+item.slug}">{{item.pro_name}}</nuxt-link>
                            </h2>
                          </td>
                          <td class="th-price">৳{{item.discount_price}}</td>
                          <th class="td-add-to-cart">
                            <a @click="addToCart(item)">
                <!--<font-awesome-icon :icon="['fas', 'shopping-cart']" />-->
    <i class="fas fa-shopping-cart"></i> 
                              Add to Cart</a>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="cart_navigation">
                    <nuxt-link class="continue-btn" :to="{path:'/'}">
            <!--<font-awesome-icon :icon="['fas', 'arrow-left']" style="font-size:30px" />-->

                       <i class="fa fa-arrow-left"></i> 
                      &nbsp; Continue shopping
                    </nuxt-link>
                    <a class="checkout-btn" @click="checkout">
              <!--<font-awesome-icon :icon="['fas', 'check']" style="font-size:30px" />-->

                       <i class="fa fa-check"></i>  
                      Proceed to checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import ClientSidebar from "~/components/client/sidebar";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
export default {
               head () {
    return {
      title: 'My Wishlist|Jamuna Electronics ',
      meta: [
        { hid: 'description', name: 'description', content: 'User wishlist. Jamuna Electronics' }
      ]
    }
  },
   middleware: 'auth',
  components: {
    Loading,
    ClientSidebar
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      isLoading: false,
      fullPage: true,
      cart_item: [],
      catActive: false
    };
  },
  computed: {
    items() {
      return this.$store.getters.getWishlist;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    totalPrice() {
      var self = this;
      var total = 0;
      this.items.forEach(item => {
        total += parseInt(item.discount_price);
      });
      return total;
    }
  },
  mounted() {
    this.Loading();
    this.wishlist();
  },
  methods: {
    Loading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    checkoutSingle() {
      this.$dlg.mask(
        "Redirecting To Checkout",
        this.$router.push("/checkout/delivery-details/"),
        {
          closeTime: 1
        }
      );
    },
    checkout() {
       if (this.items.length >= 1) {
      this.items.forEach(item => {
        this.$store.dispatch("addToCart", item);
      });
      this.$dlg.mask(
        "Redirecting To Checkout",
        this.items.forEach(item => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + Cookies.get("access_token");
          axios
            .post("/api/wishlist/remove", {
              wishlist_id: item.id
            })
            .then(response => {
              this.$store.commit("setWishlist", response.data.wishlist);
            })
            .catch(error => {
              // toast.error(error.response.data.message);
            });
        }),
        {
          closeTime: 3
        }
      );
      setTimeout(() => {
        this.$router.push("/checkout/delivery-details/");
      }, 3000);
        } else {
        Swal.fire({
          icon: "error",
          title: "Opps",
          timer: 5000,
          text: "No Item In Cart"
        });
      }
    },
    wishlist() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      axios
        .get("/api/wish-list")
        .then(response => {
          this.$store.commit("setWishlist", response.data.wishlist);
        })
        .catch(error => {
          //   toast.error(error.response.data.message);
        });
    },
    removeWishlist(item) {
      setTimeout(() => {
        Swal.fire({
          title: "Want To Remove This Item?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Remove",
          cancelButtonColor: "#d33"
        }).then(result => {
          if (result.value) {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + Cookies.get("access_token");
            axios
              .post("/api/wishlist/remove", {
                wishlist_id: item.id
              })
              .then(response => {
                this.$store.commit("setWishlist", response.data.wishlist);
              })
              .catch(error => {
                // toast.error(error.response.data.message);
                 if (error.response.status === 401) {
         this.$store.dispatch('destroyToken');
        router.replace('/client/login');
    }
              });
          }
        });
      }, 500);
    },
    addToCart(item) {
      this.cart_item = item;
      this.$store.dispatch("addToCart", item);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + Cookies.get("access_token");
      axios
        .post("/api/wishlist/remove", {
          wishlist_id: item.id
        })
        .then(response => {
          this.$store.commit("setWishlist", response.data.wishlist);
        })
        .catch(error => {
          //   toast.error(error.response.data.message);
        });
      this.catActive = true;
    },
    close: function() {
      this.catActive = false;
    }
  }
};
</script>

<style scope>
.cart_navigation {
  margin-top: 10px;
  float: left;
  width: 100%;
}
.cart_navigation a.continue-btn {
  padding: 10px 20px;
  border: 0px solid #e8e6e2;
  background: #f9f9f9;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 10px;
  border-radius: 3px;
  text-transform: uppercase;
}
.cart_navigation a.checkout-btn {
  float: right;
  background: #e40514;
  color: #fff;
  border: 1px solid #e40514;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 30px;
  border-radius: 3px;
  text-transform: uppercase;
}
</style>