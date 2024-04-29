<template>
<div>
        <HomeSlider></HomeSlider>
        <CategoryList></CategoryList>
        <div v-for="index in fetchedData.home_content" :key="index">
        <AirConditionerSlider v-bind:cat_id = index></AirConditionerSlider>
        </div>
         <Banner></Banner>
      
  </div>
</template>

<script>
import Vue from 'vue'
import axios from "~/plugins/axios";
import FeaturedSlider from '~/components/FeaturedSlider';
import AirConditionerSlider from '~/components/AirConditionerSlider';
import CategoryList from '~/components/CategoryList';
import HomeSlider from '~/components/HomeSlider';
import Popup from '~/components/PopUp';
import Banner from '~/components/Banner';



export default {

 async asyncData ({ context }) {
    const { data } = await axios.get(`/api/site-settings`)
    return { fetchedData: data.data }
  },

  components: {
          Popup,HomeSlider,CategoryList,AirConditionerSlider,FeaturedSlider,
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
