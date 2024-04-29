<template>
<div>
      <Popup></Popup>
        <HomeSlider></HomeSlider>
        <Category></Category>
        <div v-for="index in fetchedData.data.home_content" :key="index">
        <AirConditionerSlider v-bind:cat_id = index></AirConditionerSlider>
        </div>
                  <FeaturedSlider v-show="fetchedData.data.featured_status == 1"></FeaturedSlider>

         <Banner></Banner>
      
  </div>
</template>

<script>
import Vue from 'vue'
import axios from "~/plugins/axios";
import FeaturedSlider from '~/components/FeaturedSlider';
import AirConditionerSlider from '~/components/AirConditionerSlider';
import Category from '~/components/Category';
import HomeSlider from '~/components/HomeSlider';
import Popup from '~/components/PopUp';
import Banner from '~/components/Banner';
export default {



  async asyncData ({ params }) {
    // We can use async/await ES6 feature
    const fetchedData = await fetch(`https://erp.estorejamuna.com/api/site-settings`).then(res => res.json())

    return { fetchedData }
  },

  head() {
    return {
         title:
        this.fetchedData.data.meta_title,
      meta: [
         {
        hid: "keywords",
        name: "keywords",
        content:this.fetchedData.data.meta_keywords
      },
       {
        hid: "description",
        name: "description",
        content:this.fetchedData.data.meta_description
      },

     {
        hid: "og:title",
        name: "og:title",
        content:this.fetchedData.data.meta_title
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://erp.estorejamuna.com/images/logo.png"
      },
      { hid: "og:type", name: "og:type", content: "web Ecommerce" },
      {
        hid: "og:url",
        name: "og:url",
        content:
          "http://estorejamuna.com"
      },
      {
        hid: "og:description",
        name: "og:description",
        content: this.fetchedData.data.meta_description
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: this.fetchedData.data.meta_title
      }, {
        hid: 'twitter:title',
        name: 'twitter:title',
        content:this.fetchedData.data.meta_title
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:this.fetchedData.data.meta_description
      },
      
      ]
    }
  },

  components: {
          Popup,HomeSlider,Category,AirConditionerSlider,FeaturedSlider,
    Banner
  },


}
</script>

<style>
  a {
    color: #333333;
    text-decoration: none;
    transition: 0.5s all ease;
  }
  a:hover {
    text-decoration: none;
    color: #E30611;
  }
  .btn-to-top {
    width: 60px;
    height: 60px;
    padding: 10px 16px;
    border-radius: 50%;
    font-size: 22px;
    line-height: 22px;
  }



</style>
