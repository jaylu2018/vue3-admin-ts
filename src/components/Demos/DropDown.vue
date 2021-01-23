<template>
  <div class="dropdown" v-clickout="(show = false)">
    <div class="label" @click="show = !show">clike me</div>
    <ul v-show="show" @click="show = false">
      <li @click="test1">menu 1</li>
      <li>menu 2</li>
      <li>menu 1</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped lang='scss'>
</style>