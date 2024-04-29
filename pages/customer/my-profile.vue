    <template>
  <div>
    <div class="main-container">
      <section class="main-container col2-right-layout">
        <div class="main container">
          <div class="row">
            <aside class="right sidebar col-sm-3 col-xs-12">
              <ClientSidebar></ClientSidebar>
            </aside>
            <div class="col-main col-sm-9 col-xs-12">
              <div class="my-account">
                <div class="page-title">
                  <h2>My Profile</h2>
                </div>
                <div class="dashboard">
                  <div class="container">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div class="card-body">
                            <div class="card-title mb-4">
                              <div class="d-flex justify-content-start">
                                <div class="image-container">
                                  <img
                                    src="http://placehold.it/150x150"
                                    id="imgProfile"
                                    style="width: 150px; height: 150px"
                                    class="img-thumbnail"
                                    alt="profile"
                                    v-if="customerInfo.avatar == null "
                                  />
                                  <img
                                    :src="filePath+customerInfo.avatar"
                                    id="imgProfile"
                                    style="width: 150px; height: 150px"
                                    class="img-thumbnail"
                                     alt="profile"
                                    v-else
                                  />
                                  <div class="middle">
                                    <input
                                      type="button"
                                      class="btn btn-info"
                                      id="btnChangePicture"
                                      value="Change"
                                      @click="myClickEvent"
                                    />
                                    <input
                                      type="file"
                                      style="display: none;"
                                      ref="profilePicture"
                                      name="file"
                                      @change="fileUpload"
                                    />
                                  </div>
                                </div>
                                <div class="userData ml-3">
                                  <h2 class="d-block" style="font-size: 1.5rem; font-weight: bold">
                                    <a href="javascript:void(0);">
                                      {{customerInfo.name}}
                                      <span
                                        v-if="customerInfo.status == 1"
                                        style="color:red"
                                      >
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                      </span>
                                    </a>
                                  </h2>
                                </div>
                                <div class="ml-auto">
                                  <input
                                    type="button"
                                    class="btn btn-primary d-none"
                                    id="btnDiscard"
                                    value="Discard Changes"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-12">
                                <div class="tab_container">
                                  <input id="tab1" type="radio" name="tabs" checked />
                                  <label for="tab1" class="tab_lable">
                                    <i class="fa fa-user"></i>
                                    <span>Basic Info</span>
                                  </label>

                                  <input id="tab2" type="radio" name="tabs" />
                                  <label for="tab2" class="tab_lable">
                                    <i class="fa fa-key"></i>

                                    <span>Password Change</span>
                                  </label>

                                  <section id="content1" class="tab-content">
                                      <form @submit.prevent="updateUserinfo">
                                    <div class="row">
                                      <div class="col-sm-3 col-md-2 col-5">
                                        <label style="font-weight:bold;">Full Name</label>
                                      </div>
                                      <div class="col-md-8 col-6">
                                          <input
                                          type="text"
                                          class="input is-rounded"
                                          v-model="name"
                                          />
                                        </div>
                                    </div>
                                    <hr />

                                    <div class="row">
                                      <div class="col-sm-3 col-md-2 col-5">
                                        <label style="font-weight:bold;">Email</label>
                                      </div>
                                      <div class="col-md-8 col-6">{{customerInfo.email}}</div>
                                    </div>
                                    <hr />

                                    <div class="row">
                                      <div class="col-sm-3 col-md-2 col-5">
                                        <label style="font-weight:bold;">Phone</label>
                                      </div>
                                      <div class="col-md-8 col-6">{{customerInfo.phone}}</div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                      <div class="col-sm-3 col-md-2 col-5">
                                        <label style="font-weight:bold;">Address</label>
                                      </div>
                                     <div class="col-md-8 col-6">
                                          <input
                                          type="text"
                                          class="input is-rounded"
                                          v-model="address"
                                          />

                                        </div>
                                    </div>
                                       <br />
                                        <div class="col-sm-12 col-md-6">
                                                <input
                                                  type="submit"
                                                  class="button is-success pull-right"
                                                  style="float:right"
                                                  value="Save"
                                                />
                                              </div>
                                    </form>
                                  </section>

                                  <section id="content2" class="tab-content">
                                        <div class="container">
                                          <h3 class="subtitle text-center">Change Password</h3>
                                          <div v-if="validationErrors">
                                                     <ul class="alert alert-danger">
                                                         <li v-for="(value, index)  in validationErrors" :key="index">@{{ value }}</li>
                                                     </ul>
                                                 </div>
                                          <form @submit.prevent="passwordChange">
                                            <div class="box-border">
                                              <div class="col-sm-12 col-md-8">
                                                <label for="telephone" class="required">Old Password</label>
                                                <input
                                                  class="input is-rounded"
                                                  type="password"
                                                  v-model="old_password"
                                                  name="password"
                                                />
                                              </div>

                                              <div class="col-sm-12 col-md-8">
                                                <label for="telephone" class="required">New Password</label>
                                                <input
                                                  class="input is-rounded"
                                                  type="password"
                                                  v-model="password"
                                                  name="password"
                                                />
                                              </div>
                                              <div class="col-sm-12 col-md-8">
                                                <label
                                                  for="telephone"
                                                  class="required"
                                                >Confirm Password</label>
                                                <input
                                                  class="input is-rounded"
                                                  type="password"
                                                  v-model="confirm_password"
                                                  name="confirm_password"
                                                />
                                              </div>
                                              <br />
                                              <div class="col-sm-12 col-md-6">
                                                <input
                                                  type="submit"
                                                  class="button is-success pull-right"
                                                  style="float:right"
                                                  value="Change Password"
                                                />
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                  </section>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import ClientSidebar from "~/components/client/sidebar";
import Swal from "sweetalert2";


export default {
  head() {
    return {
      title: "My Profile|User Profile,Jamuna Electronics ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "My Profile,User Profile. Jamuna Electronics"
        }
      ]
    };
  },
  middleware: "auth",
  components: {
    ClientSidebar,
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      isLoading: false,
      name_edit: false,
      address_edit: false,
      address: this.$store.getters.getCustomer.address,
      name: this.$store.getters.getCustomer.name,
      fullPage: true,
      old_password: null,
      password: null,
      confirm_password: null,
      submitted: false,
      validationErrors: "",
      avatar: ""
    };
  },
  mounted() {
    this.userInfo();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    customerInfo() {
      this.name = this.$store.getters.getCustomer.name;
      return this.$store.getters.getCustomer;
    }
  },
  methods: {
    myClickEvent($event) {
      const elem = this.$refs.profilePicture;
      elem.click();
    },
    updateUserinfo() {
      this.name_edit = false;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.token;
      axios
        .post("/api/user-edit", {
          name: this.name,
          address: this.address,
        })
        .then(response => {
            this.$store.commit("setCustomerInfo", response.data.user);
          this.name = response.data.user.name;
          this.$toasted.success("User Info Updated");
        })
        .catch(error => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Some Thing Wrong"
          });
        });
    },
    fileUpload(e) {
      this.avatar = this.$refs.profilePicture.files[0];

      let formData = new FormData();
      formData.append("avatar", this.avatar);
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.token;
      axios
        .post("/api/user-avatar", formData, config)
        .then(response => {
          this.$store.commit("setCustomerInfo", response.data.data);
          this.$toasted.success("Profile Picture Updated");
        })
        .catch(error => {
          this.$toasted.error(error.response.data.errors.avatar);
        });
    },
    userInfo() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.getters.token;
      axios
        .get("/api/user")
        .then(response => {
          this.$store.commit("setCustomerInfo", response.data.data);
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message
          });
        });
    },
    passwordChange() {
      this.submitted = true;

      if (this.password == this.confirm_password && this.password != null) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.$store.getters.token;
        axios
          .post("/api/password-change", {
            old_password: this.old_password,
            password: this.password
          })
          .then(response => {
            (this.old_password = null),
              (this.password = null),
              (this.confirm_password = null),
              Swal.fire({
                icon: "success",
                title: "Password Changed Successfully"
              });
          })
          .catch(error => {
            if (error.response.status == 401) {
              this.validationErrors = error.response.data.errors;
            }
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
  }
};
</script>
<style scoped>
hr{background-color:#f5f5f5;border:none;display:block;height:2px;margin:.5rem 0}.tab_container{width:100%;margin:0 auto;padding-top:70px;position:relative}.tab_container .tab-content{clear:both;padding-top:10px;display:none}.tab_container #tab1{clear:both;padding-top:10px;display:none}.tab_container #tab2{clear:both;padding-top:10px;display:none}.tab_container #tab3{clear:both;padding-top:10px;display:none}.tab_container #tab4{clear:both;padding-top:10px;display:none}.tab_container #tab5{clear:both;padding-top:10px;display:none}.tab_lable{font-weight:600;font-size:16px;display:block;float:left;width:50%;padding:1.5em;color:#e40514;cursor:pointer;text-decoration:none;text-align:center;background:#f0f0f0}#tab1:checked~#content1,#tab2:checked~#content2,#tab3:checked~#content3,#tab4:checked~#content4,#tab5:checked~#content5{display:block;padding:20px;background:#fff;color:#343434;border-bottom:2px solid #f0f0f0}.tab_container .tab-content h3,.tab_container .tab-content p{-webkit-animation:fadeInScale .7s ease-in-out;-moz-animation:fadeInScale .7s ease-in-out;animation:fadeInScale .7s ease-in-out}.tab_container .tab-content h3{text-align:center}.tab_container [id^=tab]:checked+label{background:#fff;box-shadow:inset 0 3px #5c5e5f;border:.5px solid #add8e6}.tab_container [id^=tab]:checked+label .fa{color:#e40514}ul#attr li{display:inline;padding:5px}.zoom img,.zoom:after{display:block;height:fit-content}@media screen and (max-width:480px){.tab_lable{font-weight:300;font-size:10px;display:block;float:left;padding:1em}}
</style>
