<template>
  <div class="main">
    <!-- Breadcrumbs -->

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
                <strong>Delivery Informations</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumbs End -->
    <!-- Main Container -->
    <section class="main-container col2-right-layout margin-bottom-40">
      <div class="main container">
        <form v-on:submit.prevent="order_submit">
          <div class="row">
            <div class="col-main col-sm-4">
              <div class="checkout-page">
                <h4 class="checkout-sep">Billing Informations</h4>
                <div class="box-border">
                  <ul>
                    <li class="row">
                      <!--/ [col] -->
                      <div class="col-sm-12">
                        <label for="email_address" class="required">
                          Email Address&nbsp;
                        </label>
                        <input
                          type="text"
                          class="input form-control"
                      
                          v-model="order.email"
                        />
                        <!--<div v-if="submitted" class="invalid-feedback">-->
                        <!--  <span v-if="!$v.order.email.required">Email is required</span>-->
                        <!--  <span v-if="!$v.order.email.email">Email is invalid</span>-->
                        <!--</div>-->
                      </div>
                      <!--/ [col] -->
                    </li>
                    <li class="row">
                      <div class="col-sm-12">
                        <label for="name" class="required">
                          Name&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <input
                          type="text"
                          class="input form-control"
                          v-model="order.full_name"
                          :class="{ 'is-invalid': submitted && $v.order.full_name.$error }"
                        />
                        <div
                          v-if="submitted && !$v.order.full_name.required"
                          class="invalid-feedback"
                        >Name is required</div>
                      </div>
                      <!--/ [col] -->

                      <!--/ [col] -->
                    </li>
                    <li class="row">
                      <div class="col-sm-12">
                        <label for="telephone" class="required">
                          Mobile&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <input
                          class="input form-control"
                          type="text"
                          v-model="order.phone"
                          :class="{ 'is-invalid': submitted && $v.order.phone.$error }"
                        />
                        <div v-if="submitted" class="invalid-feedback">
                          <span v-if="!$v.order.phone.required">Phone is required</span>
                          <span v-if="!$v.order.phone.minLength">Phone must be at least 11 digit</span>
                        </div>
                      </div>
                      <!--/ [col] -->

                      <!--/ [col] -->
                    </li>
                    <!--/ .row -->
                    <li class="row" v-if="!this.$store.getters.loggedIn">
                      <div class="col-sm-6">
                        <label for="password" class="required">
                          Password&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <input class="input form-control" type="password" v-model="order.password" />
                      </div>
                      <!--/ [col] -->

                      <div class="col-sm-6">
                        <label for="confirm" class="required">
                          Confirm Password&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <input
                          class="input form-control"
                          type="password"
                          v-model="order.confirm_password"
                        />
                      </div>
                      <!--/ [col] -->
                    </li>
                    <!--/ .row -->

                    <li class="row">
                      <div class="col-sm-12">
                        <label for="address" class="required">
                          Address&nbsp;
                          <span class="require_input">*</span>
                        </label>
                        <input type="text" class="input form-control" v-model="order.address" />
                      </div>
                      <!--/ [col] -->
                    </li>
                    <!-- / .row -->

                    <!--<li class="row">-->
                    <!--  <div class="col-sm-6">-->
                    <!--    <label class="required">-->
                    <!--      Select District&nbsp;-->
                    <!--      <span class="require_input">*</span>-->
                    <!--    </label>-->
                    <!--    <v-select-->
                    <!--      :options="district"-->
                    <!--      placeholder="Select Your Location"-->
                    <!--      v-model="select_location"-->
                    <!--      @input="findArea"-->
                    <!--    ></v-select>-->
                    <!--  </div>-->
                    <!--  <div class="col-sm-6">-->
                    <!--    <label class="required">-->
                    <!--      Select Police Station&nbsp;-->
                    <!--      <span class="require_input">*</span>-->
                    <!--    </label>-->
                    <!--    <v-select-->
                    <!--      :options="area"-->
                    <!--      v-model="select_area"-->
                    <!--      placeholder="Select Your Police Station"-->
                    <!--      @input="show_details"-->
                    <!--    ></v-select>-->
                    <!--  </div>-->
                    <!--  <div class="col-sm-12 margin-bottom-20">-->
                    <!--    <label class="required">-->
                    <!--      Select Nearest Shop&nbsp;-->
                    <!--      <span class="require_input">*</span>-->
                    <!--    </label>-->
                    <!--    <v-select-->
                    <!--      :options="outlates"-->
                    <!--      v-model="outlate"-->
                    <!--      placeholder="Select Your Outlate"-->
                    <!--      @input="show_outlet"-->
                    <!--    ></v-select>-->
                    <!--  </div>-->
                    <!--</li>-->
                    
                       <li>
                             <div class="field">
                <label for class="checkbox">
                  <input
                    type="checkbox"
                   
                    v-on:change="dealer = (dealer + 1) % 2"
                  />
                  Dearler Purchase
                </label>
                <br>


                  <label for="confirm" class="required" v-show="dealer !=0">
                          Dealer ID&nbsp;
                          <span class="require_input">*</span>
                        </label>
              
                    <!--<input-->
                    <!--  class="input form-control"-->
                    <!--  type="text"-->
                    <!--  v-model="order.dealer_id"-->
                    <!--  v-show="dealer !=0"-->
                    <!--/>-->
                    <br>
                      <select v-model="select_dealer"  v-show="dealer !=0" class="form-control"   v-on:change="dealer_pick">
                         <option v-for="option in dealers" v-bind:value="option.dealer_id">
                             {{ option.full_name }}
                        </option>
                    </select>

  <br>
              </div>
                  
                      </li>

                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row">
               <div class="col-sm-6">
                      <div class="checkout-page">
                    <h4 class="checkout-sep">Shipping Method</h4>
                    <div class="box-border">
                      <ul class="shipping_method">
                        
                         <li>
                          <label for="radio_button_4"></label>
                          <input
                            type="radio"
                            name="radio_3"
                            ref="radio_button_5"
                            :value="3"
                            v-model="order_shipping"
                          />
                          Free Shipment ৳0 ( Over ৳{{settings.min_order}})
                        </li>
                        </ul>
                    </div>
                  </div>
                  <div class="checkout-page">
                    <h4 class="checkout-sep margin-top-20">Payment Method</h4>
                    <div class="box-border">
                      <ul class="payment_method">
                        <li>
                          <label for="radio_button_5"></label>
                          <input
                            type="radio"
                            name="radio_4"
                            id="radio_button_5"
                            value="0"
                            v-model="order.payment_method"
                          />
                          <img src="/payment/cod.png" width="150px" >
                        </li>
                        <li v-if="settings.city_status == 1">
                          <label for="radio_button_6"></label>
                          <input
                            type="radio"
                            name="radio_4"
                            id="radio_button_6"
                            value="2"
                            v-model="order.payment_method"
                          />
                             <img src="/images/payment-card.png" >
                        </li>
                           <li >
                          <label for="radio_button_6"></label>
                          <input
                            type="radio"
                            name="radio_4"
                            id="radio_button_6"
                            value="3"
                            v-model="order.payment_method"
                          />
                            <img src="/payment/bkash.png"  >
                        </li>
                        <li >
                          <label for="radio_button_6"></label>
                          <input
                            type="radio"
                            name="radio_4"
                            id="radio_button_6"
                            value="4"
                            v-model="order.payment_method"
                          />
                            <img src="/payment/rocket.png">
                        </li>
                        <li >
                          <label for="radio_button_6"></label>
                          <input
                            type="radio"
                            name="radio_4"
                            id="radio_button_6"
                            value="5"
                            v-model="order.payment_method"
                          />
                             <img src="/payment/upay.png" width="60px" >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="checkout-page">
                    <h4 class="checkout-sep">Discount Codes</h4>
                    <p class="text-danger" v-if="coupon_wrong_msg">{{coupon_msg}}</p>
                    <p class="text-success" v-if="coupon_msg">{{coupon_msg}}</p>
                    <div v-if="coupon_apply">
                      <form @submit.prevent="couponApply">
                        <div class="col-xs-12 margin-bottom-20">
                          <label
                            for="address"
                            class="required"
                          >Enter your coupon code if you have one.</label>
                          <input type="text" class="input form-control" v-model="coupon_code" />
                          <input
                            type="submit"
                            class="button is-small is-primary margin-top-20"
                            value="Apply Coupon"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="checkout-page">
                    <h4 class="checkout-sep">Comment</h4>
                    <div class="col-xs-12">
                      <textarea style="width: 100%;min-height: 100px;" v-model="order.comment"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 margin-top-20 margin-bottom-40">
                <div class="checkout-page">
                  <h4 class="checkout-sep">Order Review</h4>

                  <div class="box-border" style>
                    <form @submit.prevent="orderReview">
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
                            <tr v-for="(item,index) in items" :key="index">
                              <td class="cart_product">
                                <nuxt-link :to="{path:'/product/'+item.slug}">
                                  <img
                                    :src="filePath+item.feature_image"
                                    alt="php Template"
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
                                <span>৳{{priceFormate(item.discount_price)}}</span>
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
                                <span>৳{{priceFormate(item.discount_price * item.quantity)}}</span>
                              </td>
                              <td class="action">
                                <a @click="removeItem(index)">
                                  <i class="fa fa-times-circle" aria-hidden="true"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="2"></td>
                              <td colspan="2">Shipping</td>
                              <td colspan="2" class="price">৳{{shipping_value}}</td>
                            </tr>
                            <tr v-if="discount">
                              <td colspan="2"></td>
                              <td colspan="3">DisCount</td>
                              <td colspan="2">৳{{ discount_amount }}</td>
                            </tr>
                            <tr>
                              <td colspan="2"></td>
                              <td colspan="2" class="title is-6">Total</td>
                              <td colspan="2" class="title is-6" v-if="discount">৳{{ cartTotal - discount_amount + shipping_value  }}</td>
                              <td colspan="2" class="title is-6" v-else>৳{{ cartTotal + shipping_value  }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </form>
                    <div class="field">
                <label for class="checkbox">
                  <input
                    type="checkbox"
                   
                    v-on:change="disabled = (disabled + 1) % 2"
                  />
                  I agree the   <nuxt-link :to="{path:'/terms-conditions'}" :style="{color:'blue'}" target="_blank">Terms & Conditions</nuxt-link> for my transection.
                </label>
              </div>
                    <input
                      type="submit"
                      class="button is-pulled-right is-success"
                      value="Place Order"
                       :disabled="disabled == 0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <!-- Main Container End -->
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import { isValidPhone } from "~/plugins/validators";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Swal from "sweetalert2";

export default {
       async asyncData(context) {
    return context.$axios
      .get("/api/shipment")
      .then(res => {
        return { fetchedShipment: res.data };
      });
  },

 head () {
    return {
      title: 'Checkout Details|Jamuna Electronics ',
      meta: [
        { hid: 'description', name: 'description', content: 'Checkout Details. Jamuna Electronics' }
      ],
    }
  },


  components: {
    Vuelidate
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      user_verify: true,
      delivary_details: false,
      delivary_data: false,
      delivaryPack: false,
      total_Price: "",
      delivary_charge: "",
      district: [],
      select_area: "",
      area: [],
      select_location: "",
      coupon: false,
      coupon_apply: true,
      coupon_button: true,
      coupon_code: "",
      coupon_wrong_msg: false,
      coupon_msg: "",
      coupon_data: [],
      discount_amount: "",
      discount: false,
      delivary: "",
      register_data: [],
      phone: "",
      otp: "",
      user: [],
      outlates: [],
      outlate: "",
      register_success: 0,
      has_otp: false,
      register_modal: true,
      register_error: "Some things wrong",
      register_error_lable: null,
      phone_error: null,
      highlightPhoneWithError: null,
      phoneNotValidLabel: "Phone Number Invalide.Please include country code",
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      user_id: "",
      currentPlace: null,
      order_details: [],
      pay: true,
      freeShipping: false,
      order_error: "",
      terms: true,
      disabled: 0,
       dealer: 0,
       dealers: [],
       select_dealer: null,
      prev_option: 0,
      order_shipping: 3,
      freeShipAmount: 50000,
      click: 0,
      shipmentArray: [],
      shipment: "",
      shipping_value: 0,
      shippingOne: 0,
      shippingTwo: 1000,
      shippingThree: 2000,
      order: {
        full_name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        comment: "",
        total: "",
        discount_amount: "",
        discount_type: "",
        payment_method: 2,
        shipping: 0,
        shipping_charge: "",
        area: "",
        district: "",
        item_count: "",
        products: [],
        outlate:'',
        dealer_id:null,
      },
      submitted: false,

      currentLocation: {},
        center_lat:23.8130038,
        center_lng:90.4199967,
    pins: {
      selected: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      notSelected: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    },
    mapStyle: [
      {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#3e606f"
            },
            {
              weight: 2
            },
            {
              gamma: 0.84
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              weight: 0.6
            },
            {
              color: "#313536"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#44a688"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#f5e4e4"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "labels",
          stylers: [
            {
              visibility: "on"
            },
            {
              lightness: "14"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            },
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#067372"
            },
            {
              lightness: "-20"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#357374"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#004757"
            }
          ]
        }
    ],
    clusterStyle: [
      {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        width: 56,
        height: 56,
        textColor: "#fff"
      }
    ]
    };
  },
  mounted: function() {
    this.city();
    this.userinfo();
    // this.shipmentInfo();
    this.plazaLocation();
    this.dealer_list();
  },
  computed: {
 
    isDisabled: function() {
      return !this.terms;
    },
    settings(){
      return this.$store.getters.getSiteSettings;
    },
    items() {
      return this.$store.state.cart;
    },
    cartTotal() {
      this.total_Price = this.$store.getters.getTotal;
      if (this.total_Price > this.$store.getters.getSiteSettings.min_order) {
        this.freeShipping = true;
      }
      return this.total_Price;
    },
    
         totalPrice() {
      var self = this;
      var total = 0;
      self.items.forEach(item => {
        total += parseInt(item.regular_price * item.quantity);
      });
      return total;
    },
    // shipments() {
    //   this.shippingOne = this.$store.getters.getShipment[0].price;
    //   this.shippingTwo = this.$store.getters.getShipment[1].price;
    //   this.shippingThree = this.$store.getters.getShipment[2].price;
    //   return this.$store.getters.getShipment;
    // },
    weight() {
      return this.$store.getters.getWeight;
    },

    getLocation(){

      return this.$store.getters.getLocation;

    }
    
  },
  created() {
    
  },

  validations: {
    order: {
      full_name: { required },
      address: { required },
      phone: { required, minLength: minLength(11) },
    //   email: { required, email }
    }
  },
  methods: {
      
           async fetchData() {
        this.shippingOne = this.fetchedShipment[0].price;
      this.shippingTwo = this.fetchedShipment[1].price;
      this.shippingThree = this.fetchedShipment[2].price;

      
        },
     plazaLocation(){
      axios.get('/api/plaza/locations').then(response=>{
    this.$store.commit('setLocation',response.data.data);
      })
    },


    city() {
      var self = this;
      axios.get("/api/cities").then(response => {
        self.district = response.data;
      });
    },
    findArea() {
      var self = this;
      axios.get("/api/area/" + this.select_location).then(response => {
        self.area = response.data.upozila;
      });
    },
    dealer_list() {
      axios.get("/api/dealers").then(response => {
        this.dealers = response.data;
      });
    },
    
    dealer_pick(){
        this.order.dealer_id = this.select_dealer;
    },
    userinfo() {
      var user = this.$store.state.current_user;
      if (user != null) {
        this.order.email = user.email;
        this.order.phone = user.phone;
        this.order.full_name = user.name;
        this.order.address = user.address;
      } else {
        this.order.phone = this.$store.state.phone;
      }
    },
    // shipmentInfo() {
    //   axios.get("/api/shipment").then(response => {
    //     this.shipment = response.data;
    //     this.$store.commit("setShipment", response.data);
    //   });
    // },
    orderShipping(shipment) {
      this.total_Price = this.total_Price + this.weight * shipment.price;
      this.order.shipping_charge = this.shipping_value;
      this.shipping_value = this.weight * shipment.price;
      // this.$store.commit("setTotall", this.total_Price);
      this.shipmentArray.push(this.total_Price);
      this.click = this.click + 1;
      this.setShipment_array();
    },
    setShipment_array() {
      if (this.click && typeof this.click !== "undefined") {
        this.$store.commit("setTotall", this.shipmentArray[this.click - 1]);
      }
    },
    delivaryService() {
      if (this.delivary != 1) {
        this.delivary_charge = "৳80";
        this.total_Price = this.total_Price + 80;
        this.delivary_data = true;
      } else if (this.delivary != 0) {
        this.delivary_data = false;
        this.delivary_charge = "Free Delivary";
      }
    },

    removeItem(index) {
      if (localStorage.getItem("cartCount") >= 1) {
        this.disabled = (this.disabled + 1) % 2;
      }
      this.$store.commit("itemRemove", index);
    },
priceFormate(price){
      return new Intl.NumberFormat( {  style: 'decimal',  minimumFractionDigits: 2,maximumSignificantDigits: 3 }).format( Number(price).toFixed(2))+".00";
},
    show_details() {
      var self = this;
      axios
        .post("/api/location-find", {
          district: self.select_location,
          upozila: self.select_area,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN"
        })
        .then(response => {
          this.$dlg.mask("Search Nearest Outlate", function() {}, {
            closeTime: 2
          }),
            (self.outlates = response.data.outlets);
        });
    },
    show_outlet() {
      axios
        .post("/api/search-outlate", {
          address: this.outlate
        })
        .then(response => {
          const marker = {
            lat: response.data.outlets.latitude,
            lng: response.data.outlets.longitude
          };
          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);
          this.center = marker;
          this.currentPlace = null;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    cupon_code() {
      this.coupon_apply = true;
    },
    couponApply() {
      var self = this;
      var discount = 0;
      this.$dlg.mask(
        "Verify Your Code",
        axios
          .post("/api/coupon-apply", {
            coupon: self.coupon_code,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
          })
          .then(response => {
            self.coupon_data = response.data;
            if (self.coupon_data == null) {
              self.coupon_apply = true;
              self.coupon_wrong_msg = true;
              self.coupon_msg = "Coupon Invalid";
            } else {
              if (self.coupon_data.amount_type == "Fixed") {
                self.total_Price =
                  self.totalPrice - (self.coupon_data.amount);
                discount = (self.coupon_data.amount);
              } else if (self.coupon_data.amount_type == "Percentage") {

                discount = parseFloat(
                  (self.totalPrice/100) * self.coupon_data.amount
                );

                self.total_Price =
                parseFloat( self.totalPrice - discount);
                      
                
              }

              self.coupon_wrong_msg = false;
              self.coupon_msg = true;
              self.coupon_apply = false;
              self.coupon_msg = "Coupon Applied";
              self.discount = true;
              self.discount_amount = discount;
              self.order.discount_amount = discount;
              self.order.discount_type = self.coupon_data.amount_type;
              self.coupon_button = false;
              self.$store.commit("setTotall", self.total_Price);
            }
          })
          .catch(error => {
            setTimeout(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Coupon Invalid Or Campain End!"
              });
            }, 2000);
          }),
        {
          closeTime: 2
        }
      );
    },
    order_submit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      
          if(this.order.full_name  == null || this.order.phone  == null || this.order.address == null){

           Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Please Fill Up User Information'
              });
      }
      else{

      this.order.total = this.total_Price;
      this.order.area = this.select_area;
      this.order.district = this.select_location;
      this.order.item_count = this.$store.state.cartCount;
      this.order.products = this.items;
      this.order.outlate = this.outlate;
      this.order.shipping = this.order_shipping;

      if (this.order_shipping == null) {
        this.submitted = false;
         Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Select Any Shipping Method."
        });

      }else{
  const key = this.$dlg.mask("Order Placing");

          axios
            .post("/api/order", {
              order: this.order,
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            })
            .then(response => {
              this.order_details = response.data.order;

              this.$store.commit('setOrderDetails',this.order_details)
 this.$dlg.close(key)
              if (this.order.password) {
                if (this.order_details.order_id) {
                  this.$store
                    .dispatch("retrieveToken", {
                      username: this.order.phone,
                      password: this.order.password
                    })
                    .then(response => {
                      this.$store.dispatch("retrieveName");
                    })
                    .catch(error => {
                      this.error = error.response.data.error;
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        timer: 5000,
                        text: this.error
                      });
                    });
                }
                setTimeout(() => {
                  if (this.order.payment_method == 3 || this.order.payment_method == 2) {
                      this.$router.push("/checkout/order-verify");
                    
                  } else {
                    // this.$store.commit("clearcart");
                    this.cashOnDelivary();
                  }
                }, 500);
              } else if (this.$store.getters.loggedIn) {
                setTimeout(() => {
                  if (this.order.payment_method == 3 || this.order.payment_method == 2) {
                      this.$router.push("/checkout/order-verify");
                      
                  } else {
                    // this.$store.commit("clearcart");
                    this.cashOnDelivary();
                  }
                }, 500);
              }
            })
             .catch(error => {
              this.disabled =1;
               this.$dlg.close(key)
               setTimeout(() => {
              if (error.response.status == 400) {
                this.order_error = error.response.data.error;
              }
              else if (error.response.status == 401) {
                this.order_error = error.response.data.order;
              }
              else if (error.response.status == 404) {
                this.order_error = error.response.data.order;
              } else {
                this.order_error = error.response.data.order;
              }

               Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.error
              });

            }, 4000);

             
            }
        );
    //   }
      }
      }
    },
    orderReview() {
      this.submitted = false;
    },
    decrement(item) {
      this.$store.commit("itemDecrement", item);
    },
    increment(item) {

      this.$store.dispatch("addToCart", item);
       
    },
    cashOnDelivary() {
      Swal.fire({
        title: "Your Order Confirmed!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok!"
      }).then(result => {
        setTimeout(() => {
                    this.$router.push({path:'/checkout/order-invoice',query:{keywords:this.order_details.order_id}});

        }, 500);
      });
    }
  },
  watch: {
    total_Price: function() {
      if (this.total_Price == "") {
        setTimeout(() => {
          this.terms = false;
          Swal.fire({
            title: "No Item In Cart!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok!"
          }).then(result => {
            setTimeout(() => {
              this.$router.push("/");
            }, 1000);
          });
        }, 4000);
      } else if (this.total_Price >= this.$store.getters.getSiteSettings.min_order) {
        this.freeShipping = true;
      } else {
        this.freeShipping = false;
      }
    },
    order_shipping: function() {
      const price = this.total_Price;
      if (this.order_shipping == 0) {
        this.shipping_value = this.shippingOne;
        if (this.prev_option == 2) {
          this.total_Price =
            this.total_Price +
            this.weight * this.shipping_value -
            this.weight * this.shippingThree;
        } else if (this.prev_option == 1) {
          this.total_Price =
            this.total_Price +
            this.weight * this.shipping_value -
            this.weight * this.shippingTwo;
        } else {
          this.total_Price =
            this.total_Price + this.weight * this.shipping_value;
        }
        this.shipping_value = this.weight * this.shippingOne;
        this.$store.commit("setTotall", this.total_Price);
        this.prev_option = 0;
      } else if (this.order_shipping == 1) {
        this.shipping_value = this.shippingTwo;
        if (this.prev_option == 2) {
          this.total_Price =
            this.total_Price +
            this.weight * this.shipping_value -
            this.weight * this.shippingThree;
        } else if (this.prev_option == 0) {
          this.total_Price =
            this.total_Price +
            this.weight * this.shipping_value -
            this.weight * this.shippingOne;
        } else {
          this.total_Price =
            this.total_Price + this.weight * this.shipping_value;
        }
        this.shipping_value = this.weight * this.shippingTwo;
        this.$store.commit("setTotall", this.total_Price);
        this.prev_option = 1;
      } else if (this.order_shipping == 2) {
        this.shipping_value = this.shippingThree;

        if (this.prev_option == 1) {
          this.total_Price =
            this.total_Price +
            this.weight * this.shipping_value -
            this.weight * this.shippingTwo;
        } else if (this.prev_option == 0) {
          this.total_Price =
            this.total_Price +
            this.weight * this.shipping_value -
            this.weight * this.shippingOne;
        } else {
          this.total_Price =
            this.total_Price + this.weight * this.shipping_value;
        }
        this.shipping_value = this.weight * this.shippingThree;
        this.$store.commit("setTotall", this.total_Price);
        this.prev_option = 2;
      } else {
        this.shipping_value = 0;
      }
      if (this.shipping_value !== 0) {
        this.$store.commit(
          "setTotall",
          price + this.weight * this.shipping_value
        );
        this.order.shipping_charge = this.shipping_value;
      } else {
        this.$store.commit("setTotall", price);
        this.order.shipping_charge = 0;
      }
    }
  }
};
</script>
<style>
.vs__dropdown-menu {
  position: relative;
}
.checkout-page h4.checkout-sep {
  padding: 0 0 5px;
  margin-bottom: 5px;
}
.require_input {
  color: #e30714;
}
ul.payment_method >li{
  line-height: 45px;
}
</style>