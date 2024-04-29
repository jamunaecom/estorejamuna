<template>
  <div>
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
                <strong>Login</strong>
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
          <div class="col-main col-sm-6 offset-sm-3">
            <div class="checkout-page">
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
              <validation-errors :errors="validationErrors" v-if="validationErrors"></validation-errors>

              <section class="hero is-light">
                <div class="hero-body">
                  <div class="container">
                    <h4 class="title text-center">Login</h4>
                    <form @submit.prevent="login">
                      <label>Email Or Phone</label>
                      <div class="field is-horizontal">
                        <div class="field-body">
                          <div class="field">
                            <div class="field has-addons">
                              <p class="control is-expanded">
                                <input
                                  :class="[highlightPhoneWithError ? 'input is-danger' : 'input'] "
                                  type="text"
                                  v-model="phone"
                                  placeholder="Phone Or Email Address"
                                />
                              </p>
                            </div>
                            <p
                              v-if="highlightPhoneWithError"
                              class="help is-danger"
                            >{{ phoneErrorLabel }}</p>
                          </div>
                        </div>
                      </div>

                      <label>Password</label>
                      <div class="field is-horizontal" v-if="email_login">
                        <div class="field-body">
                          <div class="field">
                            <p class="control is-expanded has-icons-left">
                              <input
                                :class="[highlightemailWithError ? 'input is-danger' : 'input'] "
                                type="email"
                                v-model="email"
                                placeholder="Email Address"
                                @keyup="checkEmailOnKeyUp(email)"
                              />
                              <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p v-if="highlightemailWithError" class="help is-danger">{{ emailErrorLabel }}</p>
                      <div class="field is-horizontal">
                        <div class="field-body">
                          <div class="field">
                            <input
                              class="input"
                              type="password"
                              v-model="password"
                              placeholder="Password"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div class="field is-horizontal">
                        <nuxt-link
                          class="btn btn-link level-left"
                          :to="{path:'/client/forgot-password'}"
                        >Forgot Password?</nuxt-link>
                        <div class="field-body">
                          <div class="field">
                            <div class="control">
                              <input
                                type="submit"
                                class="button is-success pull-right"
                                style="float:right"
                                value="Log In"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <!--  <div class="email_login" v-if="email_login">
                       <a
                         class="button is-info is-outlined is-large is-fullwidth"
                         @click="loginwithPhone"
                       >Login With Phone!</a>
                     </div>
                     <div class="email_login" v-if="phone_login">
                       <a
                         class="button is-info is-outlined is-large is-fullwidth"
                         @click="loginwithEmail"
                       >Login With Email!</a>
                    </div>-->
                  </div>
                </div>
                <div class="card-footer">
                  Don't have an account? &nbsp;
                  <nuxt-link class="reg_class" :to="{path:'/registration'}">Sign Up</nuxt-link>
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
import { isValidEmail } from "~/plugins/emailValidation";
import Swal from "sweetalert2";
import Vuelidate from "vuelidate";
import Cookies from "js-cookie";
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
      title: 'Login | Jamuna Electronics ',
      meta: [
        { hid: 'description', name: 'description', content: 'User Login. Jamuna Electronics' },
        { hid: 'description', name: 'description', content: 'User Login. Jamuna Electronics user login' },
        { hid: 'keywords', name: 'keywords', content: 'Login. Jamuna Electronics, Jamuna Group, Ecommerce, Ac, Led Tv, Fridge' },
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
      data: "",
      phone: "",
      email: "",
      password: "",
      register_status: false,
      phone_error: null,
      register_success: [],
      success: false,
      has_error: false,
      error: "",
      serverError: "",
      notify: true,
      email_login: false,
      phone_login: true,
      successMessage: this.dataSuccessMessage,
      highlightPhoneWithError: null,
      highlightemailWithError: null,
      phoneNotValidLabel: "Phone Number Invalide!",
      emailNotValidLabel: "Email Invalid",
      phoneErrorLabel: "",
      emailErrorLabel: "",
      validationErrors: ""
    };
  },
  methods: {
    hide_message() {
      this.notify = true;
    },
    checkPhoneOnKeyUp(phone) {
      if (this.phone && isValidPhone(this.phone)) {
        this.highlightPhoneWithError = false;
      } else {
        this.highlightPhoneWithError = true;

        if (!isValidPhone(this.phone)) {
          this.phoneErrorLabel = this.phoneNotValidLabel;
        }
      }
    },
    checkEmailOnKeyUp(email) {
      if (this.email && isValidEmail(this.email)) {
        this.highlightemailWithError = false;
      } else {
        this.highlightemailWithError = true;

        if (!isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      }
    },
    loginwithPhone() {
      this.email = null;
      this.email_login = false;
      this.phone_login = true;
    },
    loginwithEmail() {
      this.phone = null;
      this.phone_login = false;
      this.email_login = true;
    },
    login() {
      if (this.phone_login) {
        if (!this.phone || !isValidPhone(this.phone)) {
          this.highlightPhoneWithError = true;
          this.phoneErrorLabel = this.phoneNotValidLabel;
        }
      } else if (this.email_login) {
        if (!this.email || !isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      } else if (this.password && this.password.length < 6) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          timer: 5000,
          text: "Password At least 6 charecter"
        });
      }

      this.highlightPhoneWithError = false;
      this.register_status = true;
      this.$dlg.mask("Login Functionality Check", function() {}, {
        closeTime: 1
      });
      //login functionality
      axios
        .post("/api/client-login", {
          email: this.email_login ? this.email : this.phone,
          password: this.password
        })
        .then(response => {
          this.data = response.data.token;
          Cookies.set("access_token", this.data);
          this.$store.commit("retrieveToken", this.data);
          this.fetchUser(this.data);
          if(this.$route.query.redirect && this.$route.query.redirect == "product"){
            this.$router.push('/product/'+this.$route.query.slug);
          }else {
            setTimeout(() => {
              this.$router.push("/customer/dashboard");
            }, 1000);
          }

        })
        .catch(error => {
          if (error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          } else {
            setTimeout(() => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                timer: 5000,
                text: "Email or Phone not Match!."
              });
            }, 1000);
          }
        });

      //end login
    },
    fetchUser(token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios
        .get("/api/user")
        .then(response => {
          this.$store.commit("retrieveUser", response.data.data);
        })
        .catch(error => {
          setTimeout(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              timer: 5000,
              text: "Email or Phone not Match!."
            });
          }, 1000);
        });
    },

    emailLogin() {
      if (!this.email) {
        this.highlightemailWithError = true;

        if (this.phone && !isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      } else {
        this.register_status = true;
        this.$dlg.mask("Login Functionality Check", function() {}, {
          closeTime: 1
        });
        //login functionality
        this.$store
          .dispatch("retrieveToken", {
            username: this.email,
            password: this.password
          })
          .then(response => {
            this.$store.dispatch("retrieveName");
            setTimeout(() => {
              this.$router.push("/customer/dashboard");
            }, 1000);
          })
          .catch(error => {
            this.notify = false;
            this.serverError = "Username Or Password error!";
            this.password = "";
            this.successMessage = "";
          });
      }
    },
    alert_error() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: this.error
      });
    }
  }
};
</script>
<style scoped>
.reg_class {
  font-size: 16px;
  color: #3273dc;
  font-weight: 600;
}
.email_login {
  padding: 15px 0px 15px 0px;
}
</style>
