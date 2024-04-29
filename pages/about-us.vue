<template>
  <div class="main">
    <div v-html="fetchedData">


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
  //     asyncData(context) {
  //   return axios
  //     .get('/api/cmsPage/'+context.route.name)
  //     .then(res => {

  //   // console.log(res.data)

  //         context.store.commit('setCmsPage',res.data.details);
  //       return { 
  //           fetchedData: res.data
            
  //           };
  //     });
  // },
   head() {
    return {
      title:'About Us | Jamuna Electronics',
      meta: [
        {
          hid: `description`,
          name: 'description',
          content:'Jamuna About Section. Jamuna Group About Us.'
        },
        {
          hid: "keywords",
          name: "keywords",
          content:'Jamuna Group, Jamuna Dealer, Jamuna Plaza'
        },
        {
          hid: "og:title",
          name: "og:title",
          content:'About Us | Jamuna Electronics'
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "http://erp.estorejamuna.com/images/logo.png"
        },
        { hid: "og:type", name: "og:type", content: "Ecommerce" },
        {
          hid: "og:url",
          name: "og:url",
          content:
            "http://estorejamuna.com/dealer-register"
        },
        {
          hid: "og:description",
          name: "og:description",
          content:'About Us | Jamuna Electronics.'
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


    
}
</script>