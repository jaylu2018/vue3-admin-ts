<template>
  <div>
    <sb-tip color='#520'>{{ label }}</sb-tip>
    <pre v-highlightjs><code class="javascript">{{data}}</code></pre>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
export default {
  name: "PreviewData",
  props: {
    data: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
    },
  },
  directives: {
    highlightjs: (el, { value }) => {
      let targets = el.querySelectorAll("code");
      for (let i = 0; i < targets.length; i++) {
        let target = targets[i];
        if (typeof value === "object") value = JSON.stringify(value, null, 4);
        // target.textContent = value;
        hljs.highlightBlock(target);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
</style>