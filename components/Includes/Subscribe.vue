<template>
<section class="newsletter">
<div class="container">
<div class="row">
<div class="col-sm-12">
    <form @submit.prevent="subscription">
	<div class="content">
		<h2><i class="fa fa-envelope-open"></i> Subscribe Now</h2>
	<div class="input-group">
         <input type="email" class="form-control" v-model="newsletter"   placeholder="Enter your email">
           
                       
         <span class="input-group-btn">
         <button class="btn btn-info" type="submit">Subscribe</button>
         </span>
          </div>
	</div>
    </form>
</div>
</div>
</div>
</section>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            newsletter:'',
        }
    },
    methods: {
subscription(){
        

      axios.post('/api/subscription',{
          email: this.newsletter,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
      }).then(response=>{
           window.scrollTo(0, 0);
          this.newsletter =''
           setTimeout(() => {
              Swal.fire({
                icon: "success",
                title: "Done",
                text: "You Are Subscribe!"
              });
          }, 1000);

      }).catch(error=>{
          setTimeout(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Some Thing Went Wrong!"
              });
          }, 1000);
      })
}
        
    },
}
</script>

<style scoped>
.newsletter {
padding: 30px 0;
background: #e40514;
}

.newsletter .content {
max-width: 650px;
margin: 0 auto;
text-align: center;
position: relative;
z-index: 2; }
.newsletter .content h2 {
color: #fff;
margin-bottom: 20px; }
.newsletter .content .form-control {
height: 50px;
border-color: #ffffff;
border-radius:0;
}
.newsletter .content.form-control:focus {
box-shadow: none;
border: 2px solid #243c4f;
}
.newsletter .content .btn {
min-height: 50px; 
border-radius:0;
color: #fff;
font-weight:600;
}
</style>