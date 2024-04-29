import Vue from 'vue';
import Vuex from 'vuex';
import axios from "~/plugins/axios";
import Cookies from 'js-cookie';
Vue.use(Vuex);

export const state = () => ({
        token: null,
        current_user:[],
        customer:[],
        categories:[],
        catInfo:[],
        products: [],
        sliders: [],
        catSliders: [],
        catSlidersTwo: [],
        catSlidersThree: [],
        Relatedsliders: [],
        ProSpecefic:[],
        ProductReviews:[],
        ProductDetails:[],
        cart: [],
        compair:  [],
        wishlist:[],
        cartCount: 0,
        totallPrice: 0,
    weight: 0,
    registerModal: true,
    ProFeatures: [],
    catProducts: [],
    searchProducts: [],
    catAttributes: [],
    coupon_amount: [],
    phone: '',
    cartTotal: '',
    homeSlider: [],
    BottomBanner: [],
    dealer_banner: '',
    reviews: [],
    CatAttr: [],
    dashboardData: [],
    CustomerOrders: [],
    OrderDetails: [],
    Discount: 0,
    cmsPage: '',
    HorizentalMenu: '',
    Footer: '',
    windowWidth: '',
    shipment:'',
    siteSetting:'',
    plazas:[],
    plazaLocation:[],

})

export const getters = {
    getwindowSize(state){
        if (process.browser) {
            state.windowWidth = window.innerWidth;
            if (state.windowWidth <= 480) {
                return 1;
            } else if (state.windowWidth <= 800) {
                return 3;
            } else {
                return 4;
            }
        }
    },
    token: state => state.token,
    loggedIn(state) {
        return state.token != null
    },
    getSiteSettings(state){
        return state.siteSetting
    },
    getUserPhone(state) {
        return state.phone
    },
    getUser(state) {
        return state.current_user
    },
    getCustomer(state) {
        return state.customer
    },
    getCustomerOrders(state) {
        return state.CustomerOrders
    },
    getOrderDetails(state) {
        return state.OrderDetails
    },
    getDiscount(state) {
        return state.Discount
    },
    getPlaza(state) {
        return state.plazas
    },
    getLocation(state) {
        return state.plazaLocation
    },
    getCompairProduct(state) {
        return state.compair
    },
    getCategories(state) {
        return state.categories
    },
    getCatInfo(state) {
        return state.catInfo
    },
    getregisterModal(state) {
        return state.registerModal
    },
    getInventory(state) {
        return state.products
    },
    getSlider(state) {
        return state.sliders
    },
     get_dealer_banner(state) {
        return state.dealer_banner
    },
    getWishlist(state) {
        return state.wishlist
    },
    getReviews(state) {
        return state.reviews
    },
    getcatSliders(state) {
        return state.catSliders
    },
    getcatSlidersTwo(state) {
        return state.catSlidersTwo
    },
    getcatSlidersThree(state) {
        return state.catSlidersThree
    },
    getRelatedsliders(state) {
        return state.Relatedsliders
    },
    getCart(state) {
        return Cookies.get('cart')
    },
    getWeight(state) {
        return state.weight
    },
    getTotal(state) {
        return state.totallPrice
    },
    getProSpecefic(state) {
        return state.ProSpecefic
    },
    getProFeatures(state) {
        return state.ProFeatures
    },
    getProductReviews(state) {
        return state.ProductReviews
    },
    getProductDetails(state) {
        return state.ProductDetails
    },
    getcatProducts(state) {
        return state.catProducts
    },
    getsearchProducts(state) {
        return state.searchProducts
    },
    getcatAttributes(state) {
        return state.catAttributes
    },
    gethomeSlider(state) {
        return state.homeSlider
    },
    getBottomBanner(state) {
        return state.BottomBanner
    },
    getCustomerData(state) {
        return state.dashboardData
    },
    getCatAttr(state) {
        return state.CatAttr
    },
    getCmsPage(state) {
        return state.cmsPage
    },
    getHorizentalMenu(state) {
        return state.HorizentalMenu
    },
    getFooter(state) {
        return state.Footer
    },
    getShipment(state){
        return state.Shipment
    }

    }

export const mutations = {
    setSiteSettings(state,payload){
        state.siteSetting=payload
    },
    windowSize(state,payload){
        if (process.browser) {
            state.windowWidth = window.innerWidth;
        }
    },
    retrieveToken(state, token) {
        state.token = token
    },
    retrieveUser(state, payload) {
        state.current_user = payload
    },
    destroyToken(state) {
        state.token = null
    },
    LogoutUser(state) {
        state.isLoggedIn = false;
        state.token = Cookies.remove('access_token'),
            state.current_user = ''
    },
    setCustomerInfo(state, payload) {
        state.customer = payload
    },
    setPlazas(state, payload) {
        state.plazas = payload
    },
    setLocation(state, payload) {
        state.plazaLocation = payload
        //   var location = [];
        // for(var i =0; i < payload.length;i++){
        //   location.push({ position: payload[i] });
        // }
        // state.plazaLocation = location
        // console.log(location)
    //
    //     payload.forEach(marker => {
    //       console.log(marker)
    //   state.plazaLocation.push({ position: marker });
    // });
    },
    setCustomerOrders(state, payload) {
        state.CustomerOrders = payload
    },
    setOrderDetails(state, payload) {
        state.OrderDetails = payload
    },
    setDiscount(state, payload) {
        state.Discount = payload
    },
    user_phone(state, payload) {
        state.phone = payload;
    },
    setWishlist(state, payload) {
        state.wishlist = payload
    },
    setCategories(state, payload) {
        state.categories = payload
    },
    setCatInfo(state, payload) {
        state.catInfo = payload
    },
    shortByProduct(state, payload) {
        if (state.catProducts.length > payload){
        state.catProducts.splice(0, payload);
        }
    },
    registerModal(state, payload) {
        state.registerModal = payload;
    },
    setInventory(state, payload) {
        state.products = payload
    },
    setCustomerData(state, payload) {
        state.dashboardData = payload
    },
    setSlider(state, payload) {
        state.sliders = payload
    },
    setcatSlidertwo(state, payload) {
        state.catSlidersTwo = payload
    },
    setcatSliderthree(state, payload) {
        state.catSlidersThree = payload
    },
    setcatSlider(state, payload) {
        state.catSliders = payload
    },
    set_dealer_banner(state, payload) {
        state.dealer_banner = payload
    },
    setProductDetails(state,payload){
        state.ProductDetails = payload
    },
    setCatAttr(state, payload) {

        if (state.CatAttr.indexOf(payload) === -1) {
            state.CatAttr.push(payload);
        } else {
            var index = state.CatAttr.indexOf(payload);
            if (index > -1) {
                state.CatAttr.splice(index, 1);
            }
        }

    },
    setRelatedsliders(state, payload) {
        state.Relatedsliders = payload
    },
    setProSpecefic(state, payload) {
        state.ProSpecefic = payload
    },
    setProFeatures(state, payload) {
        state.ProFeatures = payload
    },
    setcatProducts(state, payload) {
        state.catProducts = payload
    },
    setReviews(state, payload) {
        state.reviews = payload
    },
    setsearchProducts(state, payload) {
        state.searchProducts = payload
    },
    setProductReviews(state, payload) {
        state.ProductReviews = payload
    },
    setcatAttributes(state, payload) {
        state.catAttributes = '';
        state.catAttributes = payload
    },
    sethomeSlider(state, payload) {
        state.homeSlider = payload
    },
    setBottomBanner(state, payload) {
        state.BottomBanner = payload
    },
    setShipment(state,payload){
        state.Shipment = payload
    },
    addToCart(state, payload) {
        var total = 0;
        var weight = 0;

        let found = state.cart.find(cart => cart.id == payload.id);

        if (found) {
            found.quantity++;
            found.totalPrice = found.quantity * found.price;
        } else {
            state.cart.push(payload);

            Vue.set(payload, 'quantity', 1);
            Vue.set(payload, 'totalPrice', payload.discount_price);
        }

        for (var i = 0; i < state.cart.length; i++) {
            total = total + (state.cart[i].quantity * state.cart[i].discount_price)
            weight = weight + (state.cart[i].quantity * state.cart[i].weight)
        }
        state.cartTotal = total;
        state.weight = weight;
        state.cartCount++;
        this.commit('saveCart');


    },
    addToWish(state, payload) {
        let found = state.wishlist.find(wishlist => wishlist.id == payload.id);

        if (found) {

        } else {
            state.wishlist.push(payload);
        }

    },
    addToCompair(state, payload) {
        if (state.compair != null) {
          let found = state.compair.find(compair => compair.id == payload.id);

          if (found) {

          } else {
            state.compair.push(payload);
          }
        } else {

          state.compair.push(payload);
        }
        window.localStorage.setItem('compair', JSON.stringify(state.compair));
      },
    itemRemove(state, payload) {

        for (var i = 0; i < state.cart.length; i++) {
            if (i == payload) {
                let product = state.cart[i];
                state.cartCount -= product.quantity;
                state.cart.splice(i, 1);
            }
        }
        this.commit('saveCart');

    },
    compairRemove(state, payload) {
        for (var i = 0; i < state.compair.length; i++) {
            if (i == payload) {
                state.compair.splice(i, 1);
            }
        }
        window.localStorage.setItem('compair', JSON.stringify(state.compair));
    },
    itemDecrement(state, payload) {
        let found = state.cart.find(cart => cart.id == payload.id);

        if (found) {
            if (found.quantity > 1) {
                found.quantity--;
                found.totalPrice = found.quantity * found.price;
            }
        }
        if (state.cartCount > 1) {
            state.cartCount--;
            // this.commit('saveCart');
        }
        if (state.cartCount <= 0) {
            this.$router.push('/')
        }
    },
    clearcart(state) {
        state.cart = []
        state.cartCount = 0

    },
    setTotall(state, payload) {
        state.totallPrice = payload
    },

    saveCart(state) {

        Cookies.set('cartCount', state.cartCount)
        Cookies.set('cartTotal', state.cartTotal)
        Cookies.set('cart', JSON.stringify(state.cart))
    },
    couponApply(state, payload) {

        state.coupon_amount = payload;
    },
    setCmsPage(state, payload) {

        state.cmsPage = payload;
    },
    setHorizentalMenu(state, payload) {

        state.HorizentalMenu = payload;
    },
    setFooter(state, payload) {

        state.Footer = payload;
    },
    SHORT_BY(context,payload){
        let products = context.catProducts;
        context.catProducts='';
        if (payload == "Name") {
            products.sort(function (a, b) {
                if (a.pro_name < b.pro_name) return -1;
                if (a.pro_name > b.pro_name) return 1;
                return 0;
            });
            context.catProducts = products;
        } else if (payload == "Position") {
            products.sort(function (a, b) {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            });
            context.catProducts = products;
        } else {
            products.sort(
                function (a, b) {
                    if (payload == "Price ASC") {
                        return a.discount_price == b.discount_price
                            ? 0
                            : a.discount_price > b.discount_price
                                ? 1
                                : -1;
                    }

                    if (payload == "Price DESC") {
                        return a.discount_price == b.discount_price
                            ? 0
                            : a.discount_price < b.discount_price
                                ? 1
                                : -1;
                    }
                }.bind(products)
            );
            context.catProducts = products
        }
    },
    SHORT_BY_SEARCH(context, payload) {
        let products = context.searchProducts;
        context.searchProducts = '';
        if (payload == "Name") {
            products.sort(function (a, b) {
                if (a.pro_name < b.pro_name) return -1;
                if (a.pro_name > b.pro_name) return 1;
                return 0;
            });
            context.searchProducts = products;
        } else if (payload == "Position") {
            products.sort(function (a, b) {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
                return 0;
            });
            context.searchProducts = products;
        } else {
            products.sort(
                function (a, b) {
                    if (payload == "Price ASC") {
                        return a.discount_price == b.discount_price
                            ? 0
                            : a.discount_price > b.discount_price
                                ? 1
                                : -1;
                    }

                    if (payload == "Price DESC") {
                        return a.discount_price == b.discount_price
                            ? 0
                            : a.discount_price < b.discount_price
                                ? 1
                                : -1;
                    }
                }.bind(products)
            );
            context.searchProducts = products
        }
    }
    }

// actions
export const actions = {
    addToCart(context, payload) {
        context.commit('addToCart', payload)
    },
    addToWish(context, payload) {
        context.commit('addToWish', payload)
    },
    addToCompair(context, payload) {
        context.commit('addToCompair', payload)
    },
    retrieveName(state,token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.state.token

        return new Promise((resolve, reject) => {
            axios.get('/api/user')
                .then(response => {
                    state.current_user = response.data.data
                    const cunt_user = Object.keys(state.current_user).map(i => state.current_user[i])
                    localStorage.setItem('current_user', cunt_user);
                    // resolve(response)
                    // return response;
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    destroyToken(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

        if (context.getters.loggedIn) {
            return new Promise((resolve, reject) => {
                axios.post('/api/logout')
                    .then(response => {
                        Cookies.remove('access_token')

                        context.commit('destroyToken')
                        resolve(response)
                        // console.log(response);
                        // context.commit('addTodo', response.data)
                    })
                    .catch(error => {
                        Cookies.remove('access_token')
                        context.commit('destroyToken')
                        reject(error)
                    })
                localStorage.removeItem('current_user')
            })
        }
    },
    retrieveToken(context, credentials) {

        return new Promise((resolve, reject) => {
            axios.post('/api/client-login', {
                email: credentials.username,
                password: credentials.password,
            })
                .then(response => {
                    const token = response.data.token
                    Cookies.set('access_token', token)
                    context.commit('retrieveToken', token)
                    this.dispatch('retrieveName',{
                        token:token
                    });
                    resolve(response)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })


        })
    },
   };
