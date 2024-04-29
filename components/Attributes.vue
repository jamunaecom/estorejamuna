<template>
  <div>
    <div class="field" v-for="(attr,index) in attr_value" :key="index">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="attr.value" @change="attr_select(attr.value)" />

          {{attr.value}}
        </label>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import axios from "~/plugins/axios";
  export default {
    props: ["attr_id", "minPrice", "maxPrice", "cat_name"],
    data() {
      return {
        attr_value: [],
        attr: []
      };
    },
    mounted() {
      this.attr_data();
    },
    methods: {
      attr_data() {
        axios.get("/api/cat-attrDetails/" + this.attr_id.id).then(response => {
          this.attr_value = response.data;
        });
      },
      attr_select(val) {


        this.$store.commit('setCatAttr',val);

        // console.log(this.attr);
      }
    }
  };
</script>
