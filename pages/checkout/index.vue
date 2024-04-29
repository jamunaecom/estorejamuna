<template>
  <div>
    <div class="main">
      <div class="breadcrumbs">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <ul>
                <li class="home">
                  <nuxt-link :to="{ path: '/' }">Home</nuxt-link>
                  <span>&raquo;</span>
                </li>
                <li>
                  <strong>Checkout</strong>
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


            <div
              class="text-center margin-bottom-40"
            >
              <h4>
                Already registered? Click here to
                <nuxt-link
                  class="btn btn-danger"
                  :to="{ path: '/client/login' }"
                  >log in</nuxt-link
                >
              </h4>
            </div>

            <div class="col-md-6 col-sm-6 offset-md-3 col-12">
              <validationError
                :errors="validationErrors"
                v-if="validationErrors"
              ></validationError>

              <div class="checkout-page">
                <form @submit.prevent="register" id="registerForm">
                  <p v-if="has_error">{{ error }}</p>

                  <div class="field is-horizontal">
                    <div class="field-body">
                      <div class="field">
                        <label for="telephone" class="required">Phone</label>

                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static">+88</a>
                          </p>
                          <p class="control is-expanded">
                            <input
                              :class="[
                                highlightPhoneWithError
                                  ? 'input is-danger'
                                  : 'input',
                              ]"
                              type="tel"
                              v-model="phone"
                              placeholder="Your phone number"
                              @keyup="checkPhoneOnKeyUp(phone)"
                            />
                          </p>
                        </div>
                        <p
                          v-if="highlightPhoneWithError"
                          class="help is-danger"
                        >
                          {{ phoneErrorLabel }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <!--/ .row -->
                  <div v-if="has_otp">
                    <div class="field is-horizontal" v-if="registerUser">
                      <div class="field-body">
                        <div class="field">
                          <label for="telephone" class="required"
                            >Password</label
                          >
                          <input
                            :class="[
                              highlightPhoneWithError
                                ? 'input is-danger'
                                : 'input',
                            ]"
                            type="password"
                            v-model="password"
                            placeholder="Your Password"
                          />
                        </div>
                      </div>
                      <p v-if="password_error" class="help is-danger">
                        {{ password_error_msg }}
                      </p>
                    </div>
                    <div
                      class="field is-horizontal"
                      v-if="registerUser == false"
                    >
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
                        </div>
                      </div>
                      <p v-if="highlightPhoneWithError" class="help is-danger">
                        {{ phoneErrorLabel }}
                      </p>
                    </div>
                  </div>
                  <br />
                  <div class="field is-horizontal">
                    <nuxt-link
                      class="btn btn-link level-left"
                      :to="{ path: '/client/forgot-password' }"
                      v-show="registerUser"
                      >Forgot Password?</nuxt-link
                    >
                    <div class="field-body">
                      <div class="field">
                        <input
                          type="submit"
                          class="button is-primary is-pulled-right"
                          value="Sign Up"
                          v-show="!registerUser"
                        />
                        <input
                          type="submit"
                          class="button is-success is-pulled-right"
                          value="Sign In"
                          v-show="registerUser"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>


        </div>
      </section>
      <!-- Main Container End -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import { isValidPhone } from "~/plugins/validators";
import Swal from "sweetalert2";
import validationError from "~/plugins/valdationError";
export default {
  data() {
    return {
      data: "",
      register_data: [],
      phone: "",
      otp: "",
      error: "",
      confirm_error: "",
      login_data: [],
      login_error: "",
      status: 0,
      register_success: "",
      has_otp: false,
      registerUser: false,
      register_status: false,
      register_modal: true,
      register_error: "Some things wrong",
      register_error_lable: null,
      phone_error: null,
      password: null,
      password_error: false,
      password_error_msg: "",
      highlightPhoneWithError: null,
      has_error: false,
      error: "",
      success: false,
      phoneNotValidLabel: "Phone Number Invalide",
      phoneErrorLabel: null,
      validationErrors: "",
    };
  },
  methods: {
    register() {
      if (!this.phone) {
        this.highlightPhoneWithError = true;

        if (this.phone && !isValidPhone(this.phone)) {
          this.phoneErrorLabel = this.phoneNotValidLabel;
        }
      } else {
        this.highlightPhoneWithError = false;

        //otp enter or not
        if (this.has_otp == true) {
          var self = this;
          //check phone and otp entered
          if (this.phone && isValidPhone(this.phone) && this.otp) {
            self.$dlg.mask(
              "Verifying Your OTP",
              axios
                .post("/api/client/confirm-register", {
                  phone: self.phone,
                  otp: self.otp,
                  xsrfCookieName: "XSRF-TOKEN",
                  xsrfHeaderName: "X-XSRF-TOKEN",
                })
                .then((response) => {
                  self.register_status = true;

                  self.register_success = response.data;

                  this.registration_confirmation();
                })
                .catch((error) => {
                  if (error.response.status == 401) {
                    self.confirm_error = error.response.data.errors;
                  }
                }),
              {
                closeTime: 1,
              }
            );
          }
          //check phone and password entered
          else if (this.phone && isValidPhone(this.phone) && this.password) {
            if (this.password != null && this.password >= 6) {
              this.Otp_confirmation();
            } else {
              setTimeout(() => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  timer: 5000,
                  text: "Password Atleast 6 Charecter.",
                });
              }, 1000);
            }
          } else {
            setTimeout(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                timer: 5000,
                text: "Please Provide All Crediential",
              });
            }, 1000);
          }
        } else {
          this.$dlg.mask(
            "Sending OTP To Your Phone",

            axios
              .post("/api/client/register", {
                phone: this.phone,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
              })
              .then((response) => {
                this.has_otp = true;
                this.register_data = response.data.register_data;
                if (response.data.register_data.status == 1) {
                  this.registerUser = true;
                }
              })
              .catch((error) => {
                if (error.response.status == 422) {
                  this.highlightPhoneWithError = true;
                  setTimeout(() => {
                    this.validationErrors = error.response.data.errors;
                    this.alert_error();
                  }, 1000);
                }
              }),
            { closeTime: 2 }
          );
        }
      }
    },
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
    Otp_confirmation() {
      if (this.register_data.status == 1 && this.registerUser == true) {
        this.$dlg.mask(
          "Crediential Verifying",
          axios
            .post("/api/client-login", {
              email: this.phone,
              password: this.password,
            })
            .then((response) => {
              this.has_otp = true;
              this.data = response.data.token;
              this.$store.commit("retrieveToken", this.data);
              this.fetchUser(this.data);
              setTimeout(() => {
                this.$router.push("/checkout/delivery-details");
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              setTimeout(() => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  timer: 5000,
                  text: "Crediential Not Match!",
                });
              }, 1000);
            }),
          { closeTime: 2 }
        );
      } else {
        var self = this;
        const key = this.$dlg.mask();
        axios
          .post("/api/client/confirm-register", {
            phone: self.phone,
            otp: self.otp,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
          })
          .then((response) => {
            self.register_status = true;
            self.$dlg.mask("Verifying Your OTP", function () {}, {
              closeTime: 1,
            }),
              (self.register_success = response.data);
          })
          .catch((error) => {
            if (error.response.status == 401) {
              self.validationErrors = error.response.data.errors;
            }
          });
        this.registration_confirmation();
      }
    },
    fetchUser(token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .get("/api/user")
        .then((response) => {
          this.$store.commit("retrieveUser", response.data.data);
        })
        .catch((error) => {
          setTimeout(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              timer: 5000,
              text: "Email or Phone not Match!.",
            });
          }, 1000);
        });
    },
    alert_error() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: this.error,
      });
    },
    registration_confirmation() {
      if (this.register_success != null || this.register_success != "") {
        this.$store.commit("user_phone", this.phone);

        this.$router.push({ path: "/checkout/delivery-details" });
      } else {
        setTimeout(() => {
          this.alert_error();
        }, 2000);
      }
    },
  },
};
</script>
<style scoped>
@media only screen and (min-width: 360px) and (max-width: 768px) {
  .page-content {
    width: 100%;
    margin-left: 0;
  }
}
</style>