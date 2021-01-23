<template>
  <div>
    <sb-tip>使用v-time自定义指令,将原时间值格式化为友好时间</sb-tip>
    <a-row>
      <a-col :span="12">
          {{ date1 }}=>
          <span v-time="date1"></span>
      </a-col>
      <a-col :span="12">
          {{ date2 }}=>
          <span v-time="date2"></span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
          {{ date3 }}=>
          <span v-time="date3"></span>
      </a-col>
      <a-col :span="12">
          {{ date4 }}=>
          <span v-time="date4"></span>
      </a-col>
    </a-row>
  </div>
</template>

<script >
export default {
  data() {
    return {
      date1: "2020-12-29 11:22:33",
      date2: new Date() - 1000,
      date3: +new Date() - 100000,
      date4: "Thu, 08 Oct 2020 09:36:18 GMT",
    };
  },
};
</script>
