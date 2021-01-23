<template>
  <div class="flex a-c">
    <div v-if="isEdit">
      <input
        :style="{ width: w || '120px' }"
        :ref="field"
        type="text"
        :value="val"
      />
      <a-button size="small" type="primary" @click="save">保存</a-button>
      <a-button size="small" @click="isEdit = false">取消</a-button>
    </div>
    <div v-else @dblclick="open">{{ val }}</div>
  </div>
</template>

<script>
import mitt from 'mitt'
const emitter = mitt()
export default {
  props: ["k", "v", "w"],
  emits: ['save'],
  watch: {
    v() {
      this.val = this.v;
    },
  },
  data() {
    return {
      name: "EditabelField",
      isEdit: false,
      field: this.k,
      val: this.v,
    };
  },
  created() {
    //监听互斥事件，关闭自身
    emitter.on("closeOther", (sender) => {
      if (sender !== this) this.isEdit = false;
    });
  },
  methods: {
    save() {
      this.val = this.$refs[this.field].value || "无";
      this.$emit("save", {
        key: this.field,
        val: this.val,
      });
      this.isEdit = false;
    },
    open() {
      //打开某个时，关闭其他
      emitter.emit("closeOther", this);
      this.isEdit = true;
    },
  },
};
</script>

<style scoped lang='scss'>
input {
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  text-indent: 5px;
}
button {
  margin: 0 2px;
}
</style>