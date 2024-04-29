<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
       <div v-if="validationErrors">
                  <ul class="alert alert-danger">
                      <li v-for="(value, index)  in validationErrors" :key="index">@{{ value }}</li>
                  </ul>
              </div>
        <h2 class="title text-center">New Customer</h2>
        <div class="columns is-centered">
          <div class="column is-5-tablet is-6-desktop is-6-widescreen">
            <form @submit.prevent="register" class="box">
              <div class="field">
                <label for class="label">
                  Full Name&nbsp;
                  <span class="require_input">*</span>
                </label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="Jon Deo"
                    class="input"
                    :class="{ 'is-invalid': submitted && $v.full_name.$error }"
                    v-model="full_name"
                    required
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <div
                  v-if="submitted && $v.full_name.required"
                  class="invalid-feedback"
                >Name is required</div>
              </div>

              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <label for class="label">
                      Phone&nbsp;
                      <span class="require_input">*</span>
                    </label>

                    <div class="field has-addons">
                      <p class="control">
                        <a class="button is-static">+88</a>
                      </p>
                      <p class="control is-expanded">
                        <input
                          :class="{ 'is-invalid': submitted && $v.phone.$error }"
                          type="tel"
                          class="input"
                          v-model="phone"
                          placeholder="0123456789"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="submitted" class="invalid-feedback">
                  <span v-if="!$v.phone.required">Phone is required</span>
                  <span v-if="!$v.phone.minLength">Phone must be at least 11 digit</span>
                </div>
              </div>
              <div class="field">
                <label for class="label">
                  Email&nbsp;
                </label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    :class="{ 'is-invalid': submitted && $v.email.$error }"
                    v-model="email"
                    
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
                <div v-if="submitted" class="invalid-feedback">
                  <span v-if="!$v.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="field">
                <label for class="label">
                  Address&nbsp;
                  <span class="require_input">*</span>
                </label>
                <div class="control has-icons-left">
                  <textarea placeholder="e.g. 58/2 Rampura,Dhaka-1200" class="textarea" required v-model="address"></textarea>
                  <span class="icon is-small is-left">
                    <i class="fa fa-map-marker"></i>
                  </span>
                </div>
                <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                  <span v-if="!$v.password.required">Password is required</span>
                  <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                </div>
              </div>
              <div class="field">
                <label for class="label">
                  Password&nbsp;
                  <span class="require_input">*</span>
                </label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    :class="{ 'is-invalid': submitted && $v.password.$error }"
                    required
                    v-model="password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
                <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                  <span v-if="!$v.password.required">Password is required</span>
                  <span v-if="!$v.password.minLength">Password must be at least 6 characters</span>
                </div>
              </div>
              <div class="field">
                <label for class="label">
                  Confirm Password&nbsp;
                  <span class="require_input">*</span>
                </label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    class="input"
                    :class="{ 'is-invalid': submitted && $v.confirm_password.$error }"
                    required
                    v-model="confirm_password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
                <div v-if="submitted && $v.confirm_password.$error" class="invalid-feedback">
                  <span v-if="!$v.confirm_password.required">Confirm Password is required</span>
                  <span v-else-if="!$v.confirm_password.sameAsPassword">Passwords must match</span>
                </div>
              </div>
              <div class="field">
                <label for class="checkbox">
                  <input
                    type="checkbox"
                    v-model="newsletter"
                    v-on:change="disabled = (disabled + 1) % 2"
                  />
                  Sign up for our newsletter!
                </label>
              </div>
              <nuxt-link
                class="btn btn-link level-left"
                :to="{path:'/client/login'}"
              >Already Have an Account</nuxt-link>

              <div class="field">
                <button
                  class="button is-success is-medium is-pulled-right"
                  type="submit"
                  :disabled="disabled == 0"
                >Register</button>
              </div>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import Vue from "vue";
  import axios from "~/plugins/axios";
  import Vuelidate from "vuelidate";
  Vue.use(Vuelidate);
  import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
  import Swal from "sweetalert2";
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
  
    head() {
    return {
      title:'Registration | Jamuna Electronics',
      meta: [
        {
          hid: "description",
          name: "description",
          content:'Jamuna  Registration. Jamuna Group Registration.'
        },
        {
          hid: "keywords",
          name: "keywords",
          content:'Jamuna Group, Jamuna User Registration'
        },
        {
          hid: "og:title",
          name: "og:title",
          content:'Registration | Jamuna Electronics'
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "http://localhost:8000/images/logo.png"
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content:
            "http://estorejamuna.com/registration"
        },
        {
          hid: "og:description",
          name: "og:description",
          content:'Registration | Jamuna Electronics.'
        }
      ]
    };
  },
    components: {
      Vuelidate
    },
    data() {
      return {
        isLoading: false,
        fullPage: true,
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        full_name: "",
        address: "",
        disabled: 0,
        newsletter: "",
        submitted: false,
        client_details: [],
        validationErrors: ""
      };
    },
    validations: {
      full_name: { required },
      address: { required },
      phone: { required, minLength: minLength(11) },
      email: { email },
      password: { required, minLength: minLength(6) },
      confirm_password: { required, sameAsPassword: sameAs("password") }
    },
    methods: {
      send_newsletter() {
        if ((this.register_button = false)) {
          this.register_button = true;
        } else {
          this.register_button = false;
        }
      },
      register() {
        this.submitted = true;

        if (this.password == this.confirm_password && this.password != null) {
          //scroll to top
      

          this.$dlg.mask("New User Registering", function() {}, {
            closeTime: 1
          });
          axios
            .post("/api/registration", {
              full_name: this.full_name,
              email: this.email,
              password: this.password,
              phone: this.phone,
              address: this.address,
              xsrfCookieName: "XSRF-TOKEN",
              xsrfHeaderName: "X-XSRF-TOKEN"
            })
            .then(response => {
              this.client_details = response.data.client;

              if (this.client_details.id) {
                let client_id = response.data.client.client_id;
                let email = response.data.client.email;
                let phone = response.data.client.phone;
                localStorage.setItem("client_phone", phone);
                localStorage.setItem("client_password", this.password);
                this.$router.push("/register-confirm");
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
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password Not Match"
          });
        }
      }
    },
    watch: {
      validationErrors: function() {
        //scroll to top
       
      }
    }
  };
</script>
<style scoped>
  .button[disabled],
  fieldset[disabled] .button {
    background-color: black;
    buser-color: #dbdbdb;
    box-shadow: none;
    opacity: 0.5;
  }

  .hero.is-halfheight .hero-body,
  .hero.is-fullheight .hero-body,
  .hero.is-fullheight-with-navbar .hero-body {
    -webkit-box-align: center;
    display: block;
  }
  .require_input {
    color: #e40514;
  }
</style>
