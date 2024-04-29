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
                <strong>Register Confirm</strong>
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
            <div class="page-content checkout-page">
                                  <h4 class="title text-center">Phone Verify</h4>

              <form @submit.prevent="register_confirm">
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field">
                      <label for="telephone" class="required">Mobile</label>

                      <div class="field has-addons">
                        <p class="control">
                          <a class="button is-static">+88</a>
                        </p>
                        <p class="control is-expanded">
                          <input
                            :class="[highlightPhoneWithError ? 'input is-danger is-rounded' : 'input'] "
                            type="text"
                            class="input"
                            placeholder="+88017XXXXXX"
                            name="phone"
                            v-model="phone"
                            @keyup="checkPhoneOnKeyUp(phone)"
                          />
                        </p>
                      </div>
                      <p v-if="highlightPhoneWithError" class="help is-danger">{{ phoneErrorLabel }}</p>
                    </div>
                  </div>

                  <!-- <input
                      :class="[highlightPhoneWithError ? 'input is-danger is-rounded' : 'input is-rounded'] "
                      type="text"
                      placeholder="+88017XXXXXX"
                      name="phone"
                      v-model="phone"
                      @keyup="checkPhoneOnKeyUp(phone)"
                  />-->
                  <p v-if="highlightPhoneWithError" class="help is-danger">{{ phoneErrorLabel }}</p>
                </div>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="field">
                      <label for="telephone" class="required">OTP</label>
                      <input
                        class="input"
                        type="text"
                        v-model="otp"
                        name="otp"
                        placeholder="Your OTP"
                      />
                      <p v-if="highlightPhoneWithError" class="help is-danger">{{ phoneErrorLabel }}</p>
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  class="button is-success pull-right"
                  style="float:right"
                  value="Confirm Registration"
                />
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
export default {
  data() {
    return {
      phone: null,
      otp: "",
      register_status: false,
      phone_error: null,
      register_success: [],
      highlightPhoneWithError: null,
      phoneNotValidLabel: "Phone Number Invalide"
    };
  },
  mounted(){
      
      if(process.browser){
          this.phone = localStorage.getItem("client_phone")
      }
      
  },
  methods: {
    checkPhoneOnKeyUp(phone) {
      if (phone && isValidPhone(phone)) {
        this.highlightPhoneWithError = false;
      } else {
        this.highlightPhoneWithError = true;

        if (!isValidPhone(phone)) {
          this.phoneErrorLabel = this.phoneNotValidLabel;
        }
      }
    },
    register_confirm() {
      if (!this.phone) {
        this.highlightPhoneWithError = true;

        if (this.phone && !isValidEmail(this.phone)) {
          this.phoneErrorLabel = this.phoneNotValidLabel;
        }
      } else {
        this.highlightPhoneWithError = false;

        if (this.otp != null) {
          axios
            .post("/api/client/confirm-register", {
              phone: this.phone,
              otp: this.otp,
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            })
            .then(response => {
              this.register_status = true;
              this.$dlg.mask("Verify Your OTP", function() {}, {
                closeTime: 2
              }),
                (this.register_success = response.data.user);
              setTimeout(() => {
                this.registration_confirmation();
              }, 2000);
            })
            .catch(error => {
              if (error.response.status == 401) {
                self.error = error.response.data.errors;
                self.$dlg.mask("Verifying OTP", function() {}, {
                  closeTime: 2
                });
                setTimeout(() => {
                  self.alert_error();
                }, 4000);
              }
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 5000,
            text: "Please Insert Otp or Otp Invalide"
          });
        }
      }
    },
    alert_error() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: this.error
      });
    },
    registration_confirmation() {
      this.register_error_lable = true;

      //login functionality
      this.$store
        .dispatch("retrieveToken", {
          username: localStorage.getItem("client_phone"),
          password: localStorage.getItem("client_password")
        })
        .then(response => {
          this.$store.dispatch("retrieveName");
          localStorage.removeItem("client_password");
          localStorage.removeItem("client_password");
          setTimeout(() => {
            this.$router.push("/customer/dashboard");
          }, 1000);
        })
        .catch(error => {
          this.error = error.response.error;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 5000,
            text: this.error
          });
        });

      //end login
    }
  }
};
</script>