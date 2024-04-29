<template>
  <div class="main">
            <!-- Breadcrumbs -->

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
                <strong  style="text-transform: capitalize;">{{$route.params.id.replace('-',' ')}}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumbs End -->
    <div v-html="cmsPage">


    </div>

</div>
    
</template>
<script>
import axios from "~/plugins/axios";
import Vue from "vue";
export default {
  asyncData(context) {
    // console.log(context)
    return context.$axios
      .get("/api/cmsPage/" + context.route.fullPath)
      .then(res => {
        return { fetchedData: res.data };
      });
  },
  head() {
    return {
      title:
        this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Jamuna Electronics',
      meta: [
        {
          hid: "description",
          name: "description",
          content:
          this.fetchedData.meta_description != null
          ? this.fetchedData.meta_description
          :'Jamuna Electronics'
        },
        {
          hid: "og:title",
          name: "og:title",
          content:
          this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Jamuna Electronics'
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "http://estorejamuna.com.com/public/images/logo.png"
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content:
            "http://estorejamuna.com.com/" +this.fetchedData.page_slug
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
           this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Jamuna Electronics'
        }
      ]
    };
  },
    data() {
        return {
            page:this.$route.fullPath,

        }
    },

    computed: {

        cmsPage(){
            return this.$store.getters.getCmsPage
        }
        
    },

    mounted() {
       this.loadPage(); 
    },
    methods: {
        loadPage(){
            axios.get('/api/cmsPage'+this.page).then(response=>{
               this.$store.commit('setCmsPage',response.data.details);
            })
        }
    },
    
}
</script>