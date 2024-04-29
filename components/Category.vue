<template>
  <div class="cat-banner-area">
    <div class="container">
      <div class="row">
        <div class="col-sm-3" v-for="(category,index) in categories" :key="index">
          <div class="block-wrapper ship">
            <nuxt-link
            tag="div"
              :to="{path:'/category/'+url_slug(category.cat_name)}"
              :title="category.cat_name"
              :style="{ cursor: 'pointer','text-decoration':'none'}"
            >
              <div class="text-des">
                <div class="icon-wrapper">
                  <img :src="`${$axios.defaults.baseURL}`+category.cat_icone" :alt="category.cat_name" />
                </div>
                <div class="service-wrapper">
                  <h5 class="cat-banner-name">{{category.cat_name}}</h5>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
    };
  },
computed: {
  categories(){
    return this.$store.getters.getCategories;
  }
},
mounted() {
  this.fetchCategories()
},
  methods: {
    fetchCategories() {
      axios
        .get("/api/categories")
        .then(response => {
           this.$store.commit("setCategories", response.data.categories);
        })
        },
    url_slug(value) {
      value = value.replace(/^\s+|\s+$/g, ""); // trim
      value = value.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
      var to = "aaaaaeeeeeiiiiooooouuuunc------";
      for (var i = 0, l = from.length; i < l; i++) {
        value = value.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      value = value
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

      return value;
    }
  }
};
</script>
<style scoped>
.cat-banner-name {
  line-height: 43px;
  color: #989292;
  font-size: 14px;
  font-weight: 600;
}
.cat-banner-name:hover {
  line-height: 43px;
  color: #E40514;
  font-size: 14px;
  font-weight: 600;
}
</style>
