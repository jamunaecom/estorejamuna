<template>
  <div class="main">
    <div class="breadcrumbs">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <ul>
              <li class="home">
                <nuxt-link :to="{path:'/'}">Home</nuxt-link>
                <span>&raquo;</span>
              </li>
              <li>
                <strong>Payment</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumbs End -->

    <!-- Main Container -->
    <section class="main-container col2-right-layout">
      <div class="main container">
        <div class="row">
          <div class="col-main col-sm-6 offset-sm-3">
            <div class="page-content checkout-page">
                    <h4 class="title">Payment</h4>
                    
                      <div class="col-sm-12 margin-top-20 margin-bottom-40">
                <div class="checkout-page">
                  <h4 class="checkout-sep">Order Review</h4>

                  <div class="box-border" style>
                      <div class="table-responsive">
                        <table class="table table-bordered cart_summary">
                          <thead>
                            <tr>
                              <th class="cart_product">Product</th>
                              <th>Description</th>
                              <th>Unit price</th>
                              <th class="text-center">Qty</th>
                              <th class="text-center">Total</th>
                              <th class="action text-center">
                                <i class="fa fa-trash"></i>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,index) in orderDetails.products" :key="index">
                              <td class="cart_product">
                                <nuxt-link :to="{path:'/product/'+item.slug}">
                                  <img
                                    :src="filePath+item.feature_image"
                                    :alt="item.pro_name"
                                    width="65"
                                  />
                                </nuxt-link>
                              </td>
                              <td class="cart_description">
                                <p class="product-name">
                                  <nuxt-link
                                    :to="{path:'/product/'+item.slug}"
                                  >{{item.pro_name}}</nuxt-link>
                                </p>
                                <!-- <small>
                            <a href="#">Color : Beige</a>
                          </small>
                          <br />
                          <small>
                            <a href="#">Size : S</a>
                                </small>-->
                              </td>

                              <td class="price">
                                <span>৳{{item.discount_price}}</span>
                              </td>
                              <td class="qty">
                                <span >{{item.quantity}}</span>
                               
                              </td>
                              <td class="price">
                                <span>৳{{formatPrice(item.discount_price * item.quantity)}}</span>
                              </td>
                             
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr >
                              <td colspan="2"></td>
                              <td colspan="2">Sub Total</td>
                              <td colspan="2">৳{{formatPrice(orderDetails.grand_total)}}</td>
                            </tr>
                            <tr v-if="dis_status">
                              <td colspan="2"></td>
                              <td colspan="2">DisCount</td>
                              <td colspan="2">৳{{formatPrice(discount)}}</td>
                            </tr>
                            <tr>
                              <td colspan="2"></td>
                              <td colspan="2" class="title is-6">Total</td>
                                <td colspan="2">৳ {{formatPrice(price == 0 ? orderDetails.grand_total : price)}}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                     
                  </div>
                </div>
              </div>

<div class="row">

 
</div>
              <form action="https://erp.estorejamuna.com/city_pay" method="post" v-if="orderDetails.payment_method == 2">
              <div class="box-border">
                 <input type="hidden" name="order_id" :value="orderDetails.order_id">
                 <input type="hidden" name="total_amount" :value="formatPrice(price == 0 ? orderDetails.grand_total : price)">
                    <div class="col-sm-6">
                        <label class="required">
                          Select Bank&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <v-select
                          :options="bank_list"
                          placeholder="Select Your Location"
                          v-model="bank"
                          @input="findCard"
                        ></v-select>
                      </div>
                      <div class="col-sm-6">
                        <label class="required">
                          Select Card&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <v-select
                          :options="cards"
                          v-model="card"
                          placeholder="Select Your Area"
                          @input="show_details"
                        ></v-select>
                      </div>
               <input
                    type="submit"
                    style="float:right"
                    class="button is-success is-fullwidth"
                    value="Pay Now"
                     :disabled="disabled == 0"
                  />
                </div>
              </form>
                <form action="https://erp.estorejamuna.com/bkash_pay" method="post" v-else-if="orderDetails.payment_method == 3">
              <div class="box-border">
                 <input type="hidden" name="order_id" :value="orderDetails.order_id">
                 <input type="hidden" name="total" :value="formatPrice(price == 0 ? orderDetails.grand_total : price)">
               <input
                    type="submit"
                    style="float:right"
                    class="button is-success is-fullwidth"
                    value="Pay Now"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Main Container End -->
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import Swal from "sweetalert2";
export default {
   head () {
    return {
      title: 'Order Confirmation|Jamuna Electronics ',
      meta: [
        { hid: 'description', name: 'description', content: 'Order Confirmation. Jamuna Electronics' }
      ]
    }
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      order_id: "",
      total_amount:'',
      bank_list:[],
      bank:'',
      cards:[],
      offers:null,
      card:'',
      card_field:false,
      price:0,
      disabled:0,
      discount:0,
      dis_status:false
    };
  },
  mounted: function() {
    this.order_confirm();
    this.banks();
  },
  computed: {
      orderDetails(){
          return this.$store.getters.getOrderDetails
      },
  },
  methods: {
    order_confirm() {

           this.$store.commit("clearcart");
      },

      banks(){
        this.disabled=0;

          axios.get("/api/bank-list").then(response => {
        this.bank_list = response.data;
      });
      },

      findCard(){

        this.disabled=0;
    axios.get("/api/bank-cards/"+this.bank).then(response => {
        this.cards = response.data;
    });
      },

       show_details(){

          axios.get("/api/bank-offers/"+this.bank+'/'+this.card).then(response => {
        this.offers = response.data;


           if(this.offers && this.offers != null  ){

if(this.offers.discount_type == 1){
        
        this.discount =  this.orderDetails.grand_total*(this.offers.discount_amount/100);
        this.dis_status=true;
          this.price = this.orderDetails.grand_total - this.discount

        }else{

        this.dis_status=true;
          this.price = this.orderDetails.grand_total - this.offers.discount_amount

        }

        this.disabled=1;
      }

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
    },
}
</script>
<style scoped>

</style>
