<template>
  <a-upload
    :name="field"
    :show-upload-list="false"
    :action="action"
    :before-upload="beforeUpload"
    @change="handleUploadStateChange"
  >
    <slot>
      <!-- 我在这插槽中默认给个按钮，项目中可以自行按需求修改 -->
      <sb-btn :loading="loading" icon="upload">点击上传</sb-btn>
    </slot>
  </a-upload>
</template>

<script>
import { UPLOAD_URL, LIMIT_UPLOAD_SIZE } from "~config";
import { ref } from "vue";
import { $mw } from "~mixins/useMsg";
export default {
  props: {
    /**
     * 后台接口需要的参数名称，默认file
     */
    field: {
      type: String,
      default: "file",
    },
    /**
     * 上传的后台路径，默认使用全局通用配置的，也可以自定义
     */
    action: {
      type: String,
      default: UPLOAD_URL,
    },
    /**
     * 限制文件大小，默认使用全局通用配置的，也可以自定义
     */
    limitSize: {
      type: Number,
      default: LIMIT_UPLOAD_SIZE,
    },
    /**
     * 限制文件类型
     */
    limitType: {
      type: [String, Array],
    },
  },
  emits: ["complete",'error'],
  setup(props, { emit }) {
    let loading = ref(false);
    /**
     * 监听上传状态，上传完成后触发complete事件
     */
    function handleUploadStateChange({ file }) {
      if (file.status === "uploading") {
        emit("uploading");
        loading.value = true;
        return;
      }

      if (file.status === "done") {
        emit("complete", file.response.data);
        loading.value = false;
      }

      if (file.status === "error") {
        emit("error");
        loading.value = false;
      }
    }

    /**
     * 上传前的限制,文件格式和体积
     */
    function beforeUpload(file) {
      if (props.limitType) {
        const isValidType = props.limitType.includes(file.type);
        if (!isValidType) {
          loading.value = false;
          $mw("文件格式不正确!");
          return false;
        }
      }
      const isValidSize = file.size / 1024 / 1024 < props.limitSize;
      if (!isValidSize) {
        loading.value = false;
        $mw(`请上传${props.limitSize}mb以内文件!`);
        return false;
      }
      return true;
    }

    return {
      loading,
      beforeUpload,
      handleUploadStateChange,
    };
  },
};
</script>

<style scoped lang='scss'>

</style>