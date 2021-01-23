<template>
  <div>
    <TitleAndBtn>
      <template #title> 基本信息 </template>
      <template #btn>
        <sb-btn ghost icon="plus-square"> 添加信息 </sb-btn>
      </template>
    </TitleAndBtn>
    <hr />
    <TitleAndBtn>
      <template #title> 更多信息 </template>
      <template #btn>
        <sb-btn ghost icon="file-excel"> 导出表格 </sb-btn>
      </template>
    </TitleAndBtn>
  </div>
</template>

<script>
import { TitleAndBtn } from "~components";
export default {
  components: {
    TitleAndBtn,
  },
};
</script>

<style></style>
