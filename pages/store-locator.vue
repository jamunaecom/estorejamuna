<template>
  <div class="main">
    <!-- Breadcrumbs -->

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
                <strong>Store Locator</strong>
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
        <form @submit.prevent="order_submit">
          <div class="row">
            <div class="col-sm-5 col-md-5 col-lg-5 col-12">
              <div class="box">
                <input
                  class="form-control"
                  v-model="search"
                  @input="searchOutlate()"
                  placeholder="Search Outlet"
                />
                <br />

                <div
                  class="media"
                  v-for="(plaza, plaza_index) in AllPlazas"
                  :key="plaza_index"
                >
                  <img
                    class="align-self-center mr-3"
                    width="30%"
                    :src="filePath + plaza.avatar"
                    alt="Image"
                    v-if="plaza.avatar != null"
                  />
                  <img
                    class="align-self-center mr-3"
                    width="30%"
                    :src="`${$axios.defaults.baseURL}/images/logo.png`"
                    alt="Image"
                    v-else
                  />
                  <div class="media-body">
                    <p class="mt-0">
                      <strong>{{ plaza.area_name }}</strong>
                    </p>
                    <p>
                      {{ plaza.address }}
                      <br />{{ plaza.upazila }},{{ plaza.district }} <br />
                      Phone: {{ plaza.phone }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-main col-sm-7 col-md-7 col-lg-7 col-12">
              <div class="page-content checkout-page">
                <h4 class="checkout-sep">Store Locator</h4>
                <div class="box-border">
                  <ul>
                    <li class="row">
                      <div class="col-sm-6">
                        <label class="required">Select District</label>
                        <v-select
                          :options="district"
                          placeholder="Select Your Location"
                          v-model="select_location"
                          @input="findArea"
                        ></v-select>
                      </div>
                      <div class="col-sm-6">
                        <label class="required">Select Police Station</label>
                        <v-select
                          :options="area"
                          v-model="select_area"
                          placeholder="Select Your Police Station"
                          @input="show_details"
                        ></v-select>
                      </div>
                      <div class="col-sm-12 margin-bottom-20">
                        <label class="required">Select Nearest Shop</label>
                        <v-select
                          :options="outlates"
                          v-model="outlate"
                          placeholder="Select Your Outlet"
                          @input="show_outlet"
                        ></v-select>
                      </div>
                    </li>
                    <li>
                      <!-- <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="7">
     <gmap-marker
       v-for="(item, index) in getLocation"
       :key="index"
       :position="item.position"
       @click="center = item.position"
     />
   </gmap-map> -->

                      <GMap
                        ref="gMap"
                        :cluster="{ options: { styles: clusterStyle } }"
                        :center="{ lat: center_lat, lng: center_lng }"
                        :options="{
                          fullscreenControl: false,
                          styles: mapStyle,
                        }"
                        :zoom="7"
                      >
                        <GMapMarker
                          v-for="(location, my_index) in getLocation"
                          :key="my_index"
                          :position="{ lat: location.lat, lng: location.lng }"
                          :options="{ icon: pins.selected }"
                          @click="currentLocation = location"
                        >
                          <GMapInfoWindow>
                            <b>{{ location.name }}</b>
                            <br />
                            <br />
                            <code>
                              lat: {{ location.lat }}, lng: {{ location.lng }}
                            </code>
                          </GMapInfoWindow>
                        </GMapMarker>
                      </GMap>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <div class="margin-bottom-40"></div>
    <!-- Main Container End -->
  </div>
</template>
<script>
import Vue from "vue";
import axios from "~/plugins/axios";

export default {
  asyncData(context) {
    return context.$axios.get("/api/plaza/locations").then((res) => {
      return {
        fetchedData: res.data,
      };
    });
  },
  head() {
    return {
      title: "Outlets | Jamuna Electronics",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Jamuna  Outlets. Jamuna Group Outlets. Jamuna Plaza",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "Jamuna Group, Jamuna Outlets, Jamuna Plaza",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Outlets | Jamuna Electronics",
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
          content: "https://estorejamuna.com/store-locator",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Outlets | Jamuna Electronics.",
        },
      ],
    };
  },
  data() {
    return {
          filePath:'https://erp.estorejamuna.com',
      district: [],
      select_area: "",
      area: [],
      select_location: "",
      outlates: [],
      outlate: "",
      center: { lat: 23.8130038, lng: 90.4199967 },
      mapTypeId: "terrain",
      markers: [],
      places: [],
      search: "",
      currentLocation: {},
      center_lat: 23.8130038,
      center_lng: 90.4199967,
      pins: {
        selected: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        notSelected: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      },
      mapStyle: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff",
            },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#3e606f",
            },
            {
              weight: 2,
            },
            {
              gamma: 0.84,
            },
          ],
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              weight: 0.6,
            },
            {
              color: "#313536",
            },
          ],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#44a688",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c",
            },
          ],
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#f5e4e4",
            },
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "poi.attraction",
          elementType: "labels",
          stylers: [
            {
              visibility: "on",
            },
            {
              lightness: "14",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c",
            },
            {
              visibility: "simplified",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#067372",
            },
            {
              lightness: "-20",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#357374",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#004757",
            },
          ],
        },
      ],
      clusterStyle: [
        {
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          width: 56,
          height: 56,
          textColor: "#fff",
        },
      ],
    };
  },
  mounted() {
    this.plazas();
    this.plazaLocation();
    this.city();
    this.geolocate();
  },
  computed: {
    AllPlazas() {
      return this.$store.getters.getPlaza;
    },
    getLocation() {
      return this.$store.getters.getLocation;
    },
  },
  methods: {
    plazas() {
      axios.get("/api/plazas").then((response) => {
        this.$store.commit("setPlazas", response.data.data);
      });
    },
    plazaLocation() {
      axios.get("/api/plaza/locations").then((response) => {
        this.$store.commit("setLocation", response.data.data);
      });
    },
    searchOutlate() {
      if (this.search.length >= 3) {
        axios.get("/api/find-outlate/" + this.search).then((response) => {
          this.$store.commit("setPlazas", response.data);
        });
      } else if (this.search.length == 0) {
        axios.get("/api/plazas").then((response) => {
          this.$store.commit("setPlazas", response.data.data);
        });
      }
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    city() {
      var self = this;
      axios.get("/api/cities").then((response) => {
        self.district = response.data;
      });
    },
    findArea() {
      var self = this;

      axios.get("/api/area/" + this.select_location).then((response) => {
        self.area = response.data.upozila;
        this.$store.commit("setPlazas", response.data.outlets);
      });

      setTimeout(() => {
        this.center = {
          lat: parseFloat(this.AllPlazas[0].latitude),
          lng: parseFloat(this.AllPlazas[0].longitude),
        };

        this.$refs.gMap.map.setCenter(this.center);
      }, 1000);
    },
    show_outlet() {
      axios
        .post("/api/search-outlate", {
          address: this.outlate,
        })
        .then((response) => {
          setTimeout(() => {
            this.center = {
              lat: parseFloat(this.AllPlazas[0].latitude),
              lng: parseFloat(this.AllPlazas[0].longitude),
            };
            this.$refs.gMap.map.setCenter(this.center);
          }, 1000);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    show_details() {
      var self = this;
      axios
        .post("/api/location-find", {
          district: self.select_location,
          upozila: self.select_area,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
        })
        .then((response) => {
          this.$dlg.mask("Search Nearest Outlets", function () {}, {
            closeTime: 2,
          }),
            (self.outlates = response.data.outlets);
          this.$store.commit("setPlazas", response.data.plazas);

          setTimeout(() => {
            this.center = {
              lat: parseFloat(this.AllPlazas[0].latitude),
              lng: parseFloat(this.AllPlazas[0].longitude),
            };

            this.$refs.gMap.map.setCenter(this.center);
          }, 1000);
        });
    },
  },
};
</script>
<style scoped>
.vs__dropdown-menu {
  position: relative;
}
.box {
  max-height: 590px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.vue-map-container {
  height: 450px;
  max-width: 992px;
  width: 100%;
}
</style>
