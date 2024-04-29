<template>
  <div class="main">
    <div v-html="cmsPage">


    </div>

</div>
    
</template>
<script>
import axios from "~/plugins/axios";
import Vue from "vue";
export default {
    async asyncData (context) {
    let { data } = await axios.get(`/api/cmsPage/`+context.route.name)


              context.store.commit('setCmsPage',data.details);

    return { fetchedData: data.details } // Console: property post is not defined

  },
   head() {
    return {
      title:this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Media Center | Jamuna Electronics',
      meta: [
        {
          hid: "description",
          name: "description",
          content:this.fetchedData.meta_description != null
          ? this.fetchedData.meta_description
          :'Jamuna  Media Center. Jamuna Group Media Center.'
        },
        {
          hid: "keywords",
          name: "keywords",
          content:'Jamuna Group, Jamuna Dealer, Jamuna Plaza'
        },
        {
          hid: "og:title",
          name: "og:title",
          content:this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Media Center | Jamuna Electronics'
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "https://erp.estorejamuna.com/images/logo.png"
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content:
            "https://estorejamuna.com/media-center"
        },
        {
          hid: "og:description",
          name: "og:description",
          content:this.fetchedData.meta_description != null
          ? this.fetchedData.meta_description
          :'Media Center | Jamuna Electronics.'
        }
      ]
    };
  },

    computed: {

        cmsPage(){
            return this.$store.getters.getCmsPage
        }
        
    },
    
}
</script>