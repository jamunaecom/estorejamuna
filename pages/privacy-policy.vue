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

    return { fetchedData: data } // Console: property post is not defined

  },
   head() {
    return {
      title:this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Privacy Policy | Jamuna Electronics',
      meta: [
        {
          hid: "description",
          name: "description",
          content:this.fetchedData.meta_description != null
          ? this.fetchedData.meta_description
          :'Jamuna Privacy Policy. Jamuna Group Privacy Policy.'
        },
        {
          hid: "keywords",
          name: "keywords",
          content:'Jamuna Group, Jamuna Privacy Policy'
        },
        {
          hid: "og:title",
          name: "og:title",
          content:this.fetchedData.meta_title != null
          ? this.fetchedData.meta_title
          :'Privacy Policy | Jamuna Electronics'
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
            "https://estorejamuna.com/terms-conditions"
        },
        {
          hid: "og:description",
          name: "og:description",
          content:this.fetchedData.meta_description != null
          ? this.fetchedData.meta_description
          :'Privacy Policy | Jamuna Electronics.'
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
            return this.fetchedData.details
        }

    },



}
</script>
