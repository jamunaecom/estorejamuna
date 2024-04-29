<template>

  <header>
    <div class="header-container">
      <div class="header-top">
        <div class="container">
          <div class="row">
            <div class="col-sm-4 col-md-4 col-12">
              <span class="phone d-none d-sm-block">
              </span>
            </div>

            <!-- top links -->
            <div class="headerlinkmenu col-md-8 col-sm-8 col-12">
              <ul class="links">
                <li v-show="!loggedIn">
                  <nuxt-link :to="{ path: '/client/login' }">
                    <span style="border: 0">
                      <i class="fa fa-heart" aria-hidden="true"></i>

                      WishList
                    </span>
                  </nuxt-link>
                </li>
                <li v-show="loggedIn">
                  <nuxt-link :to="{ path: '/customer/my-wishlist' }">
                    <span style="border: 0">
                      <i class="fa fa-heart" aria-hidden="true"></i>

                      WishList
                    </span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="{ path: '/store-locator' }">
                    <span style="border: 0">
                      <i class="fa fa-map-marker" aria-hidden="true"></i>

                      Store Locator
                    </span>
                  </nuxt-link>
                </li>

                <li v-show="mobileView == false">
                  <nuxt-link :to="{ path: '/dealer-register' }">
                    <span>
                      <i class="fa fa-briefcase" aria-hidden="true"></i>

                      Dealer Registration
                    </span>
                  </nuxt-link>
                </li>

                <li v-show="loggedIn">
                  <nuxt-link
                    style="padding: 0"
                    title="Dashboard"
                    :to="{ path: '/customer/dashboard' }"
                  >
                    <i class="fa fa-user" aria-hidden="true"></i>

                    Dashboard </nuxt-link
                  >&nbsp;
                  <nuxt-link
                    style="padding: 0"
                    title="Logout"
                    :to="{ path: '/client/logout' }"
                  >
                    <i class="fas power-off" aria-hidden="true"></i>

                    Logout</nuxt-link
                  >
                </li>

                <li v-show="!loggedIn">
                  <nuxt-link :to="{ path: '/client/login' }">
                    <i class="fa fa-user" aria-hidden="true"></i>

                    Login/
                  </nuxt-link>
                  <nuxt-link
                    style="padding: 0"
                    title="Registration"
                    :to="{ path: '/registration' }"
                  >Register</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- header inner -->
      <div class="header-inner">
        <div class="container">
          <div class="row">
            <div class="col-sm-3 col-6 jtv-logo-block">
              <!-- Header Logo -->
              <div class="logo">
                <nuxt-link :to="{ path: '/' }" :title="getSettings.meta_title">
                  <img
                    class="site_logo"
                    :alt="getSettings.meta_title"
                    src="/logo.png"
                  />
                </nuxt-link>
              </div>
            </div>
            <div class="d-none d-sm-block col-sm-6 jtv-top-search">
              <!-- Search -->

              <div class="top-search">
                <div id="search">
                <suggestions
                    v-model="searchQuery"
                    :options="options"
                    :onItemSelected="onSearchItemSelected"
                    :onInputChange="onInputChange"
                    @keyDown="onInputKeyDown"
                  >
                    <div slot="item" slot-scope="props" class="single-item">
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-2">
                            <img
                              :src="
                                `${$axios.defaults.baseURL}` +
                                props.item.feature_image
                              "
                              width="40px"
                              height="40px"
                              :alt="props.item.pro_name"
                              v-lazy-load
                            />
                          </div>
                          <div class="col-md-6">
                            {{ props.item.pro_name }}
                          </div>
                          <div class="col-md-4 search_item_list">
                            <span style="color: red"
                              >(Save {{ props.item.discount_amount }}
                              <span v-show="props.item.discount_type == 2"
                                >%</span
                              >
                              <span v-show="props.item.discount_type == 1">Taka</span>)
                            </span>
                            <span class="name"
                              >Tk {{ props.item.discount_price }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </suggestions>
                </div>
              </div>

              <!-- End Search -->
            </div>
            <div class="col-6 col-sm-3 top-cart row">
              <div class="col-sm-5 col-5" style="padding: 0px">
                <a :href="'tel:' + getSettings.help_number" class="helpdesk">
                  <div class="link-account row" style="float: right">
                    <div class="col-sm-3" style="text-align: right">
                      <i class="fa fa-user-circle fa-2x"></i>
                    </div>
                  </div>
                </a>
              </div>

              <div class="col-sm-7 col-7" style="padding: 0px">
                <div class="top-cart-contain">
                  <div class="mini-cart">
                    <div
                      data-toggle="dropdown"
                      data-hover="dropdown"
                      class="basket dropdown-toggle"
                    >
                      <a href="#" @click="close">
                        <div class="cart-icon">
                          <i
                            class="fa fa-cart-plus fa-2x"
                            aria-hidden="true"
                          ></i>

                          <span class="cart-total">{{
                            $store.state.cartCount
                          }}</span>
                        </div>
                        <div class="shoppingcart-inner d-none d-sm-block">
                          <span class="cart-title"
                            >Tk {{ priceFormate(totalPrice) }}</span
                          >
                        </div>
                      </a>
                    </div>
                    <div>
                      <Cart v-show="close_cart"></Cart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

</template>
<script>
import axios from "~/plugins/axios";
import Cart from "~/components/Cart";
import Cookies from "js-cookie";
import Suggestions from "./Suggestions";
export default {
  components: {
    Cart,
    Suggestions,
  },
  data() {
    return {
      cart: [],
      searchQuery: "",
      mobileView: true,
      close_cart: true,
      count: 0,
      window: {
        width: 0,
        height: 0,
      },
      selectedSearchItem: null,
      options: {
        placeholder: "What are you looking for? Please search in english!",
      },
      routes: {
        // UNLOGGED
        unlogged: [
          { name: "Register", path: "register" },
          { name: "Login", path: "login" },
        ],
        // LOGGED USER
        user: [{ name: "Dashboard", path: "dashboard" }],
      },
    };
  },
  created() {
      this.siteSettings();
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

  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    getSettings() {
      return this.$store.getters.getSiteSettings;
    },
    items() {
      return this.$store.state.cart;
    },

    totalPrice() {
      var total = 0;
      this.$store.state.cart.forEach((item) => {
        total += parseInt(item.discount_price * item.quantity);
      });
      this.$store.commit("setTotall", total);
      return total;
    },
    getUser() {
      if (this.$store.dispatch("login", Cookies.get("access_token")) == true) {
        return true;
      }
      return false;
    },
  },
  methods: {
    siteSettings() {
      axios.get("/api/site-settings").then((response) => {
        this.$store.commit("setSiteSettings", response.data.data);
      });
    },
    close() {
      this.count++;
      if (this.mobileView) {
        if (this.count % 2 == 0) {
          this.close_cart = false;
        } else {
          this.close_cart = true;
        }
      }
    },
    onInputKeyDown() {},
    onInputChange(query) {
      if (query.trim().length === 0) {
        return null;
      }

      const url = `/api/search/${query}`;
      return new Promise((resolve) => {
        axios.get(url).then((response) => {
          const items = [];
          response.data.data.forEach((item) => {
            if (item) {
              items.push(item);
            }
          });
          resolve(items);
        });
      });
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
    onSearchItemSelected(item) {
      this.searchQuery = "";
      this.$router.push("/product/" + item.slug);
    },
    addCartItem(item) {
      this.$store.commit("addToCart", item);
    },
    wishlist() {
      if (this.loggedIn) {
        this.$router.push("/customer/my-wishlist");
      } else {
        this.$router.push("/client-login");
      }
    },
    reoveItem(index) {
      this.cart.splice(index, 1);
    },
    logout() {
      this.$store.LogoutUser();
    },
    url_slug(value) {
      value = value.replace(/-+/g, "&&").replace(/\s+/g, "-");

      return value;
    },
  },
};
</script>
<style scoped>
.dropdown-toggle::after {
  display: none;
}

.helpdesk {
  color: #e40514;
  position: relative;
  font-size: 14px;
}
.link-account {
  color: #e40514;
}
.cart-icon {
  color: #e40514;
}
.top-cart-contain {
  padding: 0px;
  color: #333;
  margin-top: 0px;
  float: left;
  margin-left: 0px;
  height: 40px;
}
.v-suggestions {
  border: 2px solid #e83f33;
  display: inline-block;
  width: 100%;
  height: 50px;
  background: #fff;
}

.top-cart-contain .mini-cart:hover .top-cart-content {
  z-index: 9999999999;
}
.actions {
  font-size: 1.5em;
  height: 40px;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  color: #585858;
}
.search_item_list span {
  font-size: 14px;
  font-weight: 600;
}
@media screen and (max-width: 480px) {
  img.site_logo {
    width: 80%;
  }

  .top-cart {
    margin-top: 10px;
  }
}


</style>
