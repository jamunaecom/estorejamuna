<template>
  <div class="main-container">
    <div v-if="fetchedData.products">
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
                  <strong>{{ fetchedData.products.pro_name }}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Breadcrumbs End -->

      <div class="modal" v-bind:class="{ 'is-active': catActive }">
        <div class="modal-background"></div>
        <div class="modal-card" :style="modalSize">
          <header class="modal-card-head">
            <p class="modal-card-title text-center">Cart Item</p>
            <button class="delete" @click="close" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <table class="table is-fullwidth is-borderless">
              <tbody>
              <tr class="columns">
                <td class="column">
                  <figure class="image is-128x128">
                    <img
                      :src="filePath + cart_item.feature_image"
                      :alt="cart_item.pro_name"
                    />
                  </figure>
                </td>
              </tr>
              <tr class="columns">
                <td class="column">{{ cart_item.pro_name }}</td>
              </tr>
              <tr class="columns">
                <td class="column">
                  <p class="special-price">
                      <span class="price"
                      >Tk {{ cart_item.discount_price }}</span
                      >
                  </p>
                </td>
              </tr>
              <tr class="columns">
                <td class="column">
                  <p class="old-price">
                      <span class="price"
                      >Tk {{ cart_item.regular_price }}</span
                      >
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
            <hr/>
            <div>
              <div class="field">
                <button
                  class="button is-success is-pulled-right"
                  @click="checkout"
                >
                  CheckOut
                </button>
              </div>
              <div class="field">
                <button class="button is-info is-pulled-left" @click="close">
                  Continue Shopping
                </button>
              </div>
            </div>
          </section>
        </div>

        <button @click="close" class="modal-close"></button>
      </div>
      <div class="modal" v-bind:class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title text-center">Compare Product</p>
            <button class="delete" @click="close" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <table class="table is-fullwidth is-borderless">
              <tbody>
              <tr
                class="columns"
                v-for="(compair_product, index_key) in compairProducts"
                :key="index_key"
              >
                <td class="column">Product {{ index_key + 1 }}</td>
                <td class="column">
                  <img
                    :src="filePath + compair_product.feature_image"
                    :alt="compair_product.pro_name"
                  />
                </td>
                <td class="column">{{ compair_product.pro_name }}</td>
                <td class="column">
                  <p class="special-price">
                      <span class="price"
                      >Tk {{ compair_product.discount_price }}</span
                      >
                  </p>
                </td>
                <td class="column">
                  <p class="old-price">
                      <span class="price"
                      >Tk {{ compair_product.regular_price }}</span
                      >
                  </p>
                </td>
                <td class="column">
                  <a
                    class="button is-small is-danger"
                    @click="removeCompair(index_key)"
                  >Remove Compare</a
                  >
                </td>
              </tr>
              </tbody>
            </table>
          </section>
        </div>
        <button @click="close" class="modal-close"></button>
      </div>

      <div class="main-container col1-layout">
        <div class="container">
          <div class="col-main">
            <div class="product-view-area">
              <div class="row">
                <div
                  class="product-big-image col-12 col-sm-6 col-lg-6 col-md-6"
                >
                  <div class="card-carousel">
                    <div class="card-img">
                      <client-only>
                        <pic-zoom
                          :url="
                            currentImage
                              ? filePath + currentImage
                              : filePath + fetchedData.products.feature_image
                          "
                          :scale="1.75"
                          :scroll="true"
                          v-lazy-load
                        ></pic-zoom>
                      </client-only>
                      <!--<v-zoomer>-->
                      <!--<img-->
                      <!--  :data-src="[imageActive == false ? filePath+currentImage : filePath+color_image_view]"-->
                      <!--  :width="width"-->
                      <!--  ref="current_view_Image"-->
                      <!--  style="object-fit: contain; width: 100%; height: 100%;"-->
                      <!--  :alt="fetchedData.products.pro_name"-->
                      <!--  v-lazy-load-->
                      <!--/>-->
                      <!--</v-zoomer>-->
                      <!-- <pic-zoom :url="[imageActive == false ? filePath+currentImage : color_image_view]" :scale="3" ref="current_view_Image"></pic-zoom> -->
                      <!-- <img :src="filePath+currentImage" alt=""> -->
                      <!-- <zoom-on-hover :img-normal="[imageActive == false ? filePath+currentImage : color_image_view]" ref="current_view_Image"></zoom-on-hover> -->
                      <!-- <v-zoom :img="[imageActive == false ? filePath+currentImage : color_image_view]" :width="width" ref="current_view_Image"></v-zoom> -->

                      <div class="actions">
                        <span @click="prevImage" class="prev">&#8249;</span>
                        <span @click="nextImage" class="next">&#8250;</span>
                      </div>
                    </div>
                    <div class="thumbnails">
                      <div
                        v-for="(image, index) in images"
                        :key="image.id"
                        :class="[
                          'thumbnail-image',
                          activeImage == index ? 'active' : '',
                        ]"
                        @click="activateImage(index)"
                      >
                        <img
                          :data-src="filePath + image"
                          style="width: 100px"
                          :alt="fetchedData.products.pro_name"
                          v-lazy-load
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-6 col-md-6">
                  <div class="product-name">
                    <h1>{{ fetchedData.products.pro_name }}</h1>
                  </div>
                  <div class="price-box" v-if="item.discount_amount != 0">
                    <p class="special-price">
                      <span class="price-label1">Special Price:</span>
                      <span class="price" v-if="color_product"
                      >Tk {{ color_price }}</span
                      >
                      <span class="price" v-else
                      >Tk
                        {{
                          formatPrice(fetchedData.products.discount_price)
                        }}</span
                      >
                    </p>

                    <p class="special-price">
                      ( Save
                      <span class="price">
                        <span v-if="item.discount_type == 2"
                        >{{ item.discount_amount }}%</span
                        >
                        <span v-else>Tk {{ item.discount_amount }}</span> </span
                      >)
                    </p>
                  </div>
                  <div class="price-box" v-else>
                    <p class="special-price">
                      <span class="price-label1">Regular Price:</span>
                      <span class="price" v-if="color_product"
                      >Tk {{ color_price }}</span
                      >
                      <span class="price" v-else
                      >Tk
                        {{
                          formatPrice(fetchedData.products.discount_price)
                        }}</span
                      >
                    </p>
                  </div>
                  <div class="price-box" v-if="item.discount_amount != 0">
                    <p class="old-price">
                      <span class="price-label1">Regular Price:</span>
                      <span class="price"
                      >Tk
                        {{
                          formatPrice(fetchedData.products.regular_price)
                        }}</span
                      >
                    </p>
                  </div>

                  <div
                    class="ratings"
                    v-if="fetchedData.products.pro_quantity > 0"
                  >
                    <p class="availability in-stock">
                      Availability:
                      <span>In Stock</span>
                    </p>
                    <p class="icon-sale-label pro_badge"
                       v-show="fetchedData.products.discount_amount <= 0 && fetchedData.products.pro_level.id != 1 && fetchedData.products.pro_level != null">
                      <span>{{ fetchedData.products.pro_level.name }}</span>
                    </p>
                  </div>

                  <div class="ratings" v-else>
                    <p class="availability in-outstock">
                      Availability:
                      <span>Out Of Stock</span>
                    </p>
                    <p class="icon-sale-label pro_badge" v-show="fetchedData.products.pro_level.id != 1 && fetchedData.products.pro_level != null">
                      <span>{{ fetchedData.products.pro_level.name }}</span>
                    </p>
                  </div>

                  <div class="short-description">
                    <h2>Quick Overview</h2>
                    <p v-html="fetchedData.products.pro_specification"></p>
                  </div>
                  <div
                    class="color-image row"
                    v-if="fetchedData.products.product_stock.length > 0"
                  >
                    <h2>Color</h2>

                    <div
                      v-for="(src, index) in fetchedData.products.product_stock"
                      :key="index"
                    >
                      <img
                        :src="
                          filePath +
                          '/public/storage/' +
                          src.product_id +
                          '/' +
                          src.color_image
                        "
                        :title="src.color_name"
                        :alt="src.color_name"
                        style="cursor: pointer"
                        width="50px"
                        height="50px"
                        :class="[
                          imageNo == src.id
                            ? 'imageActive img-thumbnail'
                            : 'img-thumbnail',
                        ]"
                        v-lazy-load
                        @click="colorImage(fetchedData.products, src)"
                      />
                      <p style="text-align: center">
                        <b>{{ src.color_name }}</b>
                      </p>
                    </div>
                  </div>

                  <div class="product-variation">
                    <form action="#" method="post">
                      <div class="cart-plus-minus">
                        <label for="qty">Quantity:</label>
                        <div class="numbers-row">
                          <div @click="quentity_remove" class="dec qtybutton">
                            <i class="fa fa-minus">&nbsp;</i>
                          </div>
                          <input
                            type="text"
                            class="qty"
                            title="Qty"
                            value="1"
                            maxlength="12"
                            id="qty"
                            name="qty"
                            v-model="quentity"
                          />
                          <div @click="quentity_add" class="inc qtybutton">
                            <i class="fa fa-plus">&nbsp;</i>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- <div class="checkbox">
                  <label style="font-weight: bold;">
                    <input type="checkbox" @change="emi_apply" /> EMI
                  </label>
                  </div> -->
                  <!-- <div class="buttons are small" v-show="emi">
                    <div class="btn-group" data-toggle="buttons">
  <label class="btn btn-primary active">
    <input type="radio" name="options" value="red" autocomplete="off" checked> Red
  </label>
  <label class="btn btn-success">
    <input type="radio" name="options" value="orange" autocomplete="off"> Orange
  </label>
  <label class="btn btn-info">
    <input type="radio" name="options" value="yellow" autocomplete="off"> Yellow
  </label>

  <label class="btn btn-warning">
    <input type="radio" name="options" value="yellow" autocomplete="off"> Yellow
  </label>
</div>
                  </div> -->
                  <div class="product-variation margin-top-20 margin-bottom-20">
                    <!-- <div class="buttons are-small" v-if="emi == false"> -->
                    <div class="buttons are-small">
                      <!--<button class="button is-info pro_button" @click="addToCard(fetchedData.products)" v-show="fetchedData.products.pro_quantity > 0">-->
                      <!--  <span>-->
                      <!-- <i class="fa fa-shopping-basket"></i> -->
                      <!--    <font-awesome-icon :icon="['fas', 'shopping-basket']" />-->

                      <!--    Cart-->
                      <!--  </span>-->
                      <!--</button>-->
                      <button
                        class="button is-danger pro_button"
                        @click="byeNow(fetchedData.products)"
                        v-show="fetchedData.products.pro_quantity > 0"
                      >
                        <span>
                          <i class="fa fa-shopping-basket"></i>

                          Buy
                        </span>
                      </button>
                      <!--<button class="button is-primary pro_button" @click="addToWish(fetchedData.products)">-->
                      <!-- <i class="fa fa-heart"></i> -->
                      <!--  <font-awesome-icon :icon="['fas', 'heart']"/>-->
                      <!--  <span>Wishlist</span>-->
                      <!--</button>-->

                      <button
                        class="button is-success pro_button"
                        @click="compairProduct(fetchedData.products)"
                      >
                        <i class="fa fa-link"></i>

                        <span>Compare</span>
                      </button>
                    </div>
                    <!-- <div class="buttons are-large" v-else>
                      <button class="button is-danger is-fullwidth" @click="byeNow(fetchedData.products)" v-show="fetchedData.products.pro_quantity > 0">
                        <span>
                          <i class="fa fa-shopping-basket"></i> Buy
                        </span>
                      </button>
                    </div> -->
                  </div>

                  <div class="share-box" v-show="fetchedData.products">
                    <p>Share in social media</p>
                    <ShareNetwork
                      class="socialbtn"
                      v-for="network in networks"
                      :network="network.network"
                      :key="network.network"
                      :style="{ backgroundColor: network.color }"
                      :url="
                        `https://estorejamuna.com/product/` +
                        fetchedData.products.slug
                      "
                      :title="fetchedData.products.pro_name"
                      :description="fetchedData.products.pro_name"
                    >
                      <i :class="network.icon"></i>
                      <span>{{ network.name }}</span>
                    </ShareNetwork>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="product-overview-tab">
            <div class="tab_container">
              <input id="tab1" type="radio" name="tabs" checked/>
              <label for="tab1" class="tab_lable">
                <i class="fa fa-image"></i>

                <span>Gallery</span>
              </label>

              <input id="tab2" type="radio" name="tabs"/>
              <label for="tab2" class="tab_lable">
                <i class="fa fa-desktop"></i>

                <span>Features</span>
              </label>

              <input id="tab3" type="radio" name="tabs"/>
              <label for="tab3" class="tab_lable">
                <i class="fa fa-cogs" aria-hidden="true"></i>

                <span>Specification</span>
              </label>

              <input id="tab4" type="radio" name="tabs"/>
              <label for="tab4" class="tab_lable">
                <i class="fas fa-award" aria-hidden="true"></i>

                <span>Warranty</span>
              </label>
              <input id="tab5" type="radio" name="tabs"/>
              <label for="tab5" class="tab_lable">
                <i class="fa fa-comments" aria-hidden="true"></i>

                <span>Review</span>
              </label>

              <section id="content1" class="tab-content">
                <section id="gallery">
                  <div v-if="featureImages.length > 0">
                    <h4>Feature Images</h4>
                    <img
                      v-for="(src, sec_index) in featureImages"
                      :src="filePath + src.big"
                      :key="sec_index"
                      class="img-fluid"
                      :alt="fetchedData.products.pro_name"
                    />
                  </div>
                  <div v-if="moreImages.length > 0">
                    <h4>Other Images</h4>

                    <img
                      v-for="(src, sec_index) in moreImages"
                      :src="filePath + src.big"
                      :key="sec_index"
                      class="img-fluid"
                      :alt="fetchedData.products.pro_name"
                    />
                  </div>
                  <div
                    class="embed-responsive embed-responsive-16by9"
                    v-show="fetchedData.products.youtubeId != null"
                  >
                    <iframe
                      class="embed-responsive-item"
                      :src="
                        `https://www.youtube.com/embed/` +
                        fetchedData.products.youtubeId
                      "
                      allowfullscreen
                    ></iframe>
                  </div>
                </section>
              </section>

              <section id="content2" class="tab-content">
                <div class="list-group" style="width: 100%; margin: auto">
                  <table class="table table-striped">
                    <tbody>
                    <tr
                      v-for="(feature, index) in fetchedData.products
                          .product_details"
                      :key="index"
                    >
                      <td
                        style="
                            font-size: 14px;
                            font-weight: 800;
                            vertical-align: middle;
                          "
                      >
                        {{ feature.attrbute }}
                      </td>
                      <td>
                        <div>
                          <ul id="attr">
                            <div v-if="Array.isArray(feature.attr_value)">
                              <li
                                v-for="(
                                    attr_data, attr_key
                                  ) in feature.attr_value"
                                :key="attr_key"
                              >
                                  <span class="tag is-dark">{{
                                      attr_data
                                    }}</span>
                              </li>
                            </div>
                            <li v-else>
                              <span v-html="feature.attr_value"></span>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="content3" class="tab-content">
                <div class="list-group" style="width: 100%; margin: auto">
                  <table class="table table-striped">
                    <tbody>
                    <tr v-for="(Specefic, index) in ProSpecefic" :key="index">
                      <template  v-if="Specefic != null">
                      <td
                        style="
                            font-size: 14px;
                            font-weight: 800;
                            vertical-align: middle; "
                      >
                        {{ Specefic.name }}
                      </td>
                      <td v-html="Specefic.specif_value">

                      </td>
                      </template>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="content4" class="tab-content">
                <pre v-html="fetchedData.products.support"></pre>
              </section>
              <section id="content5" class="tab-content">
                <div class="col-sm-12">
                  <div class="row">
                    <div class="col-sm-5">
                      <div class="reviews-content-left">
                        <h2>Customer Reviews</h2>
                        <div
                          class="review-ratting"
                          v-for="(
                            productReview, review_index
                          ) in productReviews"
                          :key="review_index"
                        >
                          <star-rating
                            :rating="productReview.rating"
                            :read-only="true"
                            :increment="0.01"
                            :star-size="30"
                            active-color="#e40514"
                          ></star-rating>

                          <p>{{ productReview.review }}</p>
                          <p>{{ productReview.comment }}</p>
                          <p class="author">
                            {{ productReview.username }}
                            <small
                            >(Posted on
                              {{
                                $moment(
                                  String(productReview.created_at)
                                ).format("MMM Do YYYY, h:mm a")
                              }})</small
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-7">
                      <template  v-if="loggedIn">
                      <div class="reviews-content-right">
                        <h2>Write Your Own Review</h2>
                        <form @submit.prevent="productReview" method="post" action="#">
                          <h4>
                            How do you rate this product?
                          </h4>

                          <div v-show="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                              <li
                                v-for="(error, index) in errors"
                                :key="index"
                                class="text-danger"
                              >
                                {{ error }}
                              </li>
                            </ul>
                          </div>

                          <star-rating
                            :increment="0.5"
                            :max-rating="5"
                            active-color="#e40514"
                            :star-size="30"
                            v-model="rating"
                          ></star-rating>

                          <div class="form-area">
                            <div class="form-element">
                              <label>
                                Summary of Your Review
                                <em>*</em>
                              </label>
                              <input type="text" v-model="review"/>
                            </div>
                            <div class="form-element">
                              <label>Review</label>
                              <textarea v-model="comment"></textarea>
                            </div>

                            <recaptcha @success="markRecaptchaAsVerified"/>
                            <br/>

                            <div class="form-element">
                              <button
                                class="btn btn-success submit"
                                title="Submit Review"
                                type="submit"
                              >
                                <span>
                                  <i class="fa fa-thumbs-up"></i>
                                  &nbsp;Review
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      </template>
                      <template v-else>
                        <p>
                          Login For Comment.
                          <nuxt-link  :to="'/client/login?redirect=product&slug='+fetchedData.products.slug"
                          >Click Here
                          </nuxt-link
                          >
                        </p>
                      </template>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <!--related product-->
      <RelatedProduct v-bind:relatedProducts="fetchedData.related_products"/>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";
import {Tabs, Tab} from "@crow1796/vue-bulma-tabs";
import Swal from "sweetalert2";
import moment from "moment";
import {Hooper, Slide, Pagination as HooperPagination} from "hooper";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
// import VueYandexShare from "@alexlit/vue-yandex-share";
import PicZoom from "@/components/product/zoom";
import RelatedProduct from "~/components/RelatedProduct";

Vue.use(Viewer);
// import vZoom from "vue-zoom";

export default {
  async asyncData(context) {
    return context.$axios
      .get("/api/products/" + context.route.params.id)
      .then((res) => {
        return {fetchedData: res.data};
      });
  },


  head() {
    return {
      title:
        this.fetchedData.products.meta_title != null
          ? this.fetchedData.products.meta_title
          : this.fetchedData.products.pro_name,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            this.fetchedData.products.meta_description != null
              ? this.fetchedData.products.meta_description
              : this.fetchedData.products.pro_name,
        },

        {
          hid: "keywords",
          name: "keywords",
          content:
            this.fetchedData.products.meta_description != null
              ? this.fetchedData.products.meta_description
              : this.fetchedData.products.pro_name,
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
            this.fetchedData.products.meta_title != null
              ? this.fetchedData.products.meta_title
              : this.fetchedData.products.pro_name,
        },
        {
          hid: "og:image",
          name: "og:image",
          content:
            "https://erp.estorejamuna.com" +
            this.fetchedData.products.feature_image,
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "Ecommerce",
        },
        {
          hid: "og:url",
          name: "og:url",
          content:
            "https://www.estorejamuna.com" +
            "/product/" +
            this.fetchedData.products.slug,
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
            this.fetchedData.products.meta_description != null
              ? this.fetchedData.products.meta_description
              : this.fetchedData.products.pro_name,
        },
        {
          hid: "robots",
          name: "robots",
          content: this.fetchedData.products.radio_meta,
        },
      ],
      link: [
        {rel: "canonical", href: this.fetchedData.products.canonical_url},
      ],
    };
  },

  components: {
    Tabs,
    Tab,
    Hooper,
    Slide,
    PicZoom,
    HooperPagination,
    RelatedProduct,
    // VueYandexShare,
    // vZoom,
    // PicZoom,
  },

  data() {
    return {
      filePath: "https://erp.estorejamuna.com",
      tabsel: "desc",
      cart_item: [],
      catActive: false,
      imageActive: false,
      color_image_view: "",
      product_id: this.$route.params.id,
      attrbutes: [],
      quentity: 1,
      items: [],
      itemShow: 4,
      imageNo: "",
      color_images: [],
      images: [],
      width: 2500,
      activeImage: 0,
      featureImages: [],
      moreImages: [],
      isLoading: false,
      emi: false,
      fullPage: true,
      isActive: false,
      modalOpen: false,
      error: "",
      errors: [],
      attars: null,
      attar_data: null,
      show: false,
      color_product: false,
      color_price: "",
      rating: 5,
      review: "",
      comment: "",
      recaptchaVerified: false,
      modal_width: "width:35%",
      compair_modal: "width:35%",
      compair_image: "height:165px",
      baseUrl: "",
      window: {
        width: 0,
        height: 0,
      },
      options: {
        accessToken: null,
        bare: false,
        counter: false,
        copy: "last",
        description: null,
        direction: "horizontal",
        hashtags: null,
        image: null,
        lang: "ru",
        limit: 24,
        popupDirection: "bottom",
        popupPosition: "inner",
        size: "m",
        title: null,
        window: {
          width: 0,
          height: 0,
        },
        url: "http://estorejamuna.com" + "/product/" + this.$route.params.id,
        services: [
          "facebook",
          "gplus",
          "linkedin",
          "pinterest",
          "skype",
          "telegram",
          "tumblr",
          "twitter",
          "viber",
          "whatsapp",
        ],
      },

      sharing: {
        url: "http://estorejamuna.com" + "/product/" + this.$route.params.id,
        title: "",
        description: "",
      },
      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },
        {
          network: "skype",
          name: "Skype",
          icon: "fab fah fa-lg fa-skype",
          color: "#00aff0",
        },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
  mounted() {
    this.fetchItem();
    this.fetchImages();
    this.fetchProSpecefic();
    this.fetchFeatureImages();
    this.fetchMoreImages();
    this.fetchProFeatures();
    this.fetchProReviews();
  },
  computed: {
    currentImage() {
      this.baseUrl = process.env.baseUrl;
      return this.images[this.activeImage];
    },
    item() {
      return this.$store.getters.getProductDetails;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    ProSpecefic() {
      return this.$store.getters.getProSpecefic;
    },
    ProFeatures() {
      return this.$store.getters.getProFeatures;
    },
    compairProducts() {
      return this.$store.getters.getCompairProduct;
    },
    productReviews() {
      return this.$store.getters.getProductReviews;
    },
    handleResize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          this.itemShow = 2;
          return 2;
        } else if (this.window.width <= 800) {
          this.itemShow = 3;
          return 3;
        } else {
          this.itemShow = 4;
          return 4;
        }
      }
    },
    modalSize() {
      if (process.browser) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if (this.window.width <= 480) {
          return "width:90%";
        } else if (this.window.width > 480 && this.window.width <= 768) {
          return "width:90%";
        } else {
          return "width:30%";
        }
      }
    },
    show_window() {
      if (process.browser) {
        return true;
      }
    },
  },
  methods: {
    nextImage() {
      this.imageActive = false;
      var active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    // Go backwards on the images array
    // or go at the last image
    prevImage() {
      this.imageActive = false;
      var active = this.activeImage - 1;
      if (active < 0) {
        active = this.images.length - 1;
      }
      this.activateImage(active);
    },
    activateImage(imageIndex) {
      this.imageActive = false;
      this.activeImage = imageIndex;
    },
    fetchItem() {
      var self = this;
      axios.get("/api/products/" + this.$route.params.id).then((response) => {
        self.$store.commit("setProductDetails", response.data.products);
      });
    },
    fetchImages() {
      var self = this;
      axios
        .get("/api/product/images/" + this.$route.params.id)
        .then((response) => {
          this.images = response.data.data;
        });
    },
    fetchFeatureImages() {
      var self = this;
      axios
        .get("/api/product/images/" + this.$route.params.id + "/" + 2)
        .then((response) => {
          self.featureImages = response.data.data;
        });
    },
    fetchMoreImages() {
      var self = this;
      axios
        .get("/api/product/images/" + this.$route.params.id + "/" + 3)
        .then((response) => {
          self.moreImages = response.data.data;
        });
    },
    fetchProReviews() {
      var self = this;
      axios
        .get("/api/product-review/" + this.$route.params.id)
        .then((response) => {
          self.$store.commit("setProductReviews", response.data.reviews);
        });
    },
    emi_apply() {
      if (this.emi == false) {
        this.emi = true;
        alert(this.quentity);
      } else {
        this.emi = false;
        alert(this.quentity);
      }
    },
    addToWish(item) {
      if (this.loggedIn) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        };
        this.$dlg.mask(
          "Adding to Wishlist",
          axios
            .post(
              "/api/addToWishlist",
              {
                item: item,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
              },
              {
                headers: headers,
              }
            )
            .then((response) => {
              this.$store.commit("addToWish", response.data);
              setTimeout(() => {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  timer: 5000,
                  text: "Item Added To Wishlist",
                });
              }, 2000);
            })
            .catch((error) => {
              this.error = error.response.data.error;
              setTimeout(() => {
                Swal.fire({
                  icon: "error",
                  title: "Opps",
                  timer: 5000,
                  text: this.error,
                });
              }, 1200);
            }),

          {
            closeTime: 1,
          }
        );
      } else {
        Swal.fire({
          title: "Please Login First",
          icon: "info",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok!",
          showCancelButton: true,
          showCloseButton: true,
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              this.$router.push("/client/login");
            }, 1000);
          }
        });
      }
    },
    compairProduct(item) {
      this.$store.dispatch("addToCompair", item);
      var com_data = this.compairProducts.length;
      if (com_data == 1) {
        this.compair_modal = "width:35%";
        this.compair_image = "height:150px";
      } else if (com_data <= 2) {
        this.compair_modal = "width:80%";
        this.compair_image = "height:120px";
      } else if (com_data >= 4) {
        this.compair_modal = "width:90%";
        this.compair_image = "height:120px";
      } else if (com_data == 3) {
        this.compair_modal = "width:70%";
        this.compair_image = "height:120px";
      }
      this.isActive = true;
    },
    compair() {
      this.$modal.hide("dialog");

      this.isActive = true;
    },
    removeCompair(index) {
      this.$store.commit("compairRemove", index);
    },
    close: function () {
      this.isActive = false;
      this.catActive = false;
    },

    quentity_remove() {
      if (this.quentity > 1) {
        this.quentity = this.quentity - 1;
      }
    },
    quentity_add() {
      this.quentity++;
    },
    addToCard(item) {
      this.addingCart(item);
      this.catActive = true;
    },
    addingCart(item) {
      for (let index = 0; index < this.quentity; index++) {
        this.$store.dispatch("addToCart", item);
      }
    },
    checkout() {
      if (this.$store.getters.loggedIn) {
        this.$router.push("/checkout/delivery-details/");
      } else {
        this.$router.push("/checkout");
      }
    },
    byeNow(item) {
      if (item.pro_quantity > 0) {
        this.$store.dispatch("addToCart", item);

        this.byenow_checkout();
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps",
          timer: 5000,
          text: "This Item Are Stock Out",
        });
      }
    },
    byenow_checkout() {
      this.$dlg.mask("Redirect To CheckOut", function () {
      }, {
        closeTime: 1,
      }),
        setTimeout(() => {
          if (this.$store.getters.loggedIn == true) {
            this.$router.push("/checkout/delivery-details/");
          } else {
            this.$router.push("/checkout");
          }
        }, 2000);
    },
    colorImage(item, src) {
      this.color_product = true;
      this.color_price = src.color_price;
      this.imageNo = src.id;
      this.imageActive = true;
      this.color_image_view = (
        "/public/storage/" +
        item.id +
        "/" +
        src.color_image
      ).toString();
    },
    fetchProSpecefic() {
      var self = this;
      axios
        .get("/api/product-specifications/" + self.product_id)
        .then((response) => {
          self.$store.commit("setProSpecefic", response.data);
        });
    },
    fetchProFeatures() {
      var self = this;
      axios.get("/api/product-features/" + self.product_id).then((response) => {
        self.$store.commit("setProFeatures", response.data);
      });
    },
    productReview() {
      if (this.recaptchaVerified) {
        if (this.rating && this.review) {
          const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state.token,
          };

          this.$dlg.mask(
            "Review Posting!!!!",
            axios
              .post(
                "/api/product-review",
                {
                  product_id: this.product_id,
                  rating: this.rating,
                  review: this.review,
                  comment: this.comment,
                },
                {
                  headers: headers,
                }
              )
              .then((response) => {
                this.review = "";
                this.comment = "";
                this.recaptchaVerified = false;
                setTimeout(() => {
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    timer: 5000,
                    text: "Your Review Will be Published Shortly.",
                  });
                }, 1000);
              })
              .catch((error) => {
                this.errors = error.response.data.errors;
              }),
            {closeTime: 2}
          );
        }

        this.errors = [];
        if (!this.rating) {
          this.errors.push("Product Rating Required.");
        }
        if (!this.review) {
          this.errors.push("Product Review Required.");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps",
          timer: 5000,
          text: "Please tick recaptcha",
        });
      }
    },
    markRecaptchaAsVerified(response) {
      this.recaptchaVerified = true;
    },
    formatPrice(value) {
      return (
        new Intl.NumberFormat({
          style: "decimal",
          minimumFractionDigits: 2,
          maximumSignificantDigits: 3,
        }).format(Number(value).toFixed(2)) + ".00"
      );
    },
  },
};
</script>

<style scope>
.vueperslides__track {
  position: relative !important;
}

.pro_badge {
  width: 60px;
  height: 60px;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  line-height: 62px;
  right: 30%;
  top: 10%;
}

.imageActive {
  border: 1px solid red;
}

.gallery-wrap .img-big-wrap img {
  height: 450px;
  width: auto;
  display: inline-block;
  cursor: zoom-in;
}

.gallery-wrap .img-small-wrap .item-gallery {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  margin: 7px 2px;
  display: inline-block;
  overflow: hidden;
}

.gallery-wrap .img-small-wrap {
  text-align: center;
}

.gallery-wrap .img-small-wrap img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 4px;
  cursor: zoom-in;
}

.tabs a {
  font-weight: 600;
}

.product-view-area .color-image h2 {
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 600;
  padding-right: 10px;
}

.product-variation {
  display: inline-block;
  width: 100%;
  padding: 0;
}

.ratings {
  padding: 10px 0;
}

.share-box .title {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  float: none;
  margin-right: 12px;
  line-height: 26px;
}

.special-price .price {
  font-size: 20px;
  color: #e40514;
  font-weight: 600;
}

.old-price .price {
  font-size: 16px;
}

.hero .title a {
  text-decoration: underline;
}

@media screen and (max-width: 1024px) {
  .pro_badge {
    top: 10%;
  }
}

@media screen and (max-width: 480px) {
  .pro_badge {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-size: 10px !important;
    line-height: 62px;
    right: 36%;
    top: 32%;
  }
}

@media screen and (max-width: 800px) {
  .pro_badge {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-size: 10px !important;
    line-height: 62px;
    right: 30%;
    top: 32%;
  }

  .is-responsive {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    position: relative;
  }

  .is-responsive td:empty:before {
    content: " ";
  }

  .is-responsive td,
  .is-responsive th {
    margin: 0;
    vertical-align: top;
  }

  .is-responsive th {
    text-align: left;
  }

  .is-responsive thead {
    border-right: solid 2px #dbdbdb;
    display: block;
    float: left;
  }

  .is-responsive thead tr {
    display: block;
    padding: 0 10px 0 0;
  }

  .is-responsive thead tr th::before {
    content: " ";
  }

  .is-responsive thead td,
  .is-responsive thead th {
    border-width: 0 0 1px;
  }

  .is-responsive tbody {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
  }

  .is-responsive tbody tr {
    display: inline-block;
    vertical-align: top;
  }

  .is-responsive th {
    display: block;
    text-align: right;
  }

  .is-responsive td {
    display: block;
    min-height: 1.25em;
    text-align: left;
  }

  .is-responsive td:last-child,
  .is-responsive th:last-child {
    border-bottom-width: 0;
  }

  .is-responsive tr:last-child td:not(:last-child) {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
  }

  .is-responsive.is-bordered td,
  .is-responsive.is-bordered th {
    border-width: 1px;
  }

  .is-responsive.is-bordered tr td:last-child,
  .is-responsive.is-bordered tr th:last-child {
    border-bottom-width: 1px;
  }

  .is-responsive.is-bordered tr:last-child td,
  .is-responsive.is-bordered tr:last-child th {
    border-width: 1px;
  }
}

.modal-card {
  top: 0;
}

.modal {
  z-index: 10000000000;
}

.tab_container {
  width: 100%;
  margin: 0 auto;
  padding-top: 70px;
  position: relative;
}

.tab_container .tab-content {
  clear: both;
  padding-top: 10px;
  display: none;
}

.tab_container #tab1 {
  clear: both;
  padding-top: 10px;
  display: none;
}

.tab_container #tab2 {
  clear: both;
  padding-top: 10px;
  display: none;
}

.tab_container #tab3 {
  clear: both;
  padding-top: 10px;
  display: none;
}

.tab_container #tab4 {
  clear: both;
  padding-top: 10px;
  display: none;
}

.tab_container #tab5 {
  clear: both;
  padding-top: 10px;
  display: none;
}

.tab_lable {
  font-weight: 700;
  font-size: 18px;
  display: block;
  float: left;
  width: 20%;
  padding: 1.5em;
  color: #e40514;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background: #f0f0f0;
}

#tab1:checked ~ #content1,
#tab2:checked ~ #content2,
#tab3:checked ~ #content3,
#tab4:checked ~ #content4,
#tab5:checked ~ #content5 {
  display: block;
  padding: 20px;
  background: #fff;
  color: #343434;
  border-bottom: 2px solid #f0f0f0;
}

.tab_container .tab-content h3,
.tab_container .tab-content p {
  -webkit-animation: fadeInScale 0.7s ease-in-out;
  -moz-animation: fadeInScale 0.7s ease-in-out;
  animation: fadeInScale 0.7s ease-in-out;
}

.tab_container .tab-content h3 {
  text-align: center;
}

.tab_container [id^="tab"]:checked + label {
  background: #fff;
  box-shadow: inset 0 3px #0ce;
  border: 0.5px solid #add8e6;
}

.tab_container [id^="tab"]:checked + label .fa {
  color: #0ce;
}

ul#attr li {
  display: inline;
  padding: 5px;
}

.zoom img,
.zoom:after {
  display: block;
  height: fit-content;
}

@media screen and (max-width: 480px) {
  .tab_lable {
    font-weight: 300;
    font-size: 10px;
    display: block;
    float: left;
    width: 18%;
    padding: 1em;
  }
}

.card-carousel {
  user-select: none;
  position: relative;
}

.progressbar {
  display: block;
  width: 100%;
  height: 5px;
  position: absolute;
  background-color: rgba(221, 221, 221, 0.25);
  z-index: 1;
}

.progressbar > div {
  background-color: rgba(255, 255, 255, 0.52);
  height: 100%;
}

.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}

.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
}

.thumbnail-image > img {
  width: 100%;
  height: auto;
  transition: all 250ms;
}

.thumbnail-image.active > img,
.thumbnail-image:hover > img {
  opacity: 0.6;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);
}

.card-img {
  position: relative;
  margin-bottom: 15px;
}

.card-img > img {
  display: block;
  margin: 0 auto;
  height: 100%;
}

.actions {
  font-size: 1.5em;
  height: 40px;
  position: relative;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #585858;
}

.actions > span {
  cursor: pointer;
  transition: all 250ms;
  font-size: 45px;
}

.actions > span.prev {
  margin-left: 5px;
}

.actions > span.next {
  margin-right: 5px;
}

.actions > span:hover {
  color: #eee;
}

.zoom-on-hover {
  position: relative;
  overflow: hidden;
}

.zoom-on-hover .normal {
  width: 100%;
}

.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
}

.zoom-on-hover.zoomed .zoom {
  opacity: 1;
}

.zoom-on-hover.zoomed .normal {
  opacity: 0;
}

.availability.in-outstock span {
  color: #fff;
  background-color: #e40514;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 3px;
}

.product-view-area .product-name h1 {
  font-size: 24px;
}

iframe {
  max-height: unset;
}

.socialbtn {
  padding: 1em 2.1em 1.1em;
  border-radius: 3px;
  margin: 8px 8px 8px 8px;
  display: inline-block;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  font-family: sans-serif;
  font-weight: 800;
  font-size: 0.85em;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  -webkit-box-shadow: 0em -0.3rem 0em rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0em -0.3rem 0em rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0em -0.3rem 0em rgba(0, 0, 0, 0.1) inset;
  position: relative;
}

.socialbtn:hover,
.socialbtn:focus {
  opacity: 0.8;
}

.socialbtn:active {
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -ms-transform: scale(0.8);
  -o-transform: scale(0.8);
  transform: scale(0.8);
}

.socialbtn.block {
  display: block !important;
}

.socialbtn.circular {
  border-radius: 50em !important;
}
</style>
