<template>
  <div>
    <div class="sidebar-account block">
      <div class="sidebar-bar-title">
        <h3>My Account</h3>
      </div>
      <div class="block-content">
        <ul>
          <li :class="[currentPage === '/customer/dashboard' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/dashboard'}">
     <!--<font-awesome-icon :icon="['fas', 'hand-point-right']"/>Dashboard-->

               <i class="fas fa-hand-point-right"></i> Dashboard 
            </nuxt-link>
          </li>
          <li :class="[currentPage === '/customer/my-profile' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/my-profile'}">
     <!--<font-awesome-icon :icon="['fas', 'hand-point-right']"/> Account Information-->

               <i class="fas fa-hand-point-right"></i> Account Information 
            </nuxt-link>
          </li>
          <li :class="[currentPage === '/customer/my-order' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/my-order'}">
     <!--<font-awesome-icon :icon="['fas', 'hand-point-right']"/>My Orders-->

               <i class="fas fa-hand-point-right"></i> My Orders 
            </nuxt-link>
          </li>
          <li :class="[currentPage === '/customer/my-cart' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/my-cart'}">
     <!--<font-awesome-icon :icon="['fas', 'hand-point-right']"/> My Cart-->

               <i class="fas fa-hand-point-right"></i> My Cart 
            </nuxt-link>
          </li>
          <li :class="[currentPage === '/customer/my-wishlist' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/my-wishlist'}">
     <!--<font-awesome-icon :icon="['fas', 'hand-point-right']"/>My Wishlist-->

               <i class="fas fa-hand-point-right"></i> My Wishlist 
            </nuxt-link>
          </li>
          <!-- <li :class="[currentPage === '/customer/my-reviews' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/my-reviews'}">
              <i class="fas fa-hand-point-right"></i> My Product Reviews
            </nuxt-link>
          </li> -->
          <!-- <li :class="[currentPage === '/customer/dashboard' ? 'current' :'']">
            <nuxt-link :to="{path:'/customer/dashboard'}">
              <i class="fas fa-hand-point-right"></i> Newsletters
            </nuxt-link> -->
          <!-- </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeClass: "current"
    };
  },
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
};
</script>
<style scoped>
.sidebar-account .block-content li:before {
  content: none;
}
</style>