export default {
      server: {
    host: "0.0.0.0",
    port:"3001"
  },
  head: {
    title: 'estorejamuna',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  script: [{
      src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js'
    },
    {
      src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
    },
    {
      src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js'
    }
  ],
  css: [
    "~assets/css/bulma.min.css", "~assets/css/bootstrap.min.css", "~assets/css/style.css"
  ],
  plugins: [
    '@/plugins/balm-ui',
        {
          src: "~/plugins/vue-select",
          mode: "client",
        }, {
          src: "~/plugins/localStorage.js",
          ssr: false,
        }, {
          src: "~/plugins/vue-js-modal",
          ssr: false,
        }, {
          src: "~/plugins/infiniteloading",
          ssr: false,
        }, {
          src: "@/plugins/vue-html2pdf",
          mode: "client",
        }, {
          src: "~/plugins/vue-cookie-law.js",
          ssr: false,
        }, {
          src: "~/plugins/nuxt-offline-alert.js",
          ssr: false,
        }, {
          src: "~/plugins/star-rating.js",
          ssr: false,
        },
  ],
  components: true,

   buildModules: [
     [
       "@nuxtjs/google-analytics",
       {
         id: "UA-164148508-1",
       },
     ],
     "@nuxtjs/moment",
     "@nuxtjs/pwa",
     '@nuxt/postcss8'
   ],

  modules: [
     [
       "nuxt-lazy-load",
       {images: true,
         videos: true,
         audios: true,
         iframes: true,
         native: false,
         polyfill: true,
         directiveOnly: true,
         // Default image must be in the static folder
         defaultImage: "/loading.gif",
         // To remove class set value to false
         loadingClass: "isLoading",
         loadedClass: "isLoaded",
         appendClass: "lazyLoad",

         observerConfig: {
           // See IntersectionObserver documentation
         },
       },
     ],
    [
      "nuxt-gmaps",
      {
        key: "AIzaSyAPj_Vqp4a327GenDZp9OcKi0mZ-3y6FQA",
      },
    ],
    "@nuxtjs/robots",
    "@nuxtjs/dotenv",
    "nuxt-sweetalert2",
    "vue-scrollto/nuxt",
    "nuxt-vuex-localstorage",
    "@nuxtjs/recaptcha",
    "@nuxtjs/sitemap",
    "@nuxtjs/toast",
    "@nuxtjs/axios",
    'vue-social-sharing/nuxt'

  ],
   recaptcha: {
       hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
       siteKey: "6LfXedAUAAAAAONxDRge4odUt3dmeY8XnT9tj51a", // Site key for requests
       version: 2, // Version
       size: "normal", // Size: 'compact', 'normal', 'invisible' (v2)
     },

     toast: {
       position: "top-center",
       duration: 3000,
     },

     axios: {
       baseURL: `https://erp.estorejamuna.com`,
       proxyHeaders: false,
       credentials: false,
     },

     robots: [{
         UserAgent: 'Googlebot',
         Disallow: ['/user', '/user/dashboard', '/user/order', '/user/my-cart', '/user/my-wishlist', '/user/my-review', '/user/my-profile'],
       },
       {
         UserAgent: '*',
         Disallow: ['/auth/login', '/auth/register', '/auth/logout', '/auth/register-confirm', '/auth/forgot-password'],


       },
     ],
     sitemap: {
       hostname: "https://www.estorejamuna.com",
       gzip: true,
       routes: [
         "/",
         "/checkout",
         "/shopping-cart",
         "/store-locator",
         "/dealer-register",
         "/about-us",
         "/contact-us",
         "/checkout",
         "category/air-conditioner",
         "category/fan-and-cables",
         "category/television",
         "category/freezer",
         "category/motor-cycle",
         "category/small-appliances",
         "category/microwave-oven",
         "category/blender",
         "category/dry-iron",
         "category/electric-kettle",
         "category/rice-cooker",
         "category/jucer",
         "category/steam-iron",
         "category/1-ton",
         "category/2-ton",
         "category/15-ton",
         "category/fan-classic",
         "category/fan-premium",
         "category/fan-super-delux",
         "category/fan-luxury",
         "category/vcm-fridge",
         "category/mirror-glass-fridge",
         "category/glass-fridge",
         "category/direct-cool",
         "category/201-liter-300-liter",
         "category/301-liter-above",
         "category/refrigarator",
         "category/non-frost-up-coming",
         "category/mirror-glass",
         "category/desh-glass",
         "category/glossy-fridge",
         "category/fan-super-delux-plus",
         "category/led-20",
         "category/led-24",
         "category/led-32",
         "category/led-42",
         "category/led-43",
         "category/led-50",
         "category/led-55",
         "category/led-22",
         "category/washing-machine",
         "/products/led-tv-20-inch-20d20000-5eaa7cebeb90b",
         "/products/led-tv-20-inch-jamuna-tv-20e20000-5eaa7cec02643",
         "/products/basic-led-tv-24-inch-24e200s-5eaa7cec1004b",
         "/products/basic-led-tv-24-inch-jamuna-24e6000-5eaa7cec1b5e4",
         "/products/basic-led-tv-24-inch-24mr01-5eaa7cec267ff",
         "/products/32-inch-smart-led-tv-32g5s-5eaa7cec314e6",
         "/products/32-inch-led-tv-32mh01-5eaa7cec3cdb1",
         "/products/32-inch-led-tv-32mt06-5eaa7cec471d2",
         "/products/smart-led-tv-32my01-5eaa7cec50e22",
         "/products/basic-led-tv-32-inch-32my01n-5eaa7cec5b7aa",
         "/products/smart-led-tv-32-inch-32my01s-5eaa7cec65b2a",
         "/products/42-inch-basic-led-tv-42e6000-5eaa7cec6fded",
         "/products/43-inch-smart-led-tv-43mg06-5eaa7cec7a106",
         "/products/55-inch-4k-smart-uhd-led-tv-55mg06-5eaa7cec84375",
         "/products/4k-uhd-smart-led-tv-55d6000-5eaa7cec8e6f9",
         "/products/jec-12qa-1ton-5eaa7cec98366",
         "/products/jec-12qc-1ton-5eaa7ceca2cbe",
         "/products/jec-12k-1ton-5eaa7cecacbd3",
         "/products/jedc-12bc-1ton-5eaa7cecb72ae",
         "/products/jec-12od-1ton-5eaa7cecc157b",
         "/products/jec-24k-2ton-5eaa7ceccb340",
         "/products/jec-24od-2ton-5eaa7cecd5bfd",
         "/products/jec-24qc-2ton-5eaa7cecdfee8",
         "/products/jedc-24bb-2ton-5eaa7cecea1d6",
         "/products/jedc-24bc-2ton-5eaa7ced002c6",
         "/products/jec-18k-15ton-5eaa7ced0a586",
         "/products/jedc-18bb-15ton-5eaa7ced148e8",
         "/products/jedc-18bc-15ton-5eaa7ced1e5bd",
         "/products/jec-18od-15ton-5eaa7ced28ee1",
         "/products/jec-18qc-15ton-5eaa7ced3315d",
         "/products/blender-ubc-02-5eaa7ced3d4af",
         "/products/blender-ubc-06-5eaa7ced470d7",
         "/products/blender-ubc-330-5eaa7ced56025",
         "/products/blender-ubc-415-5eaa7ced639a4",
         "/products/blender-ubl-357-5eaa7ced6e2eb",
         "/products/blender-ubl-366g-5eaa7ced7864f",
         "/products/blender-ubl-368-5eaa7ced82955",
         "/products/dry-iron-usi-043b-5eaa7ced8cca9",
         "/products/dry-iron-usi-2011-5eaa7ced96f37",
         "/products/dry-iron-usi-303-5eaa7ceda12a4",
         "/products/dry-iron-usi-036a-5eaa7cedab520",
         "/products/dry-iron-usi-032-5eaa7cedb5887",
         "/products/electric-kettle-uk-1760-5eaa7cedbfb77",
         "/products/electric-kettle-uk-256-5eaa7cedc9ddd",
         "/products/electric-kettle-uk-314-5eaa7cedd4190",
         "/products/electric-kettle-uk-323-5eaa7cedde472",
         "/products/electric-kettle-uk-191-5eaa7cede81eb",
         "/products/electric-kettle-uk-242-5eaa7cedf2aa5",
         "/products/juice-extractor-uje-426-5eaa7cee08b84",
         "/products/juice-extractor-uje-505-5eaa7cee12767",
         "/products/micro-oven-p70h20el-5eaa7cee1ca87",
         "/products/micro-oven-p90d23epiiik-23lw-5eaa7cee26c39",
         "/products/multi-function-cooker-kf-r160ss-5eaa7cee40c01",
         "/products/multi-function-cooker-kf-r360ss-5eaa7cee4aefe",
         "/products/rice-cooker-drc18s-qpdi-5eaa7cee5c2ff",
         "/products/rice-cooker-drc22s-qpdi-5eaa7cee6b8e2",
         "/products/rice-cooker-drc28s-qpdi-5eaa7cee75ba9",
         "/products/rice-cooker-kf-r-180-5eaa7cee7f808",
         "/products/rice-cooker-kf-r-220-5eaa7cee89c73",
         "/products/rice-cooker-rc18b-mx1-flower-body-5eaa7cee94697",
         "/products/rice-cooker-rc18b-mx1-orange-body-5eaa7cee9e8de",
         "/products/rice-cooker-rc22b-mx1-flower-body-5eaa7ceea8c8d",
         "/products/rice-cooker-rc22b-mx1-orange-body-5eaa7ceeb2f91",
         "/products/rice-cooker-rc28b-mx1-flower-body-5eaa7ceebd123",
         "/products/rice-cooker-rc28b-mx1-orange-body-5eaa7ceec75c6",
         "/products/steam-iron-usi-128b-5eaa7ceed121d",
         "/products/steam-iron-usi-195-5eaa7ceedbab3",
         "/products/steam-iron-usi-2022-5eaa7ceee5e7b",
         "/products/motor-cycle-victory-80cc-red-5eaa7ceef019b",
         "/products/motor-cycle-victory-100-cc-red-5eaa7cef05b8f",
         "/products/motor-cycle-victory-100cc-black-5eaa7cef0feb4",
         "/products/motor-cycle-fabio-125cc-choper-5eaa7cef1a1b6",
         "/products/motor-cycle-zues-150cc-black-5eaa7cef24b6c",
         "/products/motor-cycle-zues-150cc-red-5eaa7cef2ee7f",
         "/products/motor-cycle-zues-150cc-blue-5eaa7cef38ac0",
         "/products/motor-cycle-zues-150cc-yellow-5eaa7cef42dd7",
         "/products/motorcycle-evo-150cc-dark-blue-5eaa7cef4e6bf",
         "/products/motor-cycle-evo-150cc-orange-5eaa7cef57389",
         "/products/motor-cycle-fabio-125cc-gold-silver-5eaa7cef61d64",
         "/products/deep-fridge-je-220l-white-5eaa7cef6c06a",
         "/products/freezer-je-150l-white-5eaa7cef75d21",
         "/products/freezer-je-150l-yellow-5eaa7cef80604",
         "/products/freezer-je-180l-red-5eaa7cef8c9e1",
         "/products/freezer-je-180l-white-5eaa7cef96cdc",
         "/products/freezer-je-220l-light-blue-5eaa7cefa0969",
         "/products/freezer-je-220l-white-5eaa7cefab2f6",
         "/products/freezer-je-300l-red-5eaa7cefb55f0",
         "/products/je-180-l-deep-white-5eaa7cefc39db",
         "/products/jamuna-fan-classicsteel-white-56-5eaa7cefcdda7",
         "/products/jamuna-fan-premium-alluminium-white-56-5eaa7cefd8111",
         "/products/jamuna-fan-super-delux-off-white-56-alluminium-5eaa7cefe23d9",
         "/products/jamuna-fan-super-delux-plus-off-white-36-allu-5eaa7cefec711",
         "/products/jamuna-fan-super-delux-alluminium-white-56-5eaa7cf002769",
         "/products/jamuna-fan-classic-alluminium-coffee-56-5eaa7cf00c3b2",
         "/products/jamuna-fan-classic-alluminium-off-white-56-5eaa7cf01660e",
         "/products/jamuna-fan-classic-steel-coffee-56-5eaa7cf02090e",
         "/products/jamuna-fan-classic-steel-off-white-56-5eaa7cf02b3b1",
         "/products/jamuna-fan-luxury-alluminium-coffee-56-5eaa7cf03568d",
         "/products/jamuna-fan-luxury-alluminium-green-56-5eaa7cf03f2bb",
         "/products/jamuna-fan-luxury-alluminium-off-white-56-5eaa7cf0495f5",
         "/products/jamuna-fan-luxury-alluminium-white-56-5eaa7cf053fad",
         "/products/jamuna-fan-luxury-steel-coffee-56-5eaa7cf05e26f",
         "/products/jamuna-fan-luxury-steel-green-56-5eaa7cf06859a",
         "/products/jamuna-fan-luxury-steel-white-56-5eaa7cf0728af",
         "/products/jamuna-fan-premium-alluminium-off-white-56-5eaa7cf07cb71",
         "/products/jamuna-fan-super-delux-alluminium-green-48-5eaa7cf086ed2",
         "/products/jamuna-fan-super-delux-alluminium-green-56-5eaa7cf0911b3",
         "/products/jamuna-fan-super-delux-alluminium-off-white-48-5eaa7cf09b167",
         "/products/jamuna-fan-super-delux-alluminium-off-white-56-5eaa7cf0a57b9",
         "/products/jamuna-fan-super-delux-steel-green-56-5eaa7cf0afab1",
         "/products/jamuna-fan-super-delux-steel-off-white-56-5eaa7cf0b9cfb",
         "/products/jamuna-fan-super-delux-steel-white-56-5eaa7cf0c5051",
         "/products/je-148-glossy-shining-copper-golden-5eaa7cf0d03f6",
         "/products/je-148-glossy-shining-deep-blue-flower-5eaa7cf0da731",
         "/products/je-148-vcm-deep-blue-5eaa7cf0e52a3",
         "/products/je-148-vcm-grass-green-5eaa7cf0f0868",
         "/products/je-148-vcm-maroon-print-5eaa7cf107e5e",
         "/products/je-148-vcm-orange-5eaa7cf11321a",
         "/products/je-148-vcm-purple-5eaa7cf11e571",
         "/products/je-170l-vcm-deep-blue-5eaa7cf12961e",
         "/products/je-170l-glossy-shining-deep-blue-flower-5eaa7cf134921",
         "/products/je-170l-vcm-light-blue-5eaa7cf13ff75",
         "/products/je-170l-vcm-maroon-print-5eaa7cf14b226",
         "/products/je-170l-glass-pink-rose-5eaa7cf1565e9",
         "/products/je-170l-vcm-orange-5eaa7cf1618fd",
         "/products/je-193l-glass-orange-rose-5eaa7cf16cc13",
         "/products/je-193l-glass-white-stripe-5eaa7cf17788c",
         "/products/je-193l-vcm-deep-blue-5eaa7cf1832ca",
         "/products/je-193l-vcm-maroon-print-5eaa7cf18e2e6",
         "/products/je-193l-vcm-orange-5eaa7cf1999e4",
         "/products/je-200l-glossy-shining-deep-blue-flower-5eaa7cf1a4cc3",
         "/products/je-200l-vcm-deep-blue-5eaa7cf1ae8a7",
         "/products/je-200l-vcm-grass-green-5eaa7cf1b9c5b",
         "/products/je-200l-vcm-orange-5eaa7cf1c4f5f",
         "/products/je-200l-vcm-purple-5eaa7cf1d02f6",
         "/products/je-ues620300-glossy-shining-red-flower-5eaa7cf1dfe70",
         "/products/je-ues620300-glossy-shining-black-flower-5eaa7cf1eb2d9",
         "/products/je-ues620300-glossy-shining-deep-blue-flower-5eaa7cf2022d0",
         "/products/je-ues620300-glossy-shining-light-golden-5eaa7cf20d712",
         "/products/je-ues620300-vcm-deep-blue-5eaa7cf218946",
         "/products/je-ues620300-vcm-light-blue-5eaa7cf222a48",
         "/products/je-ues620300-vcm-orange-5eaa7cf22cf39",
         "/products/je-208l-cd-rs",
         "/products/je-208l-glass-maroon-stripe-5eaa7cf2456b6",
         "/products/je-208l-vcm-deep-blue-5eaa7cf25396d",
         "/products/je-208l-vcm-grass-green-5eaa7cf25de04",
         "/products/je-208l-vcm-maroon-print-5eaa7cf26c1eb",
         "/products/je-220l-cd-red-water-lily-5eaa7cf28081c",
         "/products/je-220l-glass-orange-rose-5eaa7cf28ab6b",
         "/products/je-220l-vcm-light-blue-5eaa7cf294df8",
         "/products/je-220l-vcm-maroon-print-5eaa7cf29e9d0",
         "/products/je-220l-vcm-orange-5eaa7cf2b95c8",
         "/products/je2-b8jf-cd-black-lily-leaf-5eaa7cf2c3d9b",
         "/products/je2-b8jf-cd-blooming-flower-5eaa7cf2cdce0",
         "/products/je2-b8jf-cd-blue-lily-leaf-5eaa7cf2d834d",
         "/products/je2-b8jf-glossy-shining-black-flower-5eaa7cf2e2695",
         "/products/je2-b8jf-glossy-shining-deep-blue-flower-5eaa7cf2ec77d",
         "/products/je2-b8jf-glossy-shining-light-golden-5eaa7cf302abb",
         "/products/je2-b8jf-glossy-shining-orange-flower-5eaa7cf30cdca",
         "/products/je2-b8jf-glossy-shining-red-flower-5eaa7cf317079",
         "/products/je-2b8jf-vcm-deep-blue-5eaa7cf32121f",
         "/products/je2-b8jf-vcm-light-blue-5eaa7cf32b669",
         "/products/je2-b8jf-vcm-maroon-print-5eaa7cf335987",
         "/products/je2-b8jf-vcm-orange-5eaa7cf33fc79",
         "/products/je2-b8jf-vcm-silver-5eaa7cf349ff0",
         "/products/je-232l-glass-off-white-stripe-5eaa7cf354293",
         "/products/je-232l-glass-red-lily-5eaa7cf35e59e",
         "/products/je-232l-vcm-light-blue-5eaa7cf3688ca",
         "/products/je-232l-vcm-orange-5eaa7cf373eb9",
         "/products/jr-desh52624800-cd-desh-52-5eaa7cf37e8af",
         "/products/jr-les624800-cd-red-wintersweet-5eaa7cf388ec0",
         "/products/jr-les624800-cd-black-lily-leaf-5eaa7cf3936c2",
         "/products/jr-les624800-cd-pink-butterfly-5eaa7cf39d9dc",
         "/products/jr-les624800-cd-purple-dream-5eaa7cf3a7c9d",
         "/products/jr-les624800-glossy-shining-gray-silver-flower-5eaa7cf3b1fc9",
         "/products/jr-les624800-vcm-orange-5eaa7cf3bbf02",
         "/products/jr-ues624900-cd-black-lily-leaf-5eaa7cf3c5f34",
         "/products/jr-ues624900-cd-red-winter-sweet-5eaa7cf3d08a4",
         "/products/jr-ues624900-glossy-shining-orange-flower-5eaa7cf3dabfc",
         "/products/jr-ues624900-vcm-black-jell-5eaa7cf3e4e87",
         "/products/jr-ues624900-vcm-purple-5eaa7cf3ef1ed",
         "/products/jr-ues626300-cd-black-lily-leaf-5eaa7cf40529c",
         "/products/jr-ues626300-cd-blue-lily-leaf-5eaa7cf40f582",
         "/products/jr-ues626300-cd-red-fusion-5eaa7cf4198a1",
         "/products/jr-ues626300-glossy-shining-black-flower-5eaa7cf423bd5",
         "/products/jr-ues626300-glossy-shining-blue-flower-5eaa7cf43c840",
         "/products/jr-ues626300-glossy-shining-orange-flower-5eaa7cf4476ab",
         "/products/jr-ues626300-vcm-orange-5eaa7cf453684",
         "/products/jr-les26600-cd-red-wintersweet-5eaa7cf461837",
         "/products/jr-les626600-cd-shining-purple-5eaa7cf46c1d2",
         "/products/jr-les626600-cd-white-wintersweet-5eaa7cf4763e5",
         "/products/jr-les626600-glossy-shining-black-flower-5eaa7cf480871",
         "/products/jr-les626600-glossy-shining-light-golden-5eaa7cf48ab70",
         "/products/jr-les626600-vcm-purple-5eaa7cf494e4b",
         "/products/je2-f8jf-vcm-deep-blue-5eaa7cf49f14d",
         "/products/je2-f8jf-vcm-maroon-print-5eaa7cf4a941a",
         "/products/je-2f8jf-vcm-orange-5eaa7cf4b37b3",
         "/products/je-270l-vcm-maroon-print-5eaa7cf4bdac6",
         "/products/jr-ues627800-cd-blue-lily-leaf-5eaa7cf4c970a",
         "/products/jr-ues627800-cd-shining-purple-5eaa7cf4d3a77",
         "/products/jr-ues627800-cd-white-winter-sweet-5eaa7cf4de368",
         "/products/jr-ues631800-cd-blue-winter-sweet-5eaa7cf4e877f",
         "/products/jr-ues631800-cd-green-lily-5eaa7cf4f2a46",
         "/products/jr-les632800-cd-black-lily-leaf-5eaa7cf508b3f",
         "/products/jr-les632800-cd-blue-winter-sweet-5eaa7cf512def",
         "/products/jr-les632800-cd-glittery-star-5eaa7cf51d169",
         "/products/jr-les632800-glossy-shining-red-flower-5eaa7cf526d7b",
         "/products/jr-desh71632900-cd-desh-71-5eaa7cf53174d",
         "/products/jr-ues632900-cd-black-lily-leaf-5eaa7cf53ba87",
         "/products/jr-ues632900-cd-blue-lily-leaf-5eaa7cf545d9c",
         "/products/jr-ues632900-cd-red-butterfly-5eaa7cf551b89",
         "/products/jr-ues632900-cd-rose-blossom-5eaa7cf55bcd7",
         "/products/jr-ues632900-glossy-shining-gray-silver-flower-5eaa7cf566719",
         "/products/jr-ues632900-glossy-shining-light-golden-5eaa7cf570a13",
         "/products/jr-ues632900-glossy-shining-red-flower-5eaa7cf57acf4",
         "/products/jr-ues633300-cd-black-lily-leaf-5eaa7cf584ffc",
         "/products/jr-ues633300-cd-blue-lily-leaf-5eaa7cf58ec04",
         "/products/jr-ues633300-cd-silver-lily-5eaa7cf5991ca",
         "/products/jr-les633300-glossy-shining-red-flower-5eaa7cf5a31c3",
         "/products/jr-ues633300-vcm-deep-blue-5eaa7cf5ad457",
         "/products/jr-desh52634800-cd-desh-52-5eaa7cf5b760d",
         "/products/jr-les634800-cd-black-rose-blossom-5eaa7cf5c221e",
         "/products/jr-les634800-cd-blue-lily-leaf-5eaa7cf5cc541",
         "/products/jr-les634800-cd-red-lily-leaf-5eaa7cf5d681d",
         "/products/jr-les634800-glossy-shining-blue-flower-5eaa7cf5e04f7",
         "/products/jr-les634800-glossy-shining-light-golden-5eaa7cf5eae11",
         "/products/jr-les634800-vcm-deep-blue-5eaa7cf601733",
         "/products/ct20-ues626300-glossy-shining-blue-flower-5ef86ada1fc25",
         "/products/ct20-ues632900-cd-black-lily-leaf-5ef86c35af096",
         "/products/ct20-ues633300-cd-black-lily-leaf",
         "/products/ct20-ues633300-cd-blue-lily-leaf-5ef86e5576009",
         "/products/ct20-les634800-glossy-shining-blue-flower-5ef8718fda62a",
         "/products/de7-5efbf1cc497f1",
         "/products/jr-ues622500-cd-black-leaf-5f0acdb7d79d7",
         "/products/je-gsd-150l-yellow-sun-flower-5f1272dcefe4a",
         "/products/je-gsd-220l-light-blue-sun-flower-5f1276144d234",
         "/products/je-gsd-150l-red-sun-flower-5f17ccf225b22",
         "/products/je-gsd-150l-white-sun-flower-5f17cd7ff20e8",
         "/products/je-gsd-180l-red-sun-flower-5f17ce4646e48",
         "/products/je-gsd-180l-white-sun-flower-5f17cec6c13ee",
         "/products/je-gsd-220l-white-sun-flower-5f17cf2444bef",
         "/products/je-les30800-cd-black-lily-leaf-5f17df92df593",
         "/products/je-208l-cd-blue-water-lily-5f1bc79d6b8fd",
         "/products/je-170l-cd-wine-water-lily-5f1bc8511e4f1",
         "/products/je-220l-cd-red-water-lily-5f1bc896508c7",
         "/products/je-ues630800-cd-gold-wave-5f1bdb4130a4b",
         "/products/je-230l-glossy-shining-deep-blue-flower-5f21236ee1c91",
         "/products/je-203l-cd-red-wave-5fbb320b75ab0",
         "/products/je-2f8-cd-blue-lily-leaf",
         "/products/je-2f8-cd-gold-wave-5fbb7e51ba2f8",
         "/products/je-2f8-cd-wine-water-lily-5fbb826cd37d6",
         "/products/jr-les634800-cd-majestic-padma-5fbb8403df4bf",
         "/products/je-250-vcm-maroon-print-5fc5f6fca968a",
         "/products/test-bkash-5fd5c5565c100",
         "/products/jr-les634800-cd-bule-majestic-padma-5fe08f7c67b2d",
         "/products/250l-vcm-grass-green-602e292d7af7b",
         "/products/234324-23434",
         "/products/je-ues624900-g-s-c-g",
         "/products/jr-ues627800-vcm-or",
         "/products/jr-ues631800-vcm-m-j",
         "/products/jr-ues631800-glossy-shining-cg",
         "/products/je-230l-vcm-p",
         "/products/je-250l-vcm-purple",
         "/products/je-250l-glossy-shining-dbf",
         "/products/je-170l-glossy-shining-gsf",
         "/products/je-2b8jf-glossy-shining-cg",
         "/products/je-2b8jf-glossy-shining-gsf",
         "/products/je-2f8jf-glossy-shining-cg",
         "/products/jr-les632800-glossy-shining-gsf",
         "/products/je-232l-vcm-ss",
         "/products/je-232l-glass-rd",
         "/products/je-232l-glass-rd",
         "/products/je-193l-cd-m-d",
         "/products/je-ues630800-cd-bw",
         "/products/24mp01",
         "/products/32-led-tv-32mj09",
         "/products/je-250l-vcm-maroon-jell",
         "/products/je-208l-glass-orange-rose",
         "/products/jr-ues620300-glossy-shining-copper-golden",
         "/products/je-2b8jf-vcm-orange",
         "/products/je-2b8jf-vcm-silver",
         "/products/je-148-glossy-shining-gray-silver-flower",
         "/products/je-203-glossy-shining-gray-silver-flower",
         "/products/je2-b8jf-glossy-shining-gray-silver-flower",
         "/products/je2-f8jf-glossy-shining-deep-blue-flower",
         "/products/jamuna-fan-super-delux-off-white-36-allu",
         "/products/xpb76-108s-5",
         "/products/xpb95-108s-12",
         "/products/xpb110-108s-5",
         "/products/xqb100-858-d-10d",
         "/products/xqb120-818-a-12a",
         "/products/jr-xx-ues632900-brown-cherry",
         "/products/jr-xx-les634800-cd-rainbow",
         "/products/jr-les626600-vcm-orange",
         "/products/jr-ues631800-cd-blue-wintersweet",
         "/products/je-193l-glossy-shining-gray-silver-flower",
         "/products/je-193l-vcm-light-golden",
         "/products/je-208l-vcm-copper-golden",
         "/products/je-232l-vcm-maroon-print",
         "/products/je-232l-glossy-shining-gray-silver-flower",
         "/products/jr-ues626300-vcm-maroon-print",
         "/products/jr-ues626300-glossy-shining-gray-silver-flower",
         "/products/jr-ues632800-vcm-maroon-print",
         "/products/jr-ues632800-glossy-shining-copper-golden",
         "/products/jr-ues632800-glossy-shining-light-golden",
         "/products/jr-ues632900-vcm-maroon-print",
         "/products/jr-ues632900-glossy-shining-copper-golden",
         "/products/jr-ues632900-glossy-shining-c-g",
         "/products/jr-ues634800-vcm-maroon-print",
         "/products/jr-ues634800-glossy-shining-gray-silver-flower",
         "/products/jr-ues634800-glossy-shining-copper-golden",
         "/products/je-300l-light-blue",
         "/products/je2-xx-b8jf-cd-green-lotus",
         "/products/jr-xx-les624800cd-blue-iris",
         "/products/jr-xx-ues626300-cd-peacock-dream",
         "/products/jr-xx-les626600-cd-violet-lotus",
         "/products/je-2f8jf-cd-violet-lotus",
         "/products/je-xx-les30800-cd-green-spark-1",
         "/products/je-xx-les30800-cd-black-diamond",
         "/products/jr-xx-les32800-cd-blue-iris",
         "/products/je2-f8jf-glossy-shining-gray-silver-flower",
         "/products/jr-ues632900-vcm-orange",
         "/products/je-203l-cd-blue-lily-leaf",
         "/products/je2-b8jf-cd-red-butterfly",
         "/products/jr-les632800-cd-red-majestic-dream",
         "/products/jr-les634800-cd-shining-galaxy",
         "/products/jr-ues626300-cd-purple-m",
         "/products/d90n30",
         "/products/jd90d25aslr111",
         "/products/juice-extractor-uje-453",
         "/products/p70h20ep-kq",
         "/products/jrc-180",
         "/products/jrc-220",
         "/products/jrc-220w",
         "/products/jrc-280",
         "/products/usi-036",
         "/products/usi-128",
         "/products/usi-304",
         "/products/usi-198",
         "/products/led32bas08",
         "/products/led24ba08",
         "/products/led32ba08",
         "/products/jek-862-red",
         "/products/jek-8302",
         "/products/jek-s05",
         "/products/jek-862-green",
         "/products/jek-862-blue",
         "/products/jek-862-pink",
         "/products/je-xx-220l-cd-black-stripe",
       ].map((route) => ({
         url: route,
         changefreq: "monthly",
         priority: 1,
         lastmodISO: new Date().toISOString().split("T")[0],
       })),
     },
  build: {
  }
}
