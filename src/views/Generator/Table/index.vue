<template>
  <div>
    <a-drawer
      title="列信息编辑"
      placement="right"
      :closable="false"
      v-model:visible="visible"
      width="300"
    >
      <a-form
        ref="col_info_form"
        :model="colInfo"
        :rules="rules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="标题" name="title">
          <a-input v-model:value="colInfo.title" autocomplete="off" ></a-input>
        </a-form-item>
        <a-form-item label="对应字段" name="dataIndex">
          <a-input
            v-model:value="colInfo.dataIndex"
            placeholder="自动生成列的Key"
          ></a-input>
        </a-form-item>
        <a-form-item label="宽度" name="width">
          <a-input v-model:value="colInfo.width" placeholder="非必填"></a-input>
        </a-form-item>
        <a-form-item label="插槽名称">
          <a-input
            v-model:value="colInfo.slots.customRender"
            placeholder="非必填"
          ></a-input>
        </a-form-item>
        <a-form-item label="是否居中">
          <a-switch v-model:checked="colInfo.center" />
        </a-form-item>
      </a-form>
      <center>
        <sb-btn ghost @click="saveField" icon="save"> 保存信息 </sb-btn>
      </center>
    </a-drawer>
    <a-table
      :columns="cols"
      row-key="dataIndex"
      :data-source="dataSource"
      :pagination="false"
    ></a-table>
    <center>
      <sb-btn size="large" @click="visible = true" icon="plus">添加字段</sb-btn>
      &nbsp;
      &nbsp;
      &nbsp;
      <sb-btn ghost size="large" @click="downLoad" icon="save"> 下载Vue文件 </sb-btn>
    </center>
    <a-row class="flex">
      <a-col :span="12">
        <HighLightData label="列数组" :data="displayData" />
      </a-col>
      <a-col :span="12" style="padding: 30px 20px"> </a-col>
    </a-row>
  </div>
</template>

<script>
import { HighLightData } from "~components";
import rules from "./rules";
import cols from "./cols";
import service from "./service";
export default {
  name: "GeneratorTable",
  components: { HighLightData },
  setup() {
    return {
      cols,
      rules,
      ...service,
    };
  },
};
</script>

<style scoped lang='scss'>
</style>