<template>
  <div style="background: #fff">
    <input type="color" v-model="color" />
    <input type="range" max="30" min="1" v-model="lineWidth" />
    <sb-btn @click="penMode = !penMode">{{
      penMode ? "画笔模式" : "橡皮模式"
    }}</sb-btn>
    <sb-btn type="primary" @click="getImg">生成Base64图片</sb-btn>
    <div class="flex j-s a-c" style="margin-top: 20px">
      <canvas
        ref="canvas"
        width="400"
        height="400"
        style="border: 1px solid #ccc; display: block"
      ></canvas>
      <img
        v-if="previewImg"
        :src="previewImg"
        style="width: 300px; height: 300px"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "#ff0000",
      lineWidth: 0,
      penMode: true,
      previewImg: "",
      canDraw: false,
    };
  },
  methods: {
    getImg() {
      this.previewImg = this.canvas.toDataURL("image/png");
      this.$ms("生成成功", null, "可拿到base64字符串自行处理");
    },
    handleMouseMove(e) {
      if (this.canDraw) {
        let offsetX = e.pageX - this.canvas.offsetLeft;
        let offsetY = e.pageY - this.canvas.offsetTop;
        if (this.penMode) {
          this.context.lineTo(offsetX, offsetY);
          this.context.stroke();
        } else {
          this.context.fillStyle = "#fff";
          this.context.rect(offsetX, offsetY, 20, 20);
          this.context.fill();
        }
      }
    },
    handleMouseDown(e) {
      this.canDraw = true;
      let offsetX = e.pageX - this.canvas.offsetLeft;
      let offsetY = e.pageY - this.canvas.offsetTop;
      this.context.beginPath();
      this.context.moveTo(offsetX, offsetY);
    },
    handleMouseUp(e) {
      this.canDraw = false;
      this.context.closePath();
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
  watch: {
    color(c) {
      this.context.strokeStyle = c;
    },
    lineWidth(c) {
      if (c < 1) c = 1;
      this.context.lineWidth = c;
    },
  },
  mounted() {
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    let canDraw = false;
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("blur", this.handleMouseUp);
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
  },
  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("blur", this.handleMouseUp);
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
  },
};
</script>

<style scoped lang='scss'>
</style>