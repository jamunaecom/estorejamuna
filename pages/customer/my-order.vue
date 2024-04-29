    <template>
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
                <h2>My Order</h2>
              </div>
              <div class="dashboard">
                                   <input type="text" v-model="keyword" placeholder="Search Order..." @keypress="searchOrder()" style="float:right" />

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
                      <tr v-for="(order,key) in orders" :key="key">
                        <td class="th-delate">
                          <nuxt-link :to="{path:'/customer/order/'+order.order_id}">{{order.order_id}}</nuxt-link>
                        </td>
                        <td class="th-product"><p>{{ $moment(String(order.created_at)).format("MMM Do YYYY, h:mm a")}}</p></td>
                        <td class="th-details">
                          {{formatPrice(order.grand_total)}}
                        </td>
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
                          <span class="tag is-info" v-if="order.payment_method == 0 ">Cash on Delivary</span>
                          <span class="tag is-primary" v-else-if="order.payment_method == 1 ">Online Payment</span>
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
                        <th class="td-add-to-cart" v-if="order.payment_status == 'Failed' || order.payment_status == 'Cancel' || order.payment_status == 'Pending' && order.payment_method != 0">
                             <form action="https://erp.estorejamuna.com/pay" method="post" v-if="order.payment_method == 1">
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
                              <form action="https://erp.estorejamuna.com/city_pay" method="post" v-else-if="order.payment_method == 2">
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
import Vue from 'vue'
import axios from "~/plugins/axios";
import ClientSidebar from "~/components/client/sidebar";
import moment from 'moment'
export default {
             head () {
    return {
      title: 'My Orders|Jamuna Electronics ',
      meta: [
        { hid: 'description', name: 'description', content: 'User Order Page. Jamuna Electronics' }
      ]
    }
  },
    middleware: "auth",
  components: {

    ClientSidebar
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      keyword:''
    };
  },
  mounted() {
    this.myOrders();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    orders() {
      return this.$store.getters.getCustomerOrders;
    }
  },

  methods: {
    myOrders() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.token;
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
    searchOrder(){
     var self = this
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.token;
      axios.get('/api/order-search/'+this.keyword).then(response => {
        self.$store.commit('setCustomerOrders',response.data.data)
      })
    }
  }
};
</script>

