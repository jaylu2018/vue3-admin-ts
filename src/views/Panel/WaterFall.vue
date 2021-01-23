<template>
  <div id="app">
    <h1>基于<a href="https://github.com/lfyfly/vue-waterfall-easy"
    target="_blank"
    >vue-waterfall-easy</a>修改为适配Vue3版本，使用时可不设高度</h1>
    <Waterfall style="height:450px" :imgsArr="imgsArr" @scrollReachBottom="getData">
      <!-- <template #img-header="props">
        <h1>
          header
        </h1>
      </template> -->
      <template #default="props">
        <div class="img-info">
          <div class="some-info">{{ props.value.info }}</div>
        </div>
      </template>
    </Waterfall>
  </div>
</template>
<script>
import { $get } from "~mixins/useRequest";
import { Waterfall } from "~components";
export default {
  name: "app",
  data() {
    return {
      imgsArr: [],
      pageIndex: 0,
    };
  },
  components: {
    Waterfall,
  },
  methods: {
    async getData() {
      let { data } = await $get("/mock/getWaterFullData", {
        pageIndex: this.pageIndex,
      });
      this.imgsArr = this.imgsArr.concat(data);
      this.pageIndex++;
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="scss">
#app {
  position: relative;
  height: 100vh;
  #header {
    display: block;
    text-align: center;
    background: #000;
    color: #cccccc;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    position: fixed;
    z-index: 999;
    width: 100%;
  }
  #content {
    position: absolute;
    top: 32px;
    bottom: 0;
    width: 100%;
  }
}
// .__err__ .img-wraper {
//   background: url(/static/img/1.jpg) no-repeat center/100px 100px !important;
// }
#app {
  overflow: auto;
  position: relative;
  .some-info {
    line-height: 1.6;
    text-align: center;
  }
}

</style>
