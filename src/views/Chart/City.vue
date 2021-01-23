<template>
  <div style="background: #020933; height: 100%">
    <div ref="main" style="width: 600px; height: 500px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import chart_mixin from "./chartMixin";
export default {
  mixins: [chart_mixin],
  methods: {
    async initMap() {
      let mapData = await this.$get("dev/json/map/huaian.json");
      echarts.registerMap("huaian", mapData);
    },
    renderChart() {
      let option = {
        geo: {
          map: "huaian",
          aspectScale: 0.75, //长宽比
          zoom: 1.05,
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#013C62",
              shadowColor: "#182f68",
              shadowOffsetX: 0,
              shadowOffsetY: 25,
            },
            emphasis: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
              label: {
                show: false,
              },
            },
          },
        },
        series: [
          {
            type: "map",
            roam: true,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: "#2ab8ff",
                borderWidth: 1.5,
                areaColor: "#12235c",
              },
              emphasis: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
              },
            },
            zoom: 1.1,
            roam: false,
            map: "huaian",
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: [11, 22, 33, 44],
            encode: {
              value: 2,
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "emphasis",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#f4e925",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>

<style scoped lang='scss'>
</style>