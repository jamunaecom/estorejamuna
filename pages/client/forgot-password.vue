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
                <strong>Forgot Password</strong>
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
          <div class="col-main col-sm-4 offset-sm-4">
            <div class=" checkout-page">
              <div v-if="notify == false">
                <div v-if="successMessage" class="notification is-success">
                  <a class="delete" v-on:click="hide_message"></a>
                  {{ successMessage }}
                </div>
                <div class="notification is-danger" v-if="serverError">
                  <a class="delete" v-on:click="hide_message"></a>
                  {{ serverError }}
                </div>
              </div>
              <section class="hero is-light">
                <div class="hero-body">
                  <div class="container">
                    <h3 class="subtitle text-center">Forgot Password</h3>
                            <validation-errors :errors="validationErrors" v-if="validationErrors"></validation-errors>

                    <form @submit.prevent="forgotPassword">
                      <div class="box-border">
                        <div class="col-sm-12">
                          <label for="telephone" class="required">Mobile Or Email</label>
                          <input
                            :class="[highlightPhoneWithError ? 'input is-danger' : 'input'] "
                            type="text"
                            placeholder="Phone number Or Email"
                            name="phone"
                            v-model="phone"
                          />
                          <p
                            v-if="highlightPhoneWithError"
                            class="help is-danger"
                          >{{ phoneErrorLabel }}</p>
                        </div>
                        <div class="col-sm-12" v-if="hasOtp">
                          <label for="telephone" class="required">OTP</label>
                          <input class="input is-rounded" type="text" v-model="otp" name="otp" />
                          <p
                            v-if="highlightPhoneWithError"
                            class="help is-danger"
                          >{{ phoneErrorLabel }}</p>
                        </div>
                        <div v-if="hasPassword">
                          <div class="col-sm-12">
                            <label for="telephone" class="required">New Password</label>
                            <input
                              class="input is-rounded"
                              type="password"
                              v-model="password"
                              name="password"
                            />
                            <p
                              v-if="highlightPhoneWithError"
                              class="help is-danger"
                            >{{ phoneErrorLabel }}</p>
                          </div>
                          <div class="col-sm-12">
                            <label for="telephone" class="required">Confirm Password</label>
                            <input
                              class="input is-rounded"
                              type="password"
                              v-model="confirm_password"
                              name="confirm_password"
                            />
                            <p
                              v-if="highlightPhoneWithError"
                              class="help is-danger"
                            >{{ phoneErrorLabel }}</p>
                          </div>
                        </div>
                        <input
                          type="submit"
                          class="button is-success pull-right"
                          style="float:right"
                          value="Send"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </section>
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
import { isValidPhone } from "~/plugins/validators";
import Swal from "sweetalert2";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.component("validation-errors", {
  data() {
    return {};
  },
  props: ["errors"],
  template: `<div v-if="validationErrors">
                  <ul class="alert alert-danger">
                      <li v-for="(value, key, index) in validationErrors">@{{ value }}</li>
                  </ul>
              </div>`,
  computed: {
    validationErrors() {
      let errors = Object.values(this.errors);
      errors = errors.flat();
      return errors;
    }
  }
});
export default {
               head () {
    return {
      title: 'Forget Password | Jamuna Electronics ',
      meta: [
        { hid: 'description', name: 'description', content: 'Forget Password. Jamuna Electronics' },
        { hid: 'keywords', name: 'keywords', content: 'Forget Password. Jamuna Electronics, Jamuna Group' }
      ]
    }
  },
  props: {
    dataSuccessMessage: {
      type: String
    }
  },
  data() {
    return {
      phone: "",
      otp: "",
      password: "",
      confirm_password: "",
      register_status: false,
      phone_error: null,
      register_success: [],
      success: false,
      has_error: false,
      hasOtp: false,
      hasPassword: false,
      error: "",
      serverError: "",
      notify: true,
      validationErrors: "",
      successMessage: this.dataSuccessMessage,
      highlightPhoneWithError: null,
      phoneNotValidLabel: "Phone Number Invalide.Please include country code"
    };
  },
  methods: {
    hide_message() {
      this.notify = true;
    },
  
    forgotPassword() {
      if (!this.phone) {
        this.highlightPhoneWithError = true;
      } else {
        this.highlightPhoneWithError = false;

        if (this.hasOtp) {

         

if(this.otp == "" || this.otp == null){
  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please Enter Your Otp"
            });
}
         else{ //otp verify
         this.$dlg.mask("Verify Your OTP",
          axios
            .post("/api/forgot-password", {
              phone: this.phone,
              otp: this.otp,
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            })
            .then(response => {
                (this.hasPassword = true);
              this.hasOtp = false;
            })
            .catch(error => {
              setTimeout(() => {
                
             
              this.confirm_error = error.response.data.error;
              if (error.response.data.status == 404) {
                this.confirm_error = error.response.data.error;
                  
                  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: this.confirm_error
            });
              }
              else{
                  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: this.confirm_error
            });
              }
               }, 1500);
            }),{
                closeTime: 1
              })
        }
        } else if (this.hasOtp == false && this.hasPassword) {
          if (
            this.password == this.confirm_password &&
            this.password.length > 5
          ) {
            axios
              .post("/api/forgot-password", {
                phone: this.phone,
                password: this.password,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
              })
              .then(response => {
                this.$dlg.mask("Changing your Password", function() {}, {
                  closeTime: 1
                });

                setTimeout(() => {
                  Swal.fire({
                    icon: "success",
                    title: "Password Changed",
                    text: "Your Password Changed!"
                  });
                  this.$router.push("/client/login");
                }, 3000);
              })
              .catch(error => {

                 toast.error(error.response.data.message);
                
                if (error.response.data.status == 404) {
                  this.confirm_error = error.response.data.error;
                  
                  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: this.confirm_error
            });
                }
              });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Password Not Match or Not more then 6 Charecter"
            });
          }
        } else {
          this.$dlg.mask("Sending OTP....", 
          axios
            .post("/api/forgot-password", {
              phone: this.phone,
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            })
            .then(response => {
              
                (this.hasOtp = true);
            })
            .catch(error => {
             
              if (error.response.status == 404) {
                this.confirm_error = error.response.data.error;
                  
                  Swal.fire({
              icon: "error",
              title: "Oops...",
              text: this.confirm_error
            });
              }
            }), {
                closeTime: 3
              });
        }
      }
    }
  }
};
</script>