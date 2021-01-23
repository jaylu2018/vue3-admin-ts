<template>
  <div class="flex j-s" style="background: #eee">
    <div>
      <sb-btn type="primary" @click="getPoster">生成海报</sb-btn>
      <img :src="img" style="display: block; margin-top: 20px" />
    </div>
    <div>
      <sb-btn type="danger" @click="download">下载图片</sb-btn>
      <canvas
        ref="canvas"
        width="400"
        height="350"
        style="border: 1px solid #ccc; display: block; margin-top: 20px"
      ></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "/zzn.jpg",
    };
  },
  methods: {
    getPoster() {
      let { offsetWidth, offsetHeight } = this.canvas;
      this.context.fillStyle = "#fff";
      this.context.rect(0, 0, offsetWidth, offsetHeight);
      this.context.fill();

      let img = new Image();
      img.src = this.img;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        let percent = img.width / img.height;
        let h = offsetWidth / percent;
        this.context.drawImage(img, 0, 0, offsetWidth, h);
        this.context.font = "30px 黑体";
        this.context.textBaseline = "top";
        this.context.fillStyle = "#369";
        this.context.fillText("我太南了", 5, h + 20);
        this.context.closePath();
        this.context.beginPath();
        this.context.font = "14px 黑体";
        this.context.textBaseline = "top";
        this.context.fillStyle = "#aaa";
        this.context.fillText("希望我家弟弟挺过去~", 5, h + 70);
        this.context.closePath();
        //二维码图片
        let code_img = new Image();
        code_img.src = "/pay_me.png";
        code_img.crossOrigin = "Anonymous";
        code_img.onload = () => {
          this.context.drawImage(
            code_img,
            offsetWidth - 100 - 10,
            h + 10,
            100,
            100
          );
        };
      };
    },
    download() {
      let a = document.createElement("a");
      a.href = this.canvas.toDataURL("image/png");
      a.download = "阿南.png";
      a.click();
    },
  },
  computed: {
    canvas() {
      return this.$refs.canvas;
    },
    context() {
      return this.canvas.getContext("2d");
    },
  },
};
</script>

<style scoped lang='scss'>
</style>