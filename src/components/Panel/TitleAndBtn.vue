<template>
  <a-row type="flex" class="title-and-btn">
    <a-col :flex="1">
      <div class="ant-descriptions-title">
        <slot name="title">标题</slot>
      </div>
    </a-col>
    <a-col>
      <slot name="btn"></slot>
    </a-col>
  </a-row>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.title-and-btn {
  padding: 10px 0;
}
</style>