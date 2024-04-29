<template>
<div class="container">


  <div class="modal" v-bind:class="{ 'is-active': isActive }">
  <div class="modal-background"></div>
    <div class="modal-card" :style="modalSize">
  <div class="modal-content">
    <p class="image is-4by3" >

      <img :src="`${$axios.defaults.baseURL}/public/storage/popup/` + fetchedextraData.popUp_modal_image" :alt="fetchedextraData.popUp_modal_image">
      <button class="modal-close is-large" aria-label="close" @click="close"></button>
    </p>
  </div>
  </div>

</div>
</div>
</template>

<script>
import Vue from "vue";
import axios from "~/plugins/axios";


export default {


  data() {
    return {
      isActive: false,
      count:0,
      fetchedextraData:[],
      window: {
        width: 0,
        height: 0
      }
    };
  },
  computed:{
    modalSize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          return "width:60%";
        } else {
          return "width:50%";
        }
      }
    }
  },
  mounted() {
    this.additionalInfo();
  },
  methods: {
    additionalInfo() {

    axios
        .get("/api/additional-settings")
        .then((response) => {
          this.fetchedextraData = response.data.data;
           if(this.fetchedextraData != null && this.count == 0 && this.fetchedextraData.popUp_modal_status == 1){
          this.isActive = true;
        }
        else{
          this.isActive = false;
        }
        });


    },

       close: function () {
      this.count = this.count + 1;
      this.isActive = false;
    },
  },
};
</script>

<style scoped>
/* .modal-close {
  background: #545454;;
    height: 40px;
    position: fixed;
    right: 25%;
    top: 25%;
    width: 40px;
} */
</style>
