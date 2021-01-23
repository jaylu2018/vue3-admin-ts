<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
    <div class="flex flex-col h100">
      <div class="logo flex a-c" :class="{ collapsed }">
        <img src="@/assets/logo.png" alt srcset />
        <div class="title" v-show="!collapsed">{{ GLOBAL_TITLE }}</div>
      </div>
      <div class="left-side" :class="{ collapsed }">
        <a-menu
          theme="dark"
          mode="inline"
          :openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          @openChange="onOpenChange"
        >
          <template v-for="m in menus">
            <a-sub-menu :key="m.meta.title" v-if="m.children && m.children.length > 1">
              <template #title>
                <component :is="m.meta.icon"></component>
                <span>{{ m.meta.title }}</span>
              </template>
              <a-menu-item
                :key="s.meta.title"
                v-for="s in m.children.filter((r) => !r.meta.hideInMenu)"
              >
                <router-link :to="s.path">
                  <component :is="s.meta.icon"></component>
                  <span>{{ s.meta.title }}</span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="m.children[0].meta.title">
              <router-link :to="m.children[0].path">
                <component :is="m.children[0].meta.icon"></component>
                <span>{{ m.children[0].meta.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { GLOBAL_TITLE } from "~config";
import { ref, computed, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "SideBar",
  setup() {
    let route = useRoute();
    let {
      state: { system, account },
    } = useStore();
    //当前路由的标题，用于和子菜单对应
    let current_page_title = computed(() => route.meta.title);
    //当前路由所在模块的标题，用于和submenu对应
    let current_submenu_key = computed(() => route.matched[0].meta.title);
    //当前菜单是否收起
    let collapsed = computed(() => system.collapsed);
    //需要展开的菜单
    let openKeys = ref([current_submenu_key.value]);
    //路由对应的高亮的菜单KEY
    let selectedKeys = ref([current_page_title.value]);
    //根据路由生成的菜单数组
    let menus = computed(() => account.routes.filter((r) => !r.meta.hideInMenu));
    //不知道为啥需要写的submenu的keys
    let rootSubmenuKeys = menus.value.map((r) => r.meta.title);
    //想轻轻吐槽一下的手风琴效果
    function onOpenChange(oks) {
      const latestOpenKey = oks.find((key) => openKeys.value.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        openKeys.value = oks;
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      }
    }
    //监听路由的地址变化，注意不要watch(route)，否则CPU飙升
    watch(
      () => route.path,
      (val) => {
        //当路由变化时，拿到当前路由所在模块的标题，用于展开对应的菜单
        openKeys.value = [current_submenu_key.value];
        selectedKeys.value = [current_page_title.value];
      }
    );

    return {
      GLOBAL_TITLE,
      current_page_title,
      menus,
      collapsed,
      openKeys,
      selectedKeys,
      onOpenChange,
    };
  },
};
</script>

<style scoped lang="scss">
.logo {
  img {
    width: 36px;
    height: 28px;
  }
  &.collapsed {
    justify-content: center;
    img {
      width: 55px;
      height: 35px;
    }
  }
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 10px;
  overflow: hidden;
  .title {
    white-space: nowrap;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    padding: 0 5px;
  }
}

.left-side {
  flex: 1;
  width: 100%;
  overflow: hidden;
  &:hover {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  &.collapsed {
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: 3px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px #858686;
    background: #131212;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px #001529;
    border-radius: 10px;
    background: #001529;
  }
}
</style>
