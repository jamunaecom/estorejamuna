import Vue from 'vue';
export function url_slug(value){
    value = value.replace(/(\-)\1+/gi, "-");
    return value;
}