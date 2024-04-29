<template>
  <div class="main-container">
    <section class="main-container col2-right-layout">
      <div class="main container" v-if="orderDetails">
        <div class="row">
          <aside class="right sidebar col-sm-3 col-xs-12">
            <ClientSidebar></ClientSidebar>
          </aside>
          <div class="col-main col-sm-7 col-xs-12">
            <div class="my-account" ref="content">
              <img
                alt="Jamuna Electronics"
                title="Jamuna Electronics"
                :src="`${$axios.defaults.baseURL}/images/logo.png`"
              />
              <div class="page-title">
                <h2>
                  Order id:
                  <span class="text-warning">{{ order_id }}</span>
                </h2>
              </div>
              <div class="dashboard">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="th-product">Images</th>
                        <th class="th-details">Product Name</th>
                        <th class="th-price">Unit Price</th>
                        <th class="th-price">Quentity</th>
                        <th class="th-total th-add-to-cart">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, key) in orderDetails.products"
                        :key="key"
                      >
                        <td class="th-product">
                          <nuxt-link :to="{ path: '/product/' + item.slug }">
                            <img
                              :src="filePath + item.feature_image"
                              :alt="item.pro_name"
                              width="65px"
                            />
                          </nuxt-link>
                        </td>
                        <td class="th-details">
                          <nuxt-link :to="{ path: '/product/' + item.slug }">{{
                            item.pro_name
                          }}</nuxt-link>
                        </td>
                        <td class="th-price">৳{{ item.discount_price }}</td>
                        <td class="th-price">{{ item.quantity }}</td>
                        <th class="td-add-to-cart">
                          ৳{{ item.quantity * item.discount_price }}
                        </th>
                      </tr>
                      <tr>
                        <td colspan="2"></td>
                        <td colspan="2">Total:</td>
                        <td colspan="1">৳{{ formatPrice(totalPrice) }}</td>
                      </tr>
                      <tr v-if="coupon_apply">
                        <td colspan="2"></td>
                        <td colspan="2">Coupon:</td>
                        <td colspan="1">৳{{ formatPrice(discount) }}</td>
                      </tr>
                      <tr>
                        <td colspan="2"></td>
                        <td colspan="2">Grand Total:</td>
                        <td colspan="1">
                          ৳{{ formatPrice(orderDetails.grand_total) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    class="table table-bordered cart_summary table-striped"
                  >
                    <tbody>
                      <tr>
                        <td class="order-number">Order Number</td>
                        <td data-title="Order Number">
                          {{ orderDetails.order_id }}
                        </td>
                      </tr>
                      <tr>
                        <td class="order-number">Order Date</td>
                        <td data-title="Order Date">
                          {{
                            $moment(String(orderDetails.created_at)).format(
                              "MMM Do YYYY, h:mm a"
                            )
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td class="order-number">Order Status</td>
                        <td data-title="Order Status">
                          <span
                            class="tag is-danger"
                            v-if="orderDetails.status == 'Failed'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class="tag is-success"
                            v-if="orderDetails.status == 'Deliveried'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class="tag is-warning"
                            v-if="orderDetails.status == 'Shipment'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class="tag is-success"
                            v-else-if="orderDetails.status == 'Success'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class="tag is-primary"
                            v-else-if="orderDetails.status == 'Processing'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class="tag is-info"
                            v-else-if="orderDetails.status == 'Pending'"
                            >{{ orderDetails.status }}</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td class="order-number">Payment</td>
                        <td data-title="Payment">
                          <span
                            class="tag is-info"
                            v-if="orderDetails.payment_method == 0"
                            >Cash on Delivary</span
                          >
                          <span
                            class="tag is-primary"
                            v-else-if="orderDetails.payment_method == 1"
                            >Online Payment</span
                          >
                          <span
                            class="tag is-primary"
                            v-else-if="orderDetails.payment_method == 2"
                            >City Bank Payment</span
                          >

                          <span
                            class="tag is-primary"
                            v-else-if="orderDetails.payment_method == 3"
                            >Bkash</span
                          >

                          <span
                            class="tag is-primary"
                            v-else-if="orderDetails.payment_method == 4"
                            >Rocket</span
                          >

                          <span
                            class="tag is-primary"
                            v-else-if="orderDetails.payment_method == 5"
                            >Upay</span
                          >
                        </td>
                      </tr>
                      <tr>
                        <td class="order-number">Comment</td>
                        <td data-title="Comment">{{ orderDetails.comment }}</td>
                      </tr>
                      <tr>
                        <td class="order-number">Coupon</td>
                        <td data-title="Comment">
                          {{
                            coupon(
                              orderDetails.coupon_type,
                              orderDetails.coupon_discount
                            )
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td class="order-number">Total</td>
                        <td data-title="Total">
                          <p>৳{{ formatPrice(orderDetails.grand_total) }}</p>
                        </td>
                      </tr>
                      <tr>
                        <td class="order-number">Tracking</td>
                        <td data-title="Total">
                          <span
                            class=""
                            v-if="orderDetails.tracking_status == 'Pending'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class=""
                            v-if="orderDetails.tracking_status == 'Processing'"
                            >Pending > {{ orderDetails.status }}</span
                          >
                          <span
                            class=""
                            v-if="orderDetails.status == 'Shipment'"
                            >Pending > Processing >
                            {{ orderDetails.status }}</span
                          >
                          <span
                            class=""
                            v-if="orderDetails.status == 'Deliveried'"
                            >{{ orderDetails.status }}</span
                          >
                          <span
                            class=""
                            v-else-if="orderDetails.status == 'Success'"
                            >Pending > Processing > On Shipping >
                            {{ orderDetails.status }}</span
                          >
                        </td>
                      </tr>
                      <tr
                        v-if="
                          orderDetails.payment_status == 'Failed' ||
                          orderDetails.payment_status == 'Cancel' ||
                          (orderDetails.payment_status == 'Pending' &&
                            orderDetails.payment_method != 0)
                        "
                      >
                        <th class="th-total th-add-to-cart">Action</th>
                        <td data-title="Total">
                          <form
                            action="https://erp.estorejamuna.com/bkash_pay"
                            method="post"
                            v-if="orderDetails.payment_method == 3"
                          >
                            <div class="box-border">
                              <input
                                type="hidden"
                                name="order_id"
                                :value="orderDetails.order_id"
                              />
                              <input
                                type="hidden"
                                name="total"
                                :value="orderDetails.grand_total"
                              />

                              <input
                                type="submit"
                                class="button is-success is-big"
                                value="Pay"
                              />
                            </div>
                          </form>

                          <form
                            action="https://erp.estorejamuna.com/city_pay"
                            method="post"
                            v-else-if="orderDetails.payment_method == 2"
                          >
                            <div class="box-border">
                              <input
                                type="hidden"
                                name="order_id"
                                :value="orderDetails.order_id"
                              />
                              <input
                                type="hidden"
                                name="total_amount"
                                :value="orderDetails.grand_total"
                              />

                              <input
                                type="submit"
                                style="float: right"
                                class="button is-success is-small"
                                value="Pay"
                              />
                            </div>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-md-6 col-sm-6">
                    <div class="page-title">
                      <h2>Bill To</h2>
                    </div>

                    <table class="table table-bordered cart_summary">
                      <tbody>
                        <tr>
                          <td>E-Mail</td>
                          <td data-title="E-Mail">{{ orderDetails.email }}</td>
                        </tr>
                        <tr>
                          <td>Biller Name</td>
                          <td data-title="Company Name">
                            {{ orderDetails.full_name }}
                          </td>
                        </tr>

                        <tr>
                          <td>Address</td>
                          <td data-title="Address 1">
                            {{ orderDetails.address }}
                          </td>
                        </tr>
                        <tr>
                          <td>Police Station/Region</td>
                          <td data-title="Zip / Postal Code">
                            {{ orderDetails.area }}
                          </td>
                        </tr>
                        <tr>
                          <td>City/District</td>
                          <td data-title="City">{{ orderDetails.district }}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td data-title="Phone">
                            {{ orderDetails.phone_number }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-xs-12 col-md-6 col-sm-6">
                    <div class="page-title">
                      <h2>Ship To</h2>
                    </div>

                    <table class="table table-bordered cart_summary">
                      <tbody>
                        <tr>
                          <td>E-Mail</td>
                          <td data-title="E-Mail">{{ orderDetails.email }}</td>
                        </tr>
                        <tr>
                          <td>Biller Name</td>
                          <td data-title="Company Name">
                            {{ orderDetails.full_name }}
                          </td>
                        </tr>

                        <tr>
                          <td>Address</td>
                          <td data-title="Address 1">
                            {{ orderDetails.address }}
                          </td>
                        </tr>
                        <tr>
                          <td>Police Station/Region</td>
                          <td data-title="Zip / Postal Code">
                            {{ orderDetails.area }}
                          </td>
                        </tr>
                        <tr>
                          <td>City/District</td>
                          <td data-title="City">{{ orderDetails.district }}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td data-title="Phone">
                            {{ orderDetails.phone_number }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="margin-bottom-40">
              <a
                class="
                  button
                  is-small is-primary is-pulled-right
                  margin-bottom-40
                "
                @click="pdf"
                >Download Pdf</a
              >
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
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  head() {
    return {
      title: "Order Details| Jamuna Electronics ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Order Details. Jamuna Electronics",
        },
      ],
    };
  },
  components: {
    ClientSidebar,
  },
  data() {
    return {
      filePath: "https://erp.estorejamuna.com",
      isLoading: false,
      fullPage: true,
      coupon_apply: false,
      orderDetails: null,
      order_id: this.$route.params.id,
    };
  },
  created() {
    this.isLoading = true;
  },
  mounted() {
    this.myOrderDetails();
  },
  computed: {
    // products() {
    //   return this.orderDetails.products;
    // },
    totalPrice() {
      var self = this;
      var total = 0;
      this.orderDetails.products.forEach((item) => {
        total += parseInt(item.discount_price * item.quantity);
      });
      // this.$store.commit("setTotall",total);
      return total;
    },
    discount() {
      return this.$store.getters.getDiscount;
    },
  },
  methods: {
    myOrderDetails() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.token;
      axios
        .get("/api/myorder/" + this.order_id)
        .then((response) => {
          this.isLoading = false;
          this.orderDetails = response.data.data;
        })
        .catch((error) => {});
    },

    pdf() {
      const doc = new jsPDF();
      /** WITH CSS */
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function (
        canvas
      ) {
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "JPEG", 20, 20);
        doc.save("Jamuna Ecommerce.pdf");
      });
    },
    formatPrice(value) {
      let val = Math.round(value).toFixed(2);
      return val;
    },
    coupon(type, amount) {
      if (type != null && amount != null) {
        this.coupon_apply = true;
        if (type === "Fixed") {
          this.$store.commit("setDiscount", amount);
          type = " Taka";
        } else {
          let discount = this.totalPrice * (amount / 100);
          this.$store.commit("setDiscount", discount);
          type = "%";
        }

        return amount + type + " Less From Totall.";
      } else {
        return "No Coupon Apply";
      }
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
  },
};
</script>