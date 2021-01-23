<template>
  <div>
    <img
      v-for="src in list"
      @click="preview(src)"
      :src="src"
      style="width: 300px; height: 200px; margin: 10px"
    />
    <preview-image :src="currImg" v-model:show="show" />
  </div>
</template>

<script>
import { ref } from "vue";
import { PreviewImage } from "~components";
export default {
  components: { PreviewImage },
  setup() {
    let show = ref(false);
    let currImg = ref(null);
    let list = ref([
      "/previewImg/1.jpg",
      "/previewImg/2.jpg",
      "/previewImg/3.jpg",
    ]);
    let preview = (src) => {
      show.value = true;
      currImg.value = src;
    };
    return { show, list, preview, currImg };
  },
};
</script>

<style scoped lang='scss'>
</style>