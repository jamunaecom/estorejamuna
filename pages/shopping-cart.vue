<template>
  <div class="main-container">
    <section class="main-container col1-layout">
      <div class="main container">
        <div class="col-main">
          <div class="cart">
            <div class="page-order">
              <div class="page-title">
                <h2>Shopping Cart</h2>
              </div>

              <div class="order-detail-content">
                <div class="table-responsive">
                  <table class="table table-bordered cart_summary">
                    <thead>
                      <tr>
                        <th class="cart_product">Product</th>
                        <th>Description</th>
                        <th>Avail.</th>
                        <th>Unit price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th class="action">
                          <i class="fa fa-trash"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,key) in items" :key="key">
                        <td class="cart_product">
                          <nuxt-link :to="{path:'/product/'+item.slug}">
                            <img
                              :src="filePath+item.feature_image"
                              :alt="item.pro_name"
                              width="650px"
                            />
                          </nuxt-link>
                        </td>
                        <td class="cart_description">
                          <p class="product-name">
                            <nuxt-link :to="{path:'/product/'+item.slug}">{{item.pro_name}}</nuxt-link>
                          </p>
                          <small>Color : Default</small>
                          <small>Size : Default</small>
                        </td>
                        <td class="availability in-stock">
                          <span class="label">In stock</span>
                        </td>
                        <td class="price">
                          <span>TK {{item.discount_price}}</span>
                        </td>
                        <td class="qty">
                          <span>
                            <button class="btn btn-sm btn-info" @click="decrement(item)">-</button>
                          </span>
                          <span :v-model="item.quantity">{{item.quantity}}</span>
                          <button class="btn btn-sm btn-info" @click="increment(item)">+</button>
                          <span></span>
                        </td>
                        <td class="price">
                          <span>TK {{priceFormate(item.discount_price * item.quantity)}}</span>
                        </td>
                        <td class="action">
                          <a @click="removeItem(key)" title="Remove">
                            <i class="fa fa-times-circle" aria-hidden="true"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2" rowspan="2"></td>
                        <td colspan="3">Total:</td>
                        <td colspan="2">TK {{ priceFormate(totalPrice) }}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="cart_navigation">
                  <nuxt-link class="continue-btn" :to="{path:'/'}">
                    <i class="fa fa-arrow-left"></i>
                    &nbsp; Continue shopping
                  </nuxt-link>

                  <a class="checkout-btn" @click="checkout">
                    <i class="fa fa-check"></i>
                    <span>Checkout</span>
                  </a>
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
import Swal from "sweetalert2";
export default {
  head() {
    return {
      title: "Shopping Cart| Jamuna Electronics ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Shopping Cart Details. Jamuna Electronics"
        }
      ]
    };
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      isLoading: false,
      fullPage: true
    };
  },
  computed: {
    items() {
      return this.$store.state.cart;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    totalPrice() {
      var self = this;
      var total = 0;
      this.items.forEach(item => {
        total += parseInt(item.discount_price * item.quantity);
      });
      // this.$store.commit("setTotall",total);
      return total;
    }
  },
  methods: {
    checkout() {
      if (this.items.length >= 1) {
        if (this.loggedIn) {
          this.$router.push("/checkout/delivery-details");
        } else {
          this.$router.push("/checkout");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps",
          timer: 5000,
          text: "No Item In Cart"
        });
      }
    },
    removeItem(index) {
      this.$store.commit("itemRemove", index);
    },
       priceFormate(price){
      return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(price);
    },
    url_slug(value) {
      value = value.replace(/^\s+|\s+$/g, ""); // trim
      value = value.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
      var to = "aaaaaeeeeeiiiiooooouuuunc------";
      for (var i = 0, l = from.length; i < l; i++) {
        value = value.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      value = value
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return value;
    },
    decrement(item) {
      this.$store.commit("itemDecrement", item);
    },
    increment(item) {
      this.$store.dispatch("addToCart", item);
   
    }
  }
};
</script>
<style scoped>
.block_article {
  width: 500px;
  height: 250px;
  background-size: cover;
  line-height: 230px;
  text-align: center;
  border-radius: 10px;
}

.block_article span {
  color: white;
  text-shadow: 2px 2px black;
  font-size: 1.3em;
}
@media only screen and (min-width: 360px) and (max-width: 768px) {
  .page-content {
    width: 100%; 
     margin-left: 0; 
}
.page-order .cart_navigation a.checkout-btn {
    float: right;
    background: #e40514;
    color: #fff;
    border: 1px solid #e40514;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 5px;
    border-radius: 3px;
    text-transform: uppercase;
}
}
</style>