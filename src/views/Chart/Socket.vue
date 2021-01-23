<template>
  <div>
    <h1>这里用v3的socket.io-client就不生效，所以需要降版本</h1>
    <div ref="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import { SOCKET_URL } from "~config";
import chart_mixin from "./chartMixin";
import io from "socket.io-client";
export default {
  mixins: [chart_mixin],
  methods: {
    renderChart(data) {
      var option = {
        tooltip: {},
        legend: {
          data: ["人数"],
        },
        xAxis: {
          data: ["react", "vue", "angular", "javascript"],
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "line",
            data,
          },
        ],
      };

      this.myChart.setOption(option);
    },
  },
  data() {
    return {
      socket: {},
    };
  },
  mounted() {
    let socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("connect!");
    });
    socket.emit("getChartData");

    setInterval(() => {
      socket.emit("getChartData");
    }, 2000);
    socket.on("res_chart_data", (data) => {
      console.log("接收到数据...");
      this.renderChart(data);
    });
  },
};
</script>

<style scoped lang='scss'>
</style>