<template>
  <div style="background: #fff">
    <sb-btn type="primary" @click="capture">生成区域截图</sb-btn>
    <div
      class="flex j-s a-c"
      ref="capture"
      style="margin-top: 20px; width: 600px; padding: 10px"
    >
      <a-descriptions title="User Info">
        <a-descriptions-item label="UserName">
          Simba
        </a-descriptions-item>
        <a-descriptions-item label="Telephone">
          1810000000
        </a-descriptions-item>
        <a-descriptions-item label="Live">
          江苏淮安
        </a-descriptions-item>
        <a-descriptions-item label="Remark"> empty </a-descriptions-item>
        <a-descriptions-item label="Address">
          No. 18, Wantang Road,
        </a-descriptions-item>
      </a-descriptions>
    </div>
    
    <PreviewImage :w="w" :h="h" :src="preview_img" v-model:show="isPreview" />
  </div>
</template>

<script>
import { PreviewImage } from "~components";
import html2canvas from "html2canvas";
export default {
  components: { PreviewImage },
  data() {
    return {
      visible: false,
      preview_img: "",
      isPreview: false,
      h: "110",
      w: "110",
    };
  },
  methods: {
    async capture() {
      let canvas = await html2canvas(this.$refs.capture);
      this.$ms("截图成功", "为保证最佳效果，可右键另存到本地或新页面打开");
      this.preview_img = canvas.toDataURL("image/png");
      let img = new Image();
      img.src = canvas.toDataURL("image/png");
      img.onload = () => {
        this.w = img.width;
        this.h = img.height;
        this.isPreview = true;
      };
    },
  },
};
</script>

<style scoped lang='scss'>
</style>