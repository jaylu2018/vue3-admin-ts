<template>
  <a-layout id="layout">
    <SideBar />
    <a-layout>
      <NavBar />
      <a-layout-content class="right">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { SideBar, NavBar } from "~components";
export default {
  components: {
    NavBar,
    SideBar,
  },
};
</script>
<style scoped lang='scss'>
#layout {
  height: 100vh;
  .right {
    margin: 24px 16px;
    // padding: 24px;
    // background: #fff;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/

      width: 6px; /*高宽分别对应横竖滚动条的尺寸*/

      height: 1px;
    }

    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/

      border-radius: 10px;

      -webkit-box-shadow: inset 0 0 5px #858686;

      background: #c3c4c5;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(155, 153, 153, 0.2);
      border-radius: 10px;
      background: rgba(202, 198, 198, 0.65);
    }
  }
}
</style>
