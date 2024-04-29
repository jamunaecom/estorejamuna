<template>
  <div class="main-container">
    <!-- Breadcrumbs -->
    <div class="breadcrumbs">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <ul>
              <li class="home">
                <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
                <span>&raquo;</span>
              </li>
              <li>
                <strong>Order Invoice</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="wishlist_page_bg">
      <div class="container mt-4">
        <div class="col-sm-10 offset-sm-1">
          <div class="box" slot="pdf-content">
            <img
              alt="Jamuna Electronics"
              title="Jamuna Electronics"
              style="float: right"
              :src="`${$axios.defaults.baseURL}/images/logo.png`"
            />
            <p class="card-header-title">Order Received</p>

            <p>Thank you. Your order has been received</p>
        


                      <div class="column is-full" v-if="order">
              <table class="table is-fullwidth is-borderless">
                <tbody>
                  <tr class="columns">
                    <td class="column is-one-third">Order Id</td>

                    <td class="column">{{ order.order_id }}</td>
                  </tr>
                   <tr class="columns">
                    <td class="column is-one-third">Date</td>

                    <td class="column"> {{
                        $moment(String(order.created_at)).format(
                          "MMM Do YYYY, h:mm a"
                        )
                      }}</td>
                  </tr>
                   <tr class="columns">
                    <td class="column is-one-third">Total</td>

                    <td class="column">৳{{ formatPrice(order.grand_total) }}</td>
                  </tr>
                  <tr class="columns">
                    <td class="column is-one-third">Payment Method</td>

                    <td class="column">
                      <span class="tag is-info" v-if="order.payment_method == 0"
                        >Cash on Delivary</span
                      >
                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 1"
                        >Online Payment</span
                      >
                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 2"
                        >City Bank Payment</span
                      >

                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 3"
                        >Bkash</span
                      >

                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 4"
                        >Rocket</span
                      >

                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 5"
                        >Upay</span
                      >
                    </td>
                  </tr>
                  <tr class="columns">
                    <td class="column is-one-third">Status</td>

                    <td class="column">
                      {{order.status}}
                    </td>
                  </tr>

             
                </tbody>
              </table>
            </div>

            <p class="card-header-title">Order Details</p>


              <table class="table is-responsive">
    <thead>
      <tr>
        <th>Image</th>
        <th>Item</th>
        <th>Quentity</th>
        <th>Price</th>
        <th>Sub Total</th>
      </tr>
    </thead>
    <tbody  v-if="order">
      <tr 
                    v-for="(item, key) in products"
                    :key="key">
        <td>
                      <nuxt-link :to="{ path: '/product/' + item.slug }">
                        <img
                          :src="
                            filePath + item.feature_image
                          "
                          :alt="item.pro_name"
                          width="65px"
                        />
                      </nuxt-link>
                    </td>
                    <td>
                      <nuxt-link :to="{ path: '/product/' + item.slug }">{{
                        item.pro_name
                      }}</nuxt-link>
                    </td>
                    <td>{{ item.quantity }}</td>
                    <td>৳{{ item.discount_price }}</td>
                    <td>
                      ৳{{ item.quantity * item.discount_price }}
                    </td>
                  </tr>
      
    </tbody>
  </table>

            <p class="card-header-title">Total Amount</p>

            <div class="column is-full" v-if="order">
              <table class="table is-fullwidth is-borderless">
                <tbody>
                  <tr class="columns">
                    <td class="column is-one-third">Sub Total</td>

                    <td class="column">৳{{ formatPrice(order.sub_total) }}</td>
                  </tr>
                  <tr class="columns">
                    <td class="column is-one-third">Payment Method</td>

                    <td class="column">
                      <span class="tag is-info" v-if="order.payment_method == 0"
                        >Cash on Delivary</span
                      >
                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 1"
                        >Online Payment</span
                      >
                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 2"
                        >City Bank Payment</span
                      >

                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 3"
                        >Bkash</span
                      >

                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 4"
                        >Rocket</span
                      >

                      <span
                        class="tag is-primary"
                        v-else-if="order.payment_method == 5"
                        >Upay</span
                      >
                    </td>
                  </tr>
                  <tr class="columns">
                    <td class="column is-one-third">Shipping Charge</td>

                    <td class="column">
                      {{ order.shipping_charge ? order.shipping_charge : 0 }}
                    </td>
                  </tr>

                  <tr class="columns">
                    <td class="column is-one-third">Total</td>

                    <td class="column">
                      ৳{{ formatPrice(order.grand_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-sm-12 mb-2">
              <div class="row">
                <div class="col-sm-12 col-md-6"></div>
                <div class="col-sm-3 col-md-2 text-right">
                  <button
                    class="btn btn-sm btn-block btn-success text-uppercase"
                    @click="pdf"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
          <vue-html2pdf
            :manual-pagination="true"
            :float-layout="true"
            :enable-download="true"
            @hasStartedGeneration="hasStartedGeneration()"
            @hasGenerated="hasGenerated($event)"
            ref="html2Pdf"
          >
            <div class="box" slot="pdf-content">
              <p class="card-header-title text-center">
                Jamuna Electronics Order Invoice
              </p>
              <section class="pdf-item">
                <img
                  alt="Jamuna Electronics"
                  title="Jamuna Electronics"
                  style="float: right"
                  src="/images/logo.png"
                />
              </section>
              <p class="card-header-title">Order Received</p>

              <p>Thank you. Your order has been received</p>
              <div class="column is-full">
                <table class="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody v-if="order">
                    <tr>
                      <td>{{ order.order_id }}</td>
                      <td>
                        {{
                          $moment(String(order.created_at)).format(
                            "MMM Do YYYY, h:mm a"
                          )
                        }}
                      </td>
                      <td>৳{{ formatPrice(order.grand_total) }}</td>
                      <td>
                        <span
                          class="tag is-info"
                          v-if="order.payment_method == 0"
                          >Cash on Delivary</span
                        >
                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 1"
                          >Online Payment</span
                        >
                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 2"
                          >City Bank Payment</span
                        >

                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 3"
                          >Bkash</span
                        >

                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 4"
                          >Rocket</span
                        >

                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 5"
                          >Upay</span
                        >
                      </td>
                      <td>{{ order.status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p class="card-header-title">Order Details</p>

                      <div class="column is-full" v-if="order">
              <table class="table is-fullwidth is-borderless">
                <tbody>
                  <tr class="columns">
                    <!-- <td class="column">Image</td> -->
                    <td class="column">Item</td>
                    <td class="column">Quentity</td>
                    <td class="column">Price</td>
                    <td class="column">Sub Total</td>
                  </tr>

              <tr
                    class="columns"
                    v-for="(item, key) in products"
                    :key="key"
                  >
                    <!-- <td class="column">
                 
                    <img :src="filePath+item.feature_image" :alt="item.pro_name" width="65px" />

                    </td> -->
                    <td class="column">
                      <nuxt-link :to="{ path: '/product/' + item.slug }">{{
                        item.pro_name
                      }}</nuxt-link>
                    </td>
                    <td class="column">{{ item.quantity }}</td>
                    <td class="column">৳{{ item.discount_price }}</td>
                    <td class="column">
                      ৳{{ item.quantity * item.discount_price }}
                    </td>
                  </tr> 
                </tbody>
              </table>

            </div>

              <p class="card-header-title">Total Amount</p>

              <div class="column is-full" v-if="order">
                <table class="table is-fullwidth is-borderless">
                  <tbody>
                    <tr class="columns">
                      <td class="column is-one-third">Sub Total</td>

                      <td class="column">
                        ৳{{ formatPrice(order.sub_total) }}
                      </td>
                    </tr>
                    <tr class="columns">
                      <td class="column is-one-third">Payment Method</td>

                      <td class="column">
                        <span
                          class="tag is-info"
                          v-if="order.payment_method == 0"
                          >Cash on Delivary</span
                        >
                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 1"
                          >Online Payment</span
                        >
                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 2"
                          >City Bank Payment</span
                        >

                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 3"
                          >Bkash</span
                        >

                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 4"
                          >Rocket</span
                        >

                        <span
                          class="tag is-primary"
                          v-else-if="order.payment_method == 5"
                          >Upay</span
                        >
                      </td>
                    </tr>
                    <tr class="columns">
                      <td class="column is-one-third">Shipping Charge</td>

                      <td class="column">
                        {{ order.shipping_charge ? order.shipping_charge : 0 }}
                      </td>
                    </tr>

                    <tr class="columns">
                      <td class="column is-one-third">Total</td>

                      <td class="column">
                        ৳{{ formatPrice(order.grand_total) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </vue-html2pdf>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
        isLoading: false,
      fullPage: true,
      order: null,
      keywords: this.$route.query.keywords,
    };
  },

  computed: {
    products() {
      return JSON.parse(this.order.products);
    },
  },
  mounted() {
    this.fetchOrder();
  },
  methods: {
    fetchOrder() {
      var self = this;
      axios.get("/api/order/" + this.keywords).then((response) => {
        self.order = response.data;
      });
    },

    pdf() {
      this.isLoading = true;
      this.$refs.html2Pdf.generatePdf();
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
 setTimeout(() => {
       Swal.fire({
        title: "Your Order Invoice Downloaded!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok!"
      }).then(result => {
        setTimeout(() => {
          this.$store.commit("clearcart");
          this.$router.push({path:'/'});
        }, 500);
      });
       }, 2500);
    },
    formatPrice(value) {
      let val = Math.round(value).toFixed(2);
      return val;
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

<style>
.bloc_left_price {
  color: #c01508;
  text-align: center;
  font-weight: bold;
  font-size: 150%;
}
.category_block li:hover {
  background-color: #007bff;
}
.category_block li:hover a {
  color: #ffffff;
}
.category_block li a {
  color: #343a40;
}
.add_to_cart_block .price {
  color: #c01508;
  text-align: center;
  font-weight: bold;
  font-size: 200%;
  margin-bottom: 0;
}
.add_to_cart_block .price_discounted {
  color: #343a40;
  text-align: center;
  text-decoration: line-through;
  font-size: 140%;
}
.product_rassurance {
  padding: 10px;
  margin-top: 15px;
  background: #ffffff;
  border: 1px solid #6c757d;
  color: #6c757d;
}
.product_rassurance .list-inline {
  margin-bottom: 0;
  text-transform: uppercase;
  text-align: center;
}
.product_rassurance .list-inline li:hover {
  color: #343a40;
}
</style>