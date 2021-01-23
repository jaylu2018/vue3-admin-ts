<template>
  <div class="uploader relative">
    <img :src="imgPath" class="img" />
    <div class="ctrl absolute flex a-c j-c">
      <Uploader
        :action="action"
        @complete="handleUploadSuccess"
        @error="$emit('error')"
        @uploading="loading = true"
      >
        <component :is="iconIsLoading" />
      </Uploader>
      <i-zoom-in @click="showPreviewImg = true" />
    </div>
    <PreviewImage
      :w="largeImgSize[0]"
      :h="largeImgSize[1]"
      :src="largeImg"
      v-model:show="showPreviewImg"
    ></PreviewImage>
  </div>
</template>

<script>
import Uploader from "../Uploader";
import PreviewImage from "../PreviewImage";
import { NO_IMG_PATH } from "~config";
import { getStaticPath } from "~utils";
import { ref, computed, watch, toRefs } from "vue";
export default {
  emits: ["changeImg", "error"],
  components: {
    Uploader,
    PreviewImage,
  },
  props: {
    action: {
      type: String,
    },
    largeSrc: {
      type: String,
    },
    src: {
      type: String,
      default: NO_IMG_PATH,
    },
    largeImgSize: {
      type: Array,
      default: ["400px", "500px"],
    },
  },
  setup(props, { emit }) {
    let { src, largeSrc } = toRefs(props);
    let showPreviewImg = ref(false);
    let loading = ref(false);
    let imgPath = ref(src.value || NO_IMG_PATH);
    let largeImg = computed(() => (largeSrc ? largeSrc.value : imgPath.value));
    watch(src, () => {
      imgPath.value = src.value || NO_IMG_PATH;
    });
    let iconIsLoading = computed(() =>
      loading.value ? "i-loading" : "i-swap"
    );
    //上传成功,更换图片，并且触发事件
    let handleUploadSuccess = (newImgPath) => {
      // imgPath.value = getStaticPath(newImgPath);
      emit("changeImg", newImgPath);
      loading.value = false;
    };

    return {
      imgPath,
      iconIsLoading,
      largeImg,
      loading,
      showPreviewImg,
      handleUploadSuccess,
    };
  },
};
</script>

<style scoped lang='scss'>
.uploader {
  width: 150px;
  border-radius: 5px;
  overflow: hidden;
  height: 168px;

  .img {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
  }

  &:hover {
    .ctrl {
      height: 40px;
    }
  }

  .ctrl {
    width: 100%;
    bottom: 0;
    height: 0px;
    transition: 0.3s;
    overflow: hidden;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.8);
    .anticon {
      color: #fff;
      margin: 0 20px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>