<template>
  <a-modal
    :title="isEdit ? '编辑货品' : '添加货品'"
    :visible="visible"
    @ok="handleSaveModalInfo"
    @cancel="$emit('update:visible', false)"
    :afterClose="clearForm"
  >
    <a-form
      ref="formProduct"
      :model="productInfo"
      :rules="add_prod_rule"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="国内单号" name="express_no">
        <a-input
          v-model:value="productInfo.express_no"
          placeholder="请输入国内单号"
        />
      </a-form-item>
      <a-form-item label="货品名称" name="name">
        <a-input
          v-model:value="productInfo.name"
          placeholder="请输入货品名称"
        />
      </a-form-item>
      <a-form-item label="货品重量(KG)" name="weight">
        <a-input-number
          v-model:value="productInfo.weight"
          :min="0.1"
          :max="1000"
          placeholder="重量"
        />
      </a-form-item>
      <a-form-item label="长*宽*高(cm)">
        <a-row :gutter="80">
          <a-col :span="7">
            <a-form-item name="length">
              <a-input-number
                v-model:value="productInfo.length"
                :min="1"
                :max="1000"
                placeholder="长度"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item name="width">
              <a-input-number
                v-model:value="productInfo.width"
                :min="1"
                :max="1000"
                placeholder="宽度"
              />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item name="height">
              <a-input-number
                v-model:value="productInfo.height"
                :min="1"
                :max="1000"
                placeholder="高度"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="体积重(KG)">
        <h3>{{ volumn }}</h3>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { $get, $post } from "~mixins/useRequest";
import { $ms, $me } from "~mixins/useMsg";
import add_prod_rule from "../service/add_prod_rule";
import { calcVolumn } from "~utils";
import { computed, ref, toRefs, watch } from "vue";
export default {
  emits: ["update:visible", "ok", "close"],
  props: {
    orderId: {
      type: [Number, String],
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    let formProduct = ref(null);

    let productInfo = ref({});

    let { id } = toRefs(props);

    watch(id, () => {
      productInfo.value.id = id.value;
      if (id.value) getProductInfo(id.value);
    });

    let isEdit = computed(() => productInfo.value.id !== 0);

    let volumn = computed(() =>
      calcVolumn({
        length: productInfo.value.length,
        width: productInfo.value.width,
        height: productInfo.value.height,
      })
    );

    //检查单号是否重复
    // async function checkExpressNoRepeat() {
    //   let { success: db_repeat } = await $get("order/checkExpressIsRepeat", {
    //     expressno: productInfo.value.expressno,
    //   });
    //   if (db_repeat) return true;
    // }

    //确定
    async function handleSaveModalInfo() {
      await formProduct.value.validate();

      let { success } = await $post("/order/addOrUpdateProduct", {
        orderId: props.orderId,
        ...productInfo.value,
      });

      if (success) {
        $ms(isEdit.value ? "货品修改成功！" : "货品添加成功！");
        emit("ok");
        emit("update:visible", false);
      } else {
        $me(isEdit.value ? "货品修改失败！" : "货品添加失败！");
      }
    }

    //获取详情
    async function getProductInfo(id) {
      let { data } = await $get("/order/productInfo", { id });
      productInfo.value = data;
    }

    function clearForm() {
      emit("close");
      formProduct.value.resetFields();
    }

    return {
      handleSaveModalInfo,
      productInfo,
      formProduct,
      isEdit,
      volumn,
      clearForm,
      add_prod_rule,
    };
  },
};
</script>

<style scoped lang='scss'>
</style>