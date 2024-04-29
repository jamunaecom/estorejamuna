<template>
  <footer>
    <div v-html="footer"></div>
    <div class="container">
      <div class="row mb-4">
        <div class="col-sm-4 col-12">
          <h3>Trusted Payments</h3>
          <div class="payment">
            <ul>
              <li><img title="Visa" alt="Visa" src="/payment/visa.png" /></li>
              <li>
                <img
                  title="Mastercard"
                  alt="Mastercard"
                  src="/payment/mastercard.png"
                />
              </li>
              <li>
                <img
                  title="American Expres"
                  alt="American Expres"
                  src="/payment/american-express.png"
                />
              </li>
              <li><img title="DBBL" alt="DBBL" src="/payment/dbbl.jpg" /></li>
              <li>
                <img title="Rocket" alt="Rocket" src="/payment/dutch.png" />
              </li>
              <li>
                <img
                  title="Sure Cash"
                  alt="Sure Cash"
                  src="/payment/surecash.png"
                />
              </li>
              <li>
                <img title="Bkash" alt="Bkash" src="/payment/bkash.jpg" />
              </li>
              <li><img title="Upay" alt="Upay" src="/payment/upay.png" /></li>
              <li>
                <img
                  title="City Bank"
                  alt="City Bank"
                  src="/payment/city-bank.jpg"
                />
              </li>
              <li>
                <img title="MCash" alt="MCash" src="/payment/m-cash.jpg" />
              </li>
            </ul>
          </div>
        </div>

        <div class="col-sm-4 col-12">
          <h3>Visit Us On Social Website</h3>
          <div class="social">
            <ul class="inline-mode">
              <li class="social-network fb">
                <a title="Connect us on Facebook" target="_blank" href="https://www.facebook.com/jamunaelectronic"
                  ><i class="fab fa-facebook-square"
                /></a>
              </li>
              <li class="social-network instagram">
                <a title="Connect us on Twitter" target="_blank" href="https://www.instagram.com/jamunaelectronicsbd/"
                  ><i class="fab fa-instagram"
                /></a>
              </li>
              <li class="social-network youtube">
                <a title="Visit Our Youtube Channel" target="_blank" href="https://www.youtube.com/c/JamunaElectronicsAutomobilesLtd"
                  ><i class="fab fa-youtube"
                /></a>
              </li>
              <li class="social-network linkedin">
                <a
                  title="Connect us on linkedin"
                  target="_blank"
                  href=" https://www.linkedin.com/company/jamuna-electronics-automobiles-ltd/"
                  ><i class="fab fa-linkedin-in"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-4 col-12">
          <div>
            <ul style="margin: 0px">
              <li style="display: inline">
                <a
                  title="Download App on Play Store"
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.jamuna.eStoreJamuna&hl=en"
                >
                  <img
                    title="app studio"
                    alt="app studio"
                    src="/images/google.png"
                    class="socialimage"
                  />
                </a>
              </li>
              <li style="display: inline">
                <a
                  title="Download App on App Store"
                  target="_blank"
                  href="https://apps.apple.com/us/app/estore-jamuna/id1561573812"
                >
                  <img
                    title="app studio"
                    alt="app studio"
                    src="/images/apple.png"
                    class="socialimage"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        v-html="footer_short_desc"
      >
        <span v-if="readMore"></span>
        <span v-else>...</span>
      </div>

      <a class="readmore" @click="readMore = true" v-if="!readMore">
        <span>Read More</span>
      </a>

      <div
        v-show="readMore"
        v-html="footer_long_desc"
      ></div>
      <a class="readmore" @click="readMore = false" v-if="readMore">
        <span>Read Less</span>
      </a>
    </div>
    <div class="footer-coppyright">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 coppyright">
            Copyright © {{ new Date().getFullYear() }}
            <a href="#"> Jamuna Electronics</a>. All Rights Reserved. Developed
            by
            <a
              title="Web &amp; Software Development Company"
              target="_blank"
              href="https://www.nanoitworld.com/"
              >Nano IT World</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import axios from "~/plugins/axios";
export default {
  data() {
    return {
      footer: "",
      footer_short_desc: '',
      footer_long_desc: '',
      readMore: false,
    };
  },
  mounted() {
    this.footerDesign();
    this.additionalInfo();
  },
  methods: {
    footerDesign() {
      axios.get("/api/cmsPage/footer").then((response) => {
        this.footer = response.data.details;
      });
    },

    additionalInfo() {
      axios.get("/api/additional-settings").then((response) => {
        this.footer_short_desc = response.data.data.footer_short_desc;
        this.footer_long_desc = response.data.data.footer_long_desc;
      });
    },
  },
};
</script>
<style scoped>
ul > li {
  display: inline-block;
}

@media (min-width: 601px) and (max-width: 992px) {
  .app {
    width: 110px !important;
  }
}

@media only screen and (max-width: 600px) {
  footer h3 {
    font-size: 12px !important;
    font-weight: 600;
  }
  .app {
    width: 120px !important;
  }
  .socialimage {
    width: 48% !important;
  }
}
.social ul.inline-mode li a {
  border: 0px solid #666;
  color: #fff;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  width: 35px;
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  padding: 1px 5px;
}
.social .youtube a {
  background: #e40515;
}

.copyright a {
  color: #e40515 !important;
}

#christmas_promotion_boxes {
  width: 480px;
  margin: 0 auto 0 auto;
  text-align: left;
}
#christmas_promotion_boxes div {
  display: inline-block;
}
.readmore {
  color: #e40515;
}
</style>