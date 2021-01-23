<template>
  <div class="container">
    <sb-loading v-if="loading"></sb-loading>
    <div id="allmap"></div>
  </div>
</template>

<script>
let BMap = {};
let map = {};
import { $get } from "~mixins/useRequest";
export default {
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    loadMapScript() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://api.map.baidu.com/getscript?v=3.0&ak=1H8Dhi2pGmOMYbN4EcaAGr1rv8f7Gmjz&services=&t=20200927172029";
      script.onload = () => {
        this.loadInfoBoxScript();
      };
      document.body.appendChild(script);
    },
    loadInfoBoxScript() {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/js/baidumap/infobox.js";
      script.onload = () => {
        this.init();
      };
      document.body.appendChild(script);
    },
    init() {
      BMap = window.BMap;
      map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(118.904, 31.915), 12); // 初始化地图,设置中心点坐标和地图级别
      map.setCurrentCity("南京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.loading = false;
    },
    addMarker() {
      let icon = new BMap.Icon("/images/avatar.jpg", new BMap.Size(50, 50));
      icon.setImageSize(icon.size);
      var marker = new BMap.Marker(new BMap.Point(118.904, 31.915), {
        icon,
      }); // 创建点
      map.addOverlay(marker);

      marker.addEventListener("click", async () => {
        let html = await $get("dev/template/baidumap_infobox.html");
        var infoBox = new BMapLib.InfoBox(map, html, {
          boxStyle: {
            background: "#fff",
            width: "270px",
            height: "300px",
          },
          closeIconMargin: "1px 1px 0 0",
          closeIconUrl: "/images/close.png",
          enableAutoPan: true,
          align: INFOBOX_AT_TOP,
        });

        infoBox.open(marker);
      });
    },
  },
  mounted() {
    this.loadMapScript();
    setTimeout(() => {
      this.addMarker();
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0;
  font-family: "微软雅黑";
}
#allmap {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
