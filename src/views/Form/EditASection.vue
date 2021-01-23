<template>
  <a-card title="基本信息" style="width: 300px">
    <template #extra>
      <a href="javascript:;" v-show="!isEdit" @click="changestate">
        <i-edit />
      </a>
      <sb-btn v-show="isEdit" size="small" type="primary" @click="save">
        保存
      </sb-btn>
      <sb-btn v-show="isEdit" size="small" @click="cancel">取消</sb-btn>
    </template>
    <a-form-item label="昵称">
      <a-input v-if="isEdit" v-model:value="info.nickname" />
      <div v-else>{{ info.nickname }}</div>
    </a-form-item>
    <a-form-item label="年龄">
      <a-input v-if="isEdit" v-model:value="info.age" />
      <div v-else>{{ info.age }}</div>
    </a-form-item>
    <a-form-item label="签名">
      <a-textarea autoSize  v-if="isEdit" v-model:value="info.sign" />
      <div v-else>{{ info.sign }}</div>
    </a-form-item>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      info: { nickname: "SIMBA", age: 20, sign: "聚散不由我" },
      bak: {},
      isEdit: false,
    };
  },
  methods: {
    changestate() {
      this.bak = JSON.parse(JSON.stringify(this.info));
      this.isEdit = true;
    },
    save() {
      //ajax
      this.$ms("修改成功")
      this.isEdit = false;
    },
    cancel() {
      this.info = this.bak;
      this.isEdit = false;
    },
  },
};
</script>

<style scoped lang='scss'>
</style>