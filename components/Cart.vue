<template>
  <div class="top-cart-content" v-show="show_cart">
    <div class="block-subtitle hidden">Recently added items</div>
    <ul id="cart-sidebar" class="mini-products-list">
      <li class="item odd" v-for="(item,index) in items" :key="index">
        <nuxt-link :to="{path:'/product/'+item.slug}" title="Product title here" class="product-image">
          <img :src="`${$axios.defaults.baseURL}`+item.feature_image" :alt="item.pro_name" width="65" />
        </nuxt-link>
        <div class="product-details">
          <a @click="removeItem(index)" title="Remove This Item" class="remove-cart" style="color:#e83f33">
            <i class="fa fa-trash"></i>

          </a>
          <p class="product-name">
            <nuxt-link :to="{path:'/product/'+item.slug}">{{item.pro_name}}</nuxt-link>
          </p>
          <strong>{{item.quantity}}</strong> x
          <span class="price">TK {{formatPrice(item.discount_price)}}</span>
          <span class="price">=</span>
          <span class="price">TK {{formatPrice(item.discount_price * item.quantity)}}</span>
        </div>
      </li>
    </ul>
    <div class="top-subtotal">
      Subtotal:
      <span class="price">TK {{ formatPrice(totalPrice) }}</span>
    </div>
    <div class="actions">
      <a class="btn btn-warning is-pulled-right" @click="checkout" >
        <i class="fa fa-check"></i>

        <span>Checkout</span>
       </a>
       
      <nuxt-link  class="btn btn-danger is-pulled-left" :to="{path:'/shopping-cart'}">
        <i class="fa fa-shopping-cart"></i>

        <span>View Cart</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Swal from "sweetalert2";
export default {
  // props: ['items'],
    data(){
    return{

      show_cart : true
    }
  },

  computed: {
    items() {
      return this.$store.state.cart;
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    },

    totalPrice() {
      var self = this;
      var total = 0;
      self.items.forEach(item => {
        total += parseInt(item.discount_price * item.quantity);
      });
      self.$store.commit("setTotall",total);
      return total;
    },
    
  },
  
  methods: {
    removeItem(index) {
      this.$store.commit("itemRemove", index);
    },
    checkout() {
      if(this.items.length >= 1){
           this.show_cart = false
      if(this.loggedIn){
        this.$router.push('/checkout/delivery-details')
      }
      else{
        this.$router.push('/checkout')
      }
      }
      else{
         Swal.fire({
                  icon: "error",
                  title: "Opps",
                  timer: 5000,
                  text: "No Item In Cart"
                });
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat( {  style: 'decimal',  minimumFractionDigits: 2,maximumSignificantDigits: 3 }).format( Number(price).toFixed(2))+".00";
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
  }
};
</script>

<style>
</style>