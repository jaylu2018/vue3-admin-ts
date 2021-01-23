<template>
  <div class="tip">
    <slot></slot>
  </div>
</template>

<script>
//演示了vue3的样式表中使用Vue变量
export default {
  props: {
    color: {
      type: String,
      default: "#369",
    },
  },
  data() {
    return {
      innerColor: this.color,
    };
  },
  watch: {
    color() {
      this.innerColor = this.color;
    },
  },
};
</script>

<style scoped lang='scss'>
.tip {
  border-left: 5px solid v-bind("innerColor");
  padding: 12px;
  margin: 12px 0;
  background: #f5f5f5;
  color: #000;
  font-weight: bold;
}
</style>