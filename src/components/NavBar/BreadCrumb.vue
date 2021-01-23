<template>
  <a-breadcrumb style="line-height: 64px">
    <a-breadcrumb-item>
      <i-home />
      {{ GLOBAL_TITLE }}
    </a-breadcrumb-item>
    <a-breadcrumb-item v-if="current_submenu_key">{{
      current_submenu_key
    }}</a-breadcrumb-item>
    <a-breadcrumb-item>{{ current_page_title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { GLOBAL_TITLE } from "~config";
import { ref, computed, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "BreadCrumb",
  setup() {
    let route = useRoute();
    //当前路由的标题，用于和子菜单对应
    let current_page_title = computed(() => route.meta.title);
    //当前路由所在模块的标题，用于和submenu对应
    let current_submenu_key = computed(() => route.matched[0].meta.title);
    return {
      GLOBAL_TITLE,
      current_submenu_key,
      current_page_title,
    };
  },
};
</script>

<style scoped lang='scss'>
</style>