<template>
  <div>
    <a-descriptions :column="2" title="双击他们看看吧">
      <a-descriptions-item label="昵称">
        <EditableField k="nickname" @save="edit" :v="info.nickname" />
      </a-descriptions-item>
      <a-descriptions-item label="年龄">
        <EditableField k="age" @save="edit" :v="info.age" />
      </a-descriptions-item>
      <a-descriptions-item label="地址">
        <EditableField k="address" w="500px" @save="edit" :v="info.address" />
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { EditableField } from "~components";

export default {
  components:{EditableField},
  data() {
    return {
      info: {
        nickname: "张三",
        age: 20,
        address: "江苏淮安",
      },
    };
  },
  methods: {
    edit({ key, val }) {
      //这里可以ajax更新数据库
      this.$ms(`修改了${key}=${val}`);
    },
  },
};
</script>

<style scoped lang='scss'>
</style>