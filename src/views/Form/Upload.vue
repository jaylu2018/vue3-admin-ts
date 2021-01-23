<template>
  <div>
    <h1>上传文件,对ANTDV自带的组件进行了包装，节省代码</h1>
    <ul class="flex">
      <li>
        <h1>默认使用</h1>
        <Uploader @complete="handleUpdate1" />
        <div>
          {{ src1 }}
        </div>
      </li>
      <li>
        <h1>自定义触发控件</h1>
        <Uploader @complete="handleUpdate2">
          <i-upload />
        </Uploader>
        <div>
          <div>预览</div>
          <img :src="src2" v-if="src2" style="width: 200px; height: 200px" />
        </div>
      </li>

      <li>
        <h1>限制只能传png图片和2M大小</h1>
        <Uploader
          :limitSize="2"
          :limitType="['image/png']"
          @complete="handleUpdate3"
        >
          <i-upload />上传图片
        </Uploader>
        <div>
          <div>预览</div>
          <img :src="src3" v-if="src3" style="width: 200px; height: 200px" />
        </div>
      </li>
      <li>
        <h1>自定义上传路径和参数名，以及捕捉失败</h1>
        <h2>http://xxx.com/upload</h2>
        <Uploader @error="fail" field="zzz" action="http://xxx.com/upload" />
      </li>
    </ul>
  </div>
</template>

<script>
import { Uploader } from "~components";
import { getStaticPath } from "~utils";
export default {
  components: {
    Uploader,
  },
  data() {
    return {
      src1: "",
      src2: "",
      src3: "",
    };
  },
  methods: {
    handleUpdate1(res) {
      this.$ms("上传成功", "可以在控制台看返回的地址");
      // this.src1 = getStaticPath(res);
      console.log(res);
    },
    handleUpdate2(res) {
      this.$ms("上传成功", "可以在控制台看返回的地址");
      console.log(res);
      this.src2 = getStaticPath(res);
    },
    handleUpdate3(res) {
      this.$ms("上传成功");
      this.src3 = getStaticPath(res);
    },
    fail() {
      this.$me("上传失败，请检查路径");
    },
  },
};
</script>

<style scoped lang='scss'>
li {
  padding: 30px;
}
</style>