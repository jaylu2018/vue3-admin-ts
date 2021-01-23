<template>
  <div>
    <sb-tip>
      动态表格，有时候产品经理设计了复杂的展示形式，常规的调用语法已经无法满足了，需要更深入的操作
    </sb-tip>
    <a-row :gutter="30">
      <a-col :span="18">
        <a-table
          :pagination="false"
          :data-source="tableData"
          row-key="time"
          bordered
          :loading="loading"
        >
          <a-table-column key="time" data-index="time" align="center">
            <template #title>
              <h1 style="color: #369; font-weight: bold; font-size: 18px">
                每日时间段
              </h1>
            </template>
            <template #default="{ text }">
              <h1>{{ text }}</h1>
            </template>
          </a-table-column>
          <a-table-column
            key="time"
            v-for="(date, i) in dateList"
            align="center"
            data-index="time"
          >
            <template #title>
              <h1>{{ fmtWeekDay(i) }}</h1>
              {{ date }}
            </template>
            <template #default="scope">
              {{ scope.record[date] }}
            </template>
          </a-table-column>
        </a-table>
      </a-col>
      <a-col :span="6">
        <HighLightData
          style="overflow-y: scroll;height:500px"
          label="本表格数据源如下"
          :data="tableData"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { getDynamicTable } from "@/api/table";
import { HighLightData } from "~components";

export default {
  methods: {
    getTableData() {
      this.loading = true;
      //模拟请求的延迟
      setTimeout(async () => {
        let {
          data: { dateList, tableData },
        } = await getDynamicTable();

        this.tableData = tableData;
        this.dateList = dateList;
        this.loading = false;
      }, 1000);
    },
    fmtWeekDay(val) {
      return "周" + "一二三四五六日"[val];
    },
  },
  components: { HighLightData },
  data() {
    return {
      dateList: [],
      tableData: [],
      loading: false,
    };
  },
  created() {
    this.getTableData();
  },
};
</script>
