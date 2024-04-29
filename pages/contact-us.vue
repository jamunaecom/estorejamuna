<template>
  <div class="main" id="contact_us">
    <div class="contact-pageheader">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div class="contact-caption">
              <h1 class="contact-title">Talk to Us.</h1>
              <p class="contact-text">
                Please help us serve you better by sharing the following information.
              </p>
            </div>
          </div>
          <div class="col-lg-offset-1 col-lg-5 col-md-offset-1 col-md-5 col-sm-12 col-xs-12">
            <div class="contact-form">
              <h4 class="contact-info-title">Contact Us</h4>
                <div v-if="validationErrors">
                  <ul class="alert alert-danger">
                      <li v-for="(value, index)  in validationErrors" :key="index">@{{ value }}</li>
                  </ul>
                  <br>
              </div>
              <div class="row">
                <form @submit.prevent="contact_us">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label class="control-label sr-only" for="Name">Name</label>
                      <input id="name" type="text" v-model="name" placeholder="Name" class="form-control" required />

                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label class="control-label sr-only" for="email"></label>
                      <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        class="form-control"
                        v-model="email"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label class="control-label sr-only" for="Phone"></label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="Phone"
                        class="form-control"
                        v-model="phone"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label class="control-label sr-only" for="subject"></label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="Subject"
                        class="form-control"
                        v-model="subject"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label class="control-label sr-only" for="Phone"></label>
                      <input
                        id="city"
                        type="text"
                        placeholder="Your City"
                        class="form-control"
                        v-model="city"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <label class="control-label sr-only" for="Issue"></label>
                      <select name="issue_section" v-model="issue_section" class="form-control">
                        <option value="Department/Nature">Department / Nature</option>
                        <option value="General Query">General Query</option>
                        <option value="Human Resource Department">Human Resource Department</option>
                        <option value="Marketing (Home Appliances)">Marketing (Home Appliances)</option>
                        <option value="Production (Home Appliances)">Production (Home Appliances)</option>
                        <option value="Sales & Marketing Local (Power Division)">Sales & Marketing Local (Power Division)</option>
                        <option value="Sales & Marketing Export (Power Division)">Sales & Marketing Export (Power Division)</option>
                        <option value="Power Projects">Power Projects</option>
                        <option value="After-sales & Service Quality">After-sales & Service Quality</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20">
                    <div class="form-group">
                      <label class="control-label sr-only" for="textarea"></label>
                      <textarea
                        class="form-control text-area"
                        id="textarea"
                        name="textarea"
                        rows="6"
                        v-model="message"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <button class="btn btn-primary btn-lg">Send message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="space-medium">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <hr />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
            <iframe
              width="100%"
              height="320px;"
              frameborder="0"
              style="border:0"
              src="https://www.google.com/maps/embed/v1/place?q=23.8130038,90.4199967&key=AIzaSyAf64FepFyUGZd3WFWhZzisswVx2K37RFY"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col-lg-offset-1 col-lg-5 col-md-offset-1 col-md-5 col-sm-6 col-xs-12">
            <div class>
              <h3 class="title-bold">Contact Info</h3>
            </div>
            <div class="contact-section">
              <div class="contact-icon">
                 <i class="fa fa-map-marker"></i> 
                  <!--<font-awesome-icon :icon="['fas', 'map-marker']" />-->

              </div>
              <div class="contact-info">
                <p>
                    Jamuna Electronics & Automobiles Ltd.
                    Jamuna Future Park,Ka-244
                    Progati Sarani, Baridhara, Dhaka
                </p>
              </div>
              <div class="contact-icon mobile_icon">
                 <i class="fa fa-phone"></i> 
                  <!--<font-awesome-icon :icon="['fas', 'phone']" />-->
              </div>
              <div class="contact-info">
                <p>+88013-13-036904</p>
              </div>
              <div class="clearfix"></div>
              <div class="contact-icon">
                 <i class="fa fa-envelope"></i> 
                 
              <!--</div>-->
              <div class="contact-info">
                <p>info@jamunaelectronics.com</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import axios from "~/plugins/axios";
import Vue from "vue";
 import Swal from "sweetalert2";
export default {
     head() {
    return {
      title:'Contact Us | Jamuna Electronics',
      meta: [
        {
          hid: "description",
          name: "description",
          content:'Jamuna Contact Section. Jamuna Group Contact Us.'
        },
        {
          hid: "keywords",
          name: "keywords",
          content:'Jamuna Group, Jamuna Dealer, Jamuna Plaza'
        },
        {
          hid: "og:title",
          name: "og:title",
          content:'Contact Us | Jamuna Electronics'
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "https://erp.estorejamuna.com/images/logo.png"
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content:
            "https://estorejamuna.com/contact-us"
        },
        {
          hid: "og:description",
          name: "og:description",
          content:'Contact Us | Jamuna Electronics.'
        }
      ]
    };
  },
  data() {
    return {
      page: this.$route.fullPath,
      name:'',
      email:'',
      phone:'',
      message:'',
      issue_section:'Department/Nature',
      city:'',
      subject:'',
       validationErrors: ""
    };
  },

  computed: {
    cmsPage() {
      return this.$store.getters.getCmsPage;
    }
  },

  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      axios.get("/api/cmsPage" + this.page).then(response => {
        this.$store.commit("setCmsPage", response.data.details);
      });
    },
    contact_us(){

      this.$dlg.mask("Sending Your Query...", function() {}, {
            closeTime: 1
          });
          axios
            .post("/api/contact-us", {
              name: this.name,
              email: this.email,
              phone: this.phone,
              issue_section: this.issue_section,
              subject: this.subject,
              city: this.city,
              message: this.message,
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            })
            .then(response => {

               this.name="";
               this.email="";
              this.phone="";
              this.message="";
              this.city="";
              this.subject="";

              if (response.data) {
                Swal.fire({
                  icon: "success",
                  title: "Done",
                  text: "Your Query are send!"
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!"
                });
              }
            })
            .catch(error => {

              if (error.response.status == 422) {
                this.validationErrors = error.response.data.errors;
              }
              else{
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!"
                });
              }
            });

    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {



#contact_us .contact-caption{
  display: none;
}
}
#contact_us ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}

#contact_us a {
  text-decoration: none;
  color: #272d2c;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

#contact_us a:focus,
#contact_us a:hover {
  text-decoration: none;
  color: #f8591b;
}

#contact_us sub {
  bottom: 0em;
}

#contact_us .lead {
  font-size: 23px;
  font-weight: 400;
  line-height: 1.5;
  font-family: "PT Serif", serif;
  color: #272d2c;
  margin-bottom: 40px;
}

#contact_us .form-group {
  margin-bottom: 5px;
}

#contact_us .form-control {
  border-radius: 0px;
  color: #6b6c6d;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  height: 52px;
  padding: 0px;
  line-height: 1.42857143;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  border-bottom: 1px solid #cbcfce;
  background-color: transparent;
  letter-spacing: 0px;
  margin-bottom: 10px;
  -webkit-box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
}

#contact_us .form-control:focus {
  color: #34b2a4 !important;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom-color: #34b2a4;
  font-size: 12px;
}

#contact_us .input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}

#contact_us input[type="checkbox"],
#contact_us input[type="radio"] {
  margin: 8px 0 0;
  margin-top: 12px;
  line-height: normal;
}

#contact_us input::-webkit-input-placeholder {
  color: #6b6c6d !important;
}

#contact_us input:focus::-webkit-input-placeholder {
  color: #34b2a4 !important;
  bottom: 20px;
  position: relative;
}

#contact_us textarea::-webkit-input-placeholder {
  color: #6b6c6d !important;
}

#contact_us textarea:focus::-webkit-input-placeholder {
  color: #34b2a4 !important;
  bottom: 20px;
  position: relative;
  font-size: 12px;
}

#contact_us .input-group-addon {
  background-color: transparent;
  border: 1px solid #34b2a4;
  border-radius: 0px;
}

#contact_us .focus {
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  border-bottom: 1px solid #cbcfce;
  background-color: #fff;
}

#contact_us .focus:focus {
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
  border-bottom: 1px solid #cbcfce;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

#contact_us .has-success .form-control {
  border-color: #3c763d;
  background-color: #fff;
  box-shadow: none;
}

#contact_us .has-success .form-control:focus {
  border-color: #3c763d;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

#contact_us .has-error .form-control {
  border-color: #a94442;
  background-color: #fff;
  box-shadow: none;
}

#contact_us .has-error .form-control:focus {
  border-color: #34b2a4;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

#contact_us .input-group-addon:last-child {
  border-left: 0;
  border-right: transparent;
  border-top: transparent;
}

#contact_us .input-group-addon i {
  color: #34b2a4;
}

#contact_us option {
  color: #6b6c6d;
}

#contact_us hr {
  border-top: 1px solid #e4e9e8;
  margin-bottom: 40px;
  margin-top: 40px;
}
#contact_us .mb60 {
  margin-bottom: 60px;
}
#contact_us .btn {
  font-family: "PT Sans", sans-serif;
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 600;
  padding: 11px 30px;
  border-radius: 6px;
  line-height: 1.8;
  letter-spacing: 0px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  word-wrap: break-word;
  white-space: normal !important;
}

#contact_us .btn-primary {
  background-color: #f8591b;
  color: #fff;
  border: 1px solid #f8591b;
}

#contact_us .btn-primary:hover {
  background-color: #e64c10;
  color: #fff;
  border: 1px solid #e64c10;
}

#contact_us .btn-primary.focus,
#contact_us .btn-primary:focus {
  background-color: #e64c10;
  color: #fff;
  border: 1px solid #e64c10;
}

#contact_us .pdt20 {
  padding-top: 20px;
}

#contact_us .contact-pageheader {
  position: relative;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#91eee2', endColorstr='#39c4b6', GradientType=1);
  margin-bottom: 70px;
}

#contact_us .contact-caption {
  position: relative;
  top: 180px;
}

#contact_us .contact-title {
  font-family: "PT Serif", serif;
  font-size: 50px;
  font-style: italic;
  margin-bottom: 40px;
  line-height: 80px;
}

#contact_us .contact-caption-text {
  font-size: 23px;
  color: #272d2c;
}

#contact-map {
  height: 450px;
  width: 100%;
  position: relative;
}

#contact_us .contact-form {
  background-color: #fff;
  padding: 30px;
  text-align: center;
  position: relative;
  bottom: 0px;
 top: 8%;
  -webkit-box-shadow: 1px 2px 14px 0px rgba(0, 0, 0, 0.29);
  -moz-box-shadow: 1px 2px 14px 0px rgba(0, 0, 0, 0.29);
  box-shadow: 1px 2px 14px 0px rgba(0, 0, 0, 0.29);
}

#contact_us .contact-section {
  margin-bottom: 40px;
  margin-top: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e4e9e8;
}

#contact_us .contact-section .contact-icon {
  float: left;
  margin-bottom: 20px;
  display: inline-block;
  font-size: 25px;
  color: #34b2a4;
  padding-right: 20px;
  position: initial;
}

#contact_us .contact-section .mobile_icon {
  float: left;
  display: inline-block;
  font-size: 25px;
  color: #34b2a4;
  padding-right: 20px;
  position: initial;
}

#contact_us .contact-section .contact-info {
  padding-top: 10px;
}

#contact_us .contact-social {
}

#contact_us .contact-social ul {
}

#contact_us .contact-social ul li {
  float: left;
}

#contact_us .contact-social ul li a {
  font-size: 16px;
  padding-right: 10px;
  color: #6b6c6d;
}

#contact_us .contact-social ul li a:hover {
  color: #0084bf;
}

#contact_us .location-block {
  border-radius: 2px;
  border: 1px solid #eaeaea;
  padding: 30px;
  margin-bottom: 20px;
  background-color: #fff;
}


#contact_us .location-block ul li {
  line-height: 2.2;
  font-size: 15px;
}

#contact_us .location-icon {
  color: #0084bf;
  padding-right: 10px;
  font-size: 15px;
}

#contact_us .contact-pageheader {
   position: relative;
 background: rgba(145, 238, 226, 1);
 background: -moz-linear-gradient(
   left,
   rgba(145, 238, 226, 1) 0%,
   rgba(145, 238, 226, 1) 22%,
   rgba(145, 238, 226, 1) 31%,
   rgba(145, 238, 226, 1) 39%,
   rgba(57, 196, 182, 1) 71%,
   rgba(57, 196, 182, 1) 100%
 );
 background: -webkit-gradient(
   left top,
   right top,
   color-stop(0%, rgba(145, 238, 226, 1)),
   color-stop(22%, rgba(145, 238, 226, 1)),
   color-stop(31%, rgba(145, 238, 226, 1)),
   color-stop(39%, rgba(145, 238, 226, 1)),
   color-stop(71%, rgba(57, 196, 182, 1)),
   color-stop(100%, rgba(57, 196, 182, 1))
 );
 background: -webkit-linear-gradient(
   left,
   rgba(145, 238, 226, 1) 0%,
   rgba(145, 238, 226, 1) 22%,
   rgba(145, 238, 226, 1) 31%,
   rgba(145, 238, 226, 1) 39%,
   rgba(57, 196, 182, 1) 71%,
   rgba(57, 196, 182, 1) 100%
 );
 background: -o-linear-gradient(
   left,
   rgba(145, 238, 226, 1) 0%,
   rgba(145, 238, 226, 1) 22%,
   rgba(145, 238, 226, 1) 31%,
   rgba(145, 238, 226, 1) 39%,
   rgba(57, 196, 182, 1) 71%,
   rgba(57, 196, 182, 1) 100%
 );
 background: -ms-linear-gradient(
   left,
   rgba(145, 238, 226, 1) 0%,
   rgba(145, 238, 226, 1) 22%,
   rgba(145, 238, 226, 1) 31%,
   rgba(145, 238, 226, 1) 39%,
   rgba(57, 196, 182, 1) 71%,
   rgba(57, 196, 182, 1) 100%
 );
 background: linear-gradient(
   to right,
   rgba(145, 238, 226, 1) 0%,
   rgba(145, 238, 226, 1) 22%,
   rgba(145, 238, 226, 1) 31%,
   rgba(145, 238, 226, 1) 39%,
   rgba(57, 196, 182, 1) 71%,
   rgba(57, 196, 182, 1) 100%
 );
}
</style>
