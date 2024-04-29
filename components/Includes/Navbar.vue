<template>

  <nav
    class="navbar navbar-expand-sm bg-jamuna navbar-jamuna justify-content-end"
  >
    <!-- <div class="navbar-brand"></div> -->
    <div class="container">

      <div class="navleft-container is-hidden-mobile"
           @mouseover="show_menu"
           @mouseleave="hide_menu">
        <div class="mega-menu-title">
          <h3>
            <!-- <font-awesome-icon
              :icon="['fas', 'bars']"
              style="color: #fff; font-size: 28px"
            /> -->
            <i
              class="fas fa-bars"
              aria-hidden="true"
              style="color: #fff; font-size: 28px"
            ></i>
            &nbsp;&nbsp;
            <span class="allCat"></span>
          </h3>
        </div>

        <!-- Shop by category -->
        <div class="mega-menu-category" :style="{ display: display }">
          <div class="navigation">
            <ul>
              <li
                class="has-sub"
                v-for="(category, index) in categories"
                :key="index"
              >
                <nuxt-link
                  :title="category.cat_name"
                  :to="{ path: '/category/' + category.slug }"
                  :style="{ cursor: 'pointer', 'text-decoration': 'none' }"
                >
                  <img
                    :src="filePath + category.cat_icone"
                    alt="icon"
                    style="text-align: left"
                    height="35px"
                    width="28px"
                  />

                  {{ category.cat_name }}
                  <span
                    v-show="category.cat_child.length > 0"
                    style="float: right; padding-top: 5px"
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                    <!-- <font-awesome-icon :icon="['fas', 'angle-double-right']" /> -->
                  </span>
                </nuxt-link>
                <ul v-if="category.cat_child.length > 0">
                  <li
                    class="has-sub"
                    v-for="(cat_child, index_cat_child) in category.cat_child"
                    :key="index_cat_child"
                  >
                    <nuxt-link
                      :title="cat_child.cat_name"
                      :to="{ path: '/category/' + cat_child.slug }"
                      :style="{ cursor: 'pointer', 'text-decoration': 'none' }"
                    >
                      <img
                        :src="filePath + cat_child.cat_icone"
                        alt="icon"
                        style="text-align: left"
                        height="35px"
                        width="28px"
                      />

                      {{ cat_child.cat_name }}
                      <span
                        v-show="cat_child.grand_child.length > 0"
                        style="float: right; padding-top: 5px"
                      >
                        <i
                          class="fa fa-angle-double-right"
                          aria-hidden="true"
                        ></i>
                        <!-- <font-awesome-icon
                          :icon="['fas', 'angle-double-right']"
                        /> -->
                      </span>
                    </nuxt-link>
                    <ul v-if="cat_child.grand_child.length > 0">
                      <li
                        class="has-sub"
                        v-for="(
                          grand_child, index_grand_child
                        ) in cat_child.grand_child"
                        :key="index_grand_child"
                      >
                        <nuxt-link
                          :title="grand_child.cat_name"
                          :to="{ path: '/category/' + grand_child.slug }"
                          :style="{
                            cursor: 'pointer',
                            'text-decoration': 'none',
                          }"
                        >
                          <img
                            :src="
                              filePath +
                              '/public/storage/category/' +
                              grand_child.icone
                            "
                            alt="icon"
                            style="text-align: left"
                            height="35px"
                            width="28px"
                          />

                          {{ grand_child.cat_name }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="navleft-container is-hidden-desktop">
        <div class="mega-menu-title" @click="mobile_show">
          <h3>
            <i
              class="fas fa-bars"
              aria-hidden="true"
              style="color: #fff; font-size: 28px"
            ></i>
            &nbsp;&nbsp;
            <span class="allCat"></span>
          </h3>
        </div>

        <!-- Vertical navbar -->
        <div
          class="vertical-nav bg-white"
          id="sidebar"
          :class="mobile_menu ? 'active' : ''"
        >
          <a class="btn" @click="mobile_hide">
            <!-- <font-awesome-icon :icon="['fas', 'times']" /> -->
            <i class="fas fa-times" aria-hidden="true"></i>
          </a>

          <div class="side-inner">
            <nuxt-link
              :to="{ path: '/' }"
              :title="getSettings.meta_title"
              style="padding-bottom: 5px"
            >
              <img :alt="getSettings.meta_title" src="/logo.png"/>
            </nuxt-link>

            <div
              class="mega-menu-category"
              style="display: block; border: 0; padding: 5px 0px">
              <div class="navigation mobile_scroll_menu">
                <ul>
                  <li
                    class="has-sub"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    <a @click="redirectTo(category)">
                      <img
                        :src="filePath + category.cat_icone"
                        alt="icon"
                        style="text-align: left"
                        height="35px"
                        width="28px"
                      />

                      {{ category.cat_name }}
                      <span
                        v-show="category.cat_child.length > 0"
                        style="float: right; padding-top: 5px"
                      >
                        <i
                          class="fa fa-angle-double-right"
                          aria-hidden="true"
                        ></i>
                        <!-- <font-awesome-icon
                          :icon="['fas', 'angle-double-right']"
                        /> -->
                      </span>
                    </a>
                    <ul v-if="category.cat_child.length > 0">
                      <li
                        class="has-sub"
                        v-for="(
                          cat_child, index_cat_child
                        ) in category.cat_child"
                        :key="index_cat_child"
                      >
                        <a @click="redirectTo(cat_child)">
                          <img
                            :src="filePath + cat_child.cat_icone"
                            alt="icon"
                            style="text-align: left"
                            height="35px"
                            width="28px"
                          />

                          {{ cat_child.cat_name }}
                          <span
                            v-show="cat_child.grand_child.length > 0"
                            style="float: right; padding-top: 5px"
                          >
                            <i
                              class="fa fa-angle-double-right"
                              aria-hidden="true"
                            ></i>
                            <!-- <font-awesome-icon
                              :icon="['fas', 'angle-double-right']"
                            /> -->
                          </span>
                        </a>
                        <ul v-if="cat_child.grand_child.length > 0">
                          <li
                            class="has-sub"
                            v-for="(
                              grand_child, index_grand_child
                            ) in cat_child.grand_child"
                            :key="index_grand_child"
                          >
                            <a @click="redirectTo(grand_child)">
                              <img
                                :src="
                                  filePath +
                                  '/public/storage/category/' +
                                  grand_child.icone
                                "
                                alt="icon"
                                style="text-align: left"
                                height="35px"
                                width="28px"
                              />

                              {{ grand_child.cat_name }}
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="collapse navbar-collapse flex-grow-0 is-hidden-mobile"
        id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div class="nav-link">
              <nuxt-link to="/"> HOME</nuxt-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <nuxt-link :to="{ path: '/about-us' }">ABOUT US</nuxt-link>
            </div>
          </li>

          <li class="nav-item">
            <div class="nav-link">
              <nuxt-link :to="{ path: '/media-center' }"
              >MEDIA CENTER
              </nuxt-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <nuxt-link :to="{ path: '/store-locator' }"
              >STORE LOCATOR
              </nuxt-link>
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <nuxt-link :to="{ path: '/contact-us' }">CONTACT US</nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<script>
import axios from "~/plugins/axios";
import url_slug from "~/plugins/url_encode";

export default {
  data() {
    return {
      display: "none",
      filePath: "https://erp.estorejamuna.com",
      mobile_menu: false,
      window_web: true,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  created() {
    this.fetchCategories();
    this.horizentalMenu();
    if (process.browser) {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (window.innerWidth <= 776) {
        this.window_web = false;
      }
    }
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    getSettings() {
      return this.$store.getters.getSiteSettings;
    },
    HorizentalMenu() {
      return this.$store.getters.getHorizentalMenu;
    },
    handleResize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      }
    },
  },

  watch: {
    $route() {
      this.display == "none";
    },
  },
  methods: {
    horizentalMenu() {
      axios.get("/api/cmsPage/" + "menu").then((response) => {
        this.$store.commit("setHorizentalMenu", response.data.details);
      });
    },

    redirectTo(item) {
      this.mobile_menu = false;

      this.$router.push({path: "/category/" + item.slug});
    },

    show_menu() {
      if (window.innerWidth <= 776) {
        this.display = "none";
      } else {
        this.display = "block";
      }
    },
    hide_menu() {
      if (this.display == "none") {
        this.display = "block";
      } else {
        this.display = "none";
      }
    },

    mobile_show() {
      this.mobile_menu = true;
    },

    mobile_hide() {
      this.mobile_menu = false;
    },

    fetchCategories() {
      axios.get("/api/categories").then((response) => {
        this.$store.commit("setCategories", response.data.categories);
      });
    },

    url_slug(value) {
      value = value.replace(/-+/g, "&&").replace(/\s+/g, "-");

      return value;
    },
  },
};
</script>
