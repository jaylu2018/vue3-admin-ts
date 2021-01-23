<template>
  <div style="background: #fff">
    <TuiEditor ref="editor" />
    <sb-btn size="large" @click="save" ghost type="primary" icon="save">保存</sb-btn>
  </div>
</template>

<script>
import { TuiEditor } from "~components";
export default {
  components: {
    TuiEditor,
  },
  methods: {
    save() {
      console.log(this.$refs.editor.invoke("getHtml"));
      this.$ms(this.$refs.editor.invoke("getHtml"));
    },
  },
};
</script>

<style scoped lang="scss"></style>
