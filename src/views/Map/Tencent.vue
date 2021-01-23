<template>
  <div>
    <div ref="container" style="height: 500px">
      <sb-loading v-if="loading" />
    </div>
  </div>
</template>

<script>
import createMapMarker from "~vendor/marker";
function loadScript(callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=init";
  document.body.appendChild(script);
  script.onload = () => {
    callback();
  };
}
window.onload = loadScript;

// import io from "socket.io-client";
export default {
  data() {
    return {
      geocoder: null,
      loading: true,
      visible: false,
      map: null,
      marker: null,
      socket: null,
      form: { lng: "", lat: "", msg: "", level: 0 },
    };
  },
  mounted() {
    loadScript(() => {
      this.init();
    });
  },
  methods: {
    init() {
      var center = new window.TMap.LatLng(39.98412, 116.307484);
      //定义map变量，调用 TMap.Map() 构造函数创建地图
      var map = new window.TMap.Map(this.$refs.container, {
        center: center, //设置地图中心点坐标
        zoom: 17.2, //设置地图缩放级别
      });

      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.rightBar {
  width: 60px;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(231, 229, 229, 0.864);

  .anticon {
    font-size: 30px;
    color: rgb(109, 108, 108);
    margin: 20px 0;
    &.add {
      color: #f00;
    }
  }
}
</style>
