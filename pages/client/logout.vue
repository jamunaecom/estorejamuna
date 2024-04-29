<template>

</template>

<script>
import Vue from 'vue'
import Swal from "sweetalert2";
export default {
    
  data() {
    return {
     
    }
  },
  mounted() {
    
  },
  created() {
    this.$store.dispatch('destroyToken')
      .then(response => {
       
      })
       Swal.fire({
        icon: "success",
        title: "Success",
        timer: 5000,
        text: 'Your Are logout.'
      });
       setTimeout(() => {
                this.$router.push('/');
              }, 1000);
  },methods: {
     
  },
}
</script>