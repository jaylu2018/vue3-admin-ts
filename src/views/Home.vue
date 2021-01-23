<template>
  <div>
    <a-row :gutter="20">
      <a-col :span="6">
        <a-card style="height: 120px">
          <h1>服务器系统</h1>
          {{ sysInfo.system.name }}
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card style="height: 120px">
          <h1>内存占用情况(MB)</h1>
          <count-to :endVal="sysInfo.memory.curr"></count-to>
          /
          <count-to :endVal="sysInfo.memory.total"></count-to>
          <a-progress style="width:90%" :percent="sysInfo.memory.percent" status="active" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card style="height: 120px">
          <h1>服务器CPU架构</h1>
          <div>{{ sysInfo.cpu.model }}</div>
          {{ sysInfo.cpu.core }}核/{{ sysInfo.cpu.arch }}
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card style="height: 120px">
          <h1>您的IP地址</h1>
          {{ sysInfo.ip }}
        </a-card>
      </a-col>
    </a-row>
    <a-row style="margin: 20px 0">
      <a-col :span="14">
        <a-card title="快捷入口">
          <a-card-grid style="width: 25%; text-align: center">
            <a href="https://space.bilibili.com/425325651" target="_blank"
              >哔哩哔哩</a
            >
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <a href="https://github.com/SimbaZZX" target="_blank">GitHub</a>
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <a href="https://juejin.cn/user/1151943918757144" target="_blank"
              >掘金博客</a
            >
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <a href="http://simbajs.com/" target="_blank">Shendu Studio</a>
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <router-link to="/order/list">账单列表</router-link>
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <router-link to="/zhal/addPerson">添加家庭人员</router-link>
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <router-link to="/panel/waterfall">瀑布流</router-link>
          </a-card-grid>
          <a-card-grid style="width: 25%; text-align: center">
            <router-link to="/Generator/Table">表格设计器</router-link>
          </a-card-grid>
        </a-card>
        <a-list
          bordered
          :data-source="dynamicList"
          style="margin: 20px 0; background: #fff"
        >
          <template #renderItem="{ item, index }">
            <a-list-item>
              <div>
                {{ item }}
              </div>
              <div class="font12">2020-12-09 11:22:12</div>
            </a-list-item>
          </template>
          <template #header>
            动态
          </template>
        </a-list>
      </a-col>
      <a-col :span="10" style="padding: 0 50px; box-sizing: border-box">
        <div ref="chart1" style="height: 500px; width: 100%"></div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import echarts from "echarts";
import { onMounted, ref } from "vue";
import { $get } from "~mixins/useRequest";
import { CountTo } from "~components";

export default {
  data() {
    return {
      dynamicList: [
        "张三将订单金额从2000为2021",
        "李四删除了编号为1021的订单",
        "李四添加了一笔新的订单，单号为1022",
        "王五将订单10022中的客户电话修改为18899009890",
        "赵六提交了报销申请",
      ],
    };
  },
  components: { CountTo },
  setup() {
    let sysInfo = ref({
      system: {
        type: "",
        name: "",
        zzz: "",
      },
      cpu: {
        arch: "",
        core: "",
      },
      memory: "",
    });
    async function getSysInfo() {
      let { data } = await $get("/system/getSysInfo");
      sysInfo.value = data;
      initChart1(data.memory[0], data.memory[1]);
    }
    let chart1 = ref(null);
    function initChart1(val, total) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(chart1.value);

      window.onresize = () => {
        myChart.resize();
      };

      // 指定图表的配置项和数据
      var option = {
        tooltip: {},
        legend: {
          data: ["预算分配", "实际开销"],
        },
        color: ["#369", "#f40"],
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "Vue", max: 1000 },
            { name: "React", max: 1000 },
            { name: "Angular", max: 1000 },
            { name: "uni-App", max: 1000 },
            { name: "Node", max: 1000 },
            { name: "JavaScript", max: 1000 },
          ],
        },
        series: [
          {
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [830, 600, 500, 300, 800, 900],
                name: "兴趣值",
              },
              {
                value: [500, 140, 280, 100, 420, 510],
                name: "能力值",
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    }

    onMounted(() => {
      getSysInfo();
    });

    return { sysInfo, chart1 };
  },
};
</script>

<style scoped lang='scss'>
// .right.ant-layout-content {
//   background: #eee;
// }
</style>