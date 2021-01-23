<template>
  <div>
    <a-row>
      <a-col :span="4">
        <h1>正常使用</h1>
        <ToggleImage
          action="http://simbajs.com:7001/order/uploadOrderPicture"
          :largeImgSize="['800px', '500px']"
          :src="src1"
          @change-img="updateImg"
          @error="error"
        />
      </a-col>
      <a-col :span="4">
        <h1>小图和大图分开传</h1>
        <ToggleImage
          @change-img="updateImg1"
          :src="src2"
          large-src="/previewImg/2.jpg"
        />
      </a-col>
      <a-col :span="4">
        <h1>无图片</h1>
        <ToggleImage :src="src3" @change-img="updateImg2" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ToggleImage } from "~components";
import { getStaticPath } from "~utils";
export default {
  components: {
    ToggleImage,
  },
  data() {
    return {
      src1: "/previewImg/1.jpg",
      src2: "/previewImg/3.jpg",
      src3: "",
    };
  },
  methods: {
    updateImg(path) {
      this.src1 = "http://simbajs.com:7001/public/uploads/" + path;
      this.$ms("图片修改成功", path);
    },
    updateImg1(path) {
      this.src2 = getStaticPath(path);
      this.$ms("图片修改成功", path);
    },
    updateImg2(path) {
      this.src3 = getStaticPath(path);
      this.$ms("图片修改成功", path);
    },
    error() {
      this.$me("图片修改失败");
    },
  },
};
</script>

<style scoped lang='scss'>
li {
  padding: 30px;
}
</style>