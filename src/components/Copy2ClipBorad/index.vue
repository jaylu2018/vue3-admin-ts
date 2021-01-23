<template>
  <i-copy
    @click="copy(text)"
    style="color: #069; font-size: 14px; cursor: pointer"
  />
</template>

<script>
import { $copy } from "~mixins/useUtils";
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { copy: $copy };
  },
};
</script>

<style scoped lang='scss'>
</style>