<template>
  <div>
    <div style="margin: 20px 0">
      <a-button @click="save" type="primary">保存</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="true"
        action="123"
        @change="handleChange"
      >
        <a ref="upload"></a>
      </a-upload>
    </div>
    <div id="editor" style="height: 300px"></div>
    <hr />
    <div v-html="renderStr"></div>
  </div>
</template>

<script>
import {} from "~config";
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
export default {
  data() {
    return {
      quill: {},
      renderStr:""
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        let src = this.$getAbsoluteUrl(info.file.response);
        let { index } = this.quill.getSelection();
        this.quill.insertEmbed(index, "image", src);
      }
    },
    async save() {
      this.renderStr = this.quill.container.firstChild.innerHTML
    },
  },
  mounted() {
    this.quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],
          ["clean", "image"], // remove formatting button
        ],
      },
      placeholder: "请输入文章内容...",
    });

    var toolbar = this.quill.getModule("toolbar");
    toolbar.addHandler("image", () => {
      console.log(this.$refs.upload);
      this.$refs.upload.click();
    });
  },
};
</script>

<style scoped lang='scss'>
</style>