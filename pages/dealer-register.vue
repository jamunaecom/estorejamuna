<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="shop_banner_area mb-30">
          <div class="row">
            <div class="col-12">
              <div class="shop_banner_thumb">
                <img
                  :data-src="
                    filePath + this.getBanner.image
                  "
                  alt="dealer banner"
                  v-lazy-load
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="validationErrors">
          <ul class="alert alert-danger">
            <li v-for="(value, index) in validationErrors" :key="index">
              @{{ value }}
            </li>
          </ul>
        </div>
        <h1 class="text-center mt-5">Dealer Registration</h1>
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
                >
                  Name is required
                </div>
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
                          :class="{
                            'is-invalid': submitted && $v.phone.$error,
                          }"
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
                  <span v-if="!$v.phone.minLength"
                    >Phone must be at least 11 digit</span
                  >
                </div>
              </div>
              <div class="field">
                <label for class="label"> Email&nbsp; </label>
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
              <!--<div class="field">-->
              <!--  <label for class="label">-->
              <!--    Home Address&nbsp;-->
              <!--  </label>-->
              <!--  <div class="control has-icons-left">-->
              <!--     <textarea placeholder="Not Mandatory" class="textarea"  v-model="present_address"></textarea>-->
              <!--    <span class="icon is-small is-left">-->
              <!--      <i class="fa fa-map-marker"></i>-->
              <!--    </span>-->
              <!--  </div>-->
              <!--</div>-->
              <div class="field">
                <label for class="label">
                  Buisness Address&nbsp;
                  <span class="require_input">*</span>
                </label>
                <div class="control has-icons-left">
                  <textarea
                    placeholder="e.g. 58/2 Rampura,Dhaka-1200"
                    class="textarea"
                    required
                    v-model="buisness_address"
                  ></textarea>
                  <span class="icon is-small is-left">
                    <i class="fa fa-map-marker"></i>
                  </span>
                </div>
              </div>
              <!-- <div class="field">-->
              <!--  <label for class="label">-->
              <!--    Permanent Address&nbsp;-->
              <!--  </label>-->
              <!--  <div class="control has-icons-left">-->
              <!--     <textarea placeholder="Not Mandatory" class="textarea"  v-model="permanent_address"></textarea>-->
              <!--    <span class="icon is-small is-left">-->
              <!--      <i class="fa fa-map-marker"></i>-->
              <!--    </span>-->
              <!--  </div>-->
              <!--</div>-->

              <div class="field">
                <button
                  class="button is-success is-medium is-pulled-right"
                  type="submit"
                >
                  Register
                </button>
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
    },
  },
});

export default {
  head() {
    return {
      title: "Dealer Registration | Jamuna Electronics",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Jamuna  Dealer Registration. Jamuna Group Dealer Registration.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "Jamuna Group, Jamuna Dealer Registration",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Dealer Registration | Jamuna Electronics",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "https://erp.estorejamuna.com/images/logo.png",
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content: "https://estorejamuna.com/dealer-register",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Dealer Registration | Jamuna Electronics.",
        },
      ],
    };
  },
  components: {
    Vuelidate
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      isLoading: false,
      fullPage: true,
      phone: "",
      email: "",
      buisness_address: "",
      permanent_address: "",
      full_name: "",
      present_address: "",
      disabled: 0,
      newsletter: "",
      submitted: false,
      client_details: [],
      validationErrors: "",
    };
  },
  validations: {
    full_name: { required },
    present_address: { required },
    phone: { required, minLength: minLength(11) },
    email: { email },
    buisness_address: { required },
    permanent_address: { required },
  },
  mounted() {
    this.baneer();
    // this.Loading()
  },
  computed: {
    getBanner() {
      return this.$store.getters.get_dealer_banner;
    },
  },
  methods: {
    Loading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    baneer() {
      axios.get("/api/dealer-banner").then((response) => {
        this.$store.commit("set_dealer_banner", response.data.dealer_banner);
      });
    },
    send_newsletter() {
      if ((this.register_button = false)) {
        this.register_button = true;
      } else {
        this.register_button = false;
      }
    },
    register() {
      this.submitted = true;

      this.$dlg.mask(
        "New Dealer Registering",
        axios
          .post("api/dealer-registration", {
            full_name: this.full_name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            present_address: this.present_address,
            permanent_address: this.permanent_address,
            buisness_address: this.buisness_address,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
          })
          .then((response) => {
            this.client_details = response.data;

            if (this.client_details.message) {
              Swal.fire({
                title: this.client_details.message,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok!",
              }).then((result) => {
                setTimeout(() => {
                  this.$router.push("/");
                }, 1000);
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.validationErrors = error.response.data.errors;
            }
          }),
        {
          closeTime: 1,
        }
      );
    },
  },
  watch: {
    validationErrors: function () {
      //scroll to top
    },
  },
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
