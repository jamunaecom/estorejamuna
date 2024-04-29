c    <template>
  <div class="main-container">
    <section class="main-container col2-right-layout">
      <div class="main container">
        <div class="row">
          <aside class="right sidebar col-sm-3 col-xs-12">
            <ClientSidebar></ClientSidebar>
          </aside>
          <div class="col-main col-sm-9 col-xs-12">
            <div class="my-account">
              <div class="page-title">
                <h2>My Dashboard</h2>
              </div>

              <div class="dashboard">
                <section class="main-content columns is-fullheight">
                  <div class="column is-4">
                    <nuxt-link :to="{path:'/customer/my-order'}">
                      <div class="box">
                        <article class="media">
                          <div class="media-left">
                            <figure class="image is-32x32">
                               <i class="fa fa-shopping-cart fa-3x" aria-hidden="true"></i> 
                               <!--<font-awesome-icon :icon="['fas', 'shopping-cart']" style="font-size:30px" />-->

                            </figure>
                          </div>
                          <div class="media-content">
                            <div class="content text-center">
                              <strong>Orders</strong>
                              <h5
                                class="is-subtitle"
                              >{{dashboardData.orders ? dashboardData.orders : 0}}</h5>
                              <br />
                            </div>
                          </div>
                        </article>
                      </div>
                    </nuxt-link>
                  </div>

                  <div class="column is-4">
                    <nuxt-link :to="{path:'/customer/my-wishlist'}">
                      <div class="box">
                        <article class="media">
                          <div class="media-left">
                            <figure class="image is-32x32">
                               <i class="fa fa-heart fa-3x" aria-hidden="true"></i> 
                               <!--<font-awesome-icon :icon="['fas', 'heart']" style="font-size:30px" />-->

                            </figure>
                          </div>
                          <div class="media-content">
                            <div class="content text-center">
                              <strong>Wishlist</strong>
                              <h5
                                class="is-subtitle"
                              >{{ dashboardData.wishlist ? dashboardData.wishlist :0}}</h5>
                              <br />
                            </div>
                          </div>
                        </article>
                      </div>
                    </nuxt-link>
                  </div>
                  <div class="column is-4">
                    <nuxt-link :to="{path:'/customer/my-cart'}">
                      <div class="box">
                        <article class="media">
                          <div class="media-left">
                            <figure class="image is-32x32">
                               <i class="fa fa-cart-plus fa-3x" aria-hidden="true"></i> 
                   <!--<font-awesome-icon :icon="['fas', 'cart-plus']" style="font-size:30px"/>-->

                            </figure>
                          </div>
                          <div class="media-content">
                            <div class="content text-center">
                              <strong>Cart</strong>
                              <h5 class="is-subtitle">{{ $store.state.cartCount }}</h5>
                              <br />
                            </div>
                          </div>
                        </article>
                      </div>
                    </nuxt-link>
                  </div>
                  <!-- <div class="column is-3">
                    <div class="box">
                      <article class="media">
                        <div class="media-left">
                          <figure class="image is-32x32">
                            <i class="fa fa-bell fa-2x" aria-hidden="true"></i>
                          </figure>
                        </div>
                        <div class="media-content">
                          <div class="content text-center">
                            <strong>Newsletter</strong>
                            <h5 class="is-subtitle">5</h5>
                            <br />
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>-->
                </section>

                <div class="recent-orders">
                  <div class="title-buttons">
                    <strong>Recent Orders</strong>
                  </div>
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th class="th-delate">Order ID</th>
                          <th class="th-product">Date</th>
                          <th class="th-details">Totall Price</th>
                          <th class="th-price">Status</th>
                          <th class="th-price">Payment Method</th>
                          <th class="th-total th-add-to-cart">Tracking Status</th>
                          <th class="th-total th-add-to-cart">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(order,key) in orders.slice(0, 5)" :key="key">
                          <td class="th-delate">
                            <nuxt-link
                              :to="{path:'/customer/order/'+order.order_id}"
                            >{{order.order_id}}</nuxt-link>
                          </td>
                          <td
                            class="th-product"
                          >{{ $moment(String(order.created_at)).format("MMM Do YYYY, h:mm a")}}</td>
                          <td class="th-details">{{formatPrice(order.grand_total)}}</td>
                          <td class="th-price">
                            <span
                              class="tag is-danger"
                              v-if="order.status == 'Failed'"
                            >{{order.status}}</span>
                            <span
                              class="tag is-warning"
                              v-if="order.status == 'Shipment'"
                            >{{order.status}}</span>
                            <span
                              class="tag is-success"
                              v-if="order.status == 'Deliveried'"
                            >{{order.status}}</span>
                            <span
                              class="tag is-success"
                              v-else-if="order.status == 'Success'"
                            >{{order.status}}</span>
                            <span
                              class="tag is-primary"
                              v-else-if="order.status == 'Processing'"
                            >{{order.status}}</span>
                            <span
                              class="tag is-info"
                              v-else-if="order.status == 'Pending'"
                            >{{order.status}}</span>
                          </td>
                          <td class="th-price">
                            <span
                              class="tag is-info"
                              v-if="order.payment_method == 0 "
                            >Cash on Delivary</span>
                            <span
                              class="tag is-primary"
                              v-else-if="order.payment_method == 1 "
                            >Online Payment</span>
                            <span
                              class="tag is-primary"
                              v-else-if="order.payment_method == 2 "
                            >City Bank Payment</span>
                            
                               <span
                              class="tag is-primary"
                              v-else-if="order.payment_method == 3"
                            >Bkash</span>
                            
                              <span
                              class="tag is-primary"
                              v-else-if="order.payment_method == 4"
                            >Rocket</span>
                            
                              <span
                              class="tag is-primary"
                              v-else-if="order.payment_method == 5"
                            >Upay</span>
                          </td>
                          <th class="td-add-to-cart">
                            <span class="tag is-info">{{order.tracking_status}}</span>
                          </th>
                          <th
                            class="td-add-to-cart"
                            v-if="order.payment_status == 'Failed' || order.payment_status == 'Cancel'|| order.payment_status == 'Pending' && order.payment_method != 0"
                          >
                            <form action="https://erp.estorejamuna.com/bkash_pay" method="post" @submit.prevent="submitItem()"  id="myform" v-if="order.payment_method == 3">
                              <div class="box-border">
                                <input type="hidden" name="order_id" :value="order.order_id" />
                                <input type="hidden" name="total" :value="order.grand_total" />

                                <input
                                  type="submit"
                                  style="float:right"
                                  class="button is-success is-small"
                                  value="Pay"
                                />
                              </div>
                            </form>
                             <form action="https://erp.estorejamuna.com/city_pay" method="post" @submit.prevent="submitItem()" id="myform" v-else-if="order.payment_method == 2">
                              <div class="box-border">
                 <input type="hidden" name="order_id" :value="order.order_id">
                 <input type="hidden" name="total_amount" :value="order.grand_total">

                  <input
                    type="submit"
                    style="float:right"
                    class="button is-success is-small"
                    value="Pay"
                  />
                </div>
                             </form>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    <nuxt-link
                      class="button is-small is-primary"
                      :to="{path:'/customer/my-order/'}"
                      style="float:right"
                    >See All</nuxt-link>
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
import Swal from "sweetalert2";

export default {
  head() {
    return {
      title: "Dashboard|Jamuna Electronics ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "User Dashboard. Jamuna Electronics"
        }
      ]
    };
  },
  middleware: "auth",
  components: {
    ClientSidebar
  },
  data() {
    return {
      columns: ["order_id", "created_at", "status", "grand_total"],
      tableData: [],
      options: {
        headings: {
          id: "OrderID",
          name: "Order Date",
          album: "Status",
          album: "Total Price"
        },
        sortable: ["order_id", "created_at", "status"],
        filterable: ["order_id", "created_at", "status"]
      }
    };
  },
  mounted() {
    this.myOrders();
    this.dashboardView();
    this.orderInfo();
  },
  computed: {
    dashboardData() {
      return this.$store.getters.getCustomerData;
    },
    orders() {
      return this.$store.getters.getCustomerOrders;
    },
     order_details(){
return this.$store.getters.getOrderDetails;
    }
  },
  methods: {
       submitItem(order){
       this.$store.commit('setOrderDetails',order)
          document.getElementById("myform").submit();
     },
    orderInfo() {
      if (this.order_details != null) {
        axios.get("/api/order/" + this.order_details.order_id).then(response => {
          if (response.data.payment_status == "Processing") {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Transection Success!"
            });
          } else if (response.data.payment_status == "Failed" && response.data.payment_method == 3) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Transection Failed!"
            });
          }
           else if (response.data.payment_status == "Failed") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Transection Failed!"
            });
          }
          else if (response.data.payment_status == "Cancel") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Transection Cancel!"
            });
          }
        });
        this.alert();
      }
    },
    alert() {
      setTimeout(() => {
      this.$store.commit('setOrderDetails',null)
      }, 10000);
    },
    dashboardView() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      axios
        .get("/api/customer/dashboard")
        .then(response => {
          this.$store.commit("setCustomerData", response.data);
        })
        .catch(error => {
          toast.error(error.response.data.message);
        });
    },
    myOrders() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      axios
        .get("/api/my-orders")
        .then(response => {
          this.$store.commit("setCustomerOrders", response.data);
        })
        .catch(error => {
          toast.error(error.response.data.message);
        });
    },
        formatPrice(value) {
      let val = Math.round(value).toFixed(2);
      return val;
    },
  }
};
</script>

    <style scoped>
.image.is-32x32 {
  color: #e40514;
}
</style>