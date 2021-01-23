<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "dayjs/locale/zh-cn";
moment.locale("zh-cn");
import { SbTable } from "~components";
import { $decorateCols } from "~mixins/useUtils";

export default {
  components: {
    SbTable,
  },
  
  data() {
    return {
      zhCN,
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
}
</style>