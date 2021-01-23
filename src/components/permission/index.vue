<template>
  <div v-if="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["role"],
  mounted() {
    if (this.role === localStorage.getItem("role")) {
      this.show = true;
    }
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped lang='scss'>
</style>