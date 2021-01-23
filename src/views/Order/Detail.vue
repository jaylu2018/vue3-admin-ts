<template>
  <div class="container">
    <a-row type="flex">
      <a-col :flex="1">
        <h1 class="title1 danger">NO.{{ info.orderno }}</h1>
      </a-col>
      <a-col>
        <sb-btn icon="printer" v-print="'#print_order'" type="primary"
          >{{ $t("btn.print") }}
        </sb-btn>
      </a-col>
    </a-row>
    <a-row :gutter="30" style="margin-top: 20px">
      <a-col :span="20">
        <a-descriptions :column="3" :title="$t('label.jbxx')">
          <a-descriptions-item :label="$t('label.sender')">
            <EditableField
              k="sender"
              @save="updateOrderField"
              :v="info.sender"
            />
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.s_tel')">
            <EditableField k="s_tel" @save="updateOrderField" :v="info.s_tel" />
          </a-descriptions-item>

          <a-descriptions-item :label="$t('label.ordertime')">
            <span v-time="info.createtime"></span>
          </a-descriptions-item>

          <a-descriptions-item :label="$t('label.receiver')">
            <EditableField
              k="receiver"
              @save="updateOrderField"
              :v="info.receiver"
            />
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.r_tel')">
            <EditableField k="r_tel" @save="updateOrderField" :v="info.r_tel" />
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.address')">
            <EditableField
              k="address"
              @save="updateOrderField"
              :v="info.address"
            />
          </a-descriptions-item>

          <a-descriptions-item :span="3" :label="$t('label.gndh')">
            {{ cn_orderno_list }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.remark')">
            <EditableField
              k="remark"
              w="500px"
              @save="updateOrderField"
              :v="info.remark || '无'"
            />
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions
          :column="3"
          :title="$t('label.jgxx')"
          style="margin-top: 20px"
        >
          <a-descriptions-item :label="$t('label.zzl')">
            {{ fmt2Fixed2Num(totalWeight) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.ztjz')">
            {{ fmt2Fixed2Num(totalVolumn) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.jfzl')">
            {{ fmt2Fixed2Num(feeWeight) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.mgjdj')">
            <EditableField
              k="perprice"
              @save="updateOrderField"
              :v="info.perprice"
            />
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.ddjg')">
            {{ fmt2Fixed2Num(orderPrice) }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('label.qtfy')">
            <EditableField
              k="othermoney"
              @save="updateOrderField"
              :v="info.othermoney"
            />
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="4">
        <a-descriptions
          :column="1"
          :title="$t('label.hpzp')"
          style="margin-top: 20px"
        ></a-descriptions>

        <ToggleImage
          :action="VUE_APP_UPLOAD_URL_ORDER"
          :largeImgSize="['800px', '500px']"
          :src="avatarSrc"
          @change-img="updateOrderAvatar"
        />
      </a-col>
    </a-row>

    <TitleAndBtn>
      <template #title>
        {{ $t("label.productList") }}
      </template>
      <template #btn>
        <sb-btn
          ghost
          icon="plus-square"
          @click="modal_visible_addProd = true"
          >{{ $t("btn.addprod") }}</sb-btn
        >
      </template>
    </TitleAndBtn>

    <sb-table
      :show-checkbox="false"
      ref="tb"
      :cols="cols"
      :load="getOrderProds"
      :pagination="false"
    >
      <template #zdh="{  record, index }">
        <span>{{ info.orderno }} - {{ index + 1 }}</span>
      </template>
      <template #Size="{ text, record, index }">
        <span
          >{{ record.length }} * {{ record.width }} * {{ record.height }}</span
        >
      </template>
      <template #Volumn="{ text, record: { width, length, height } }">
        {{ calcVolumn({ width, length, height }) }}
      </template>
      <template #action="{ text, record: r, index: i }">
        <div>
          <i-edit @click="showEditProductModal(r.id, i)" />
          <a-divider type="vertical" />
          <i-delete class="un-suggestion" @click="removeProd(r.id, i)" />
        </div>
      </template>
    </sb-table>
    <AddProductModal
      :order-id="id"
      @close="() => (currentEditProdId = 0)"
      :id="currentEditProdId"
      v-model:visible="modal_visible_addProd"
      @ok="() => tb.refresh()"
    />
    <PrintView :id="id" :info="info" />
  </div>
</template>
<script>
import print from "~vendor/print/index";
import { getStaticPath, calcVolumn } from "~utils";
import { EditableField, SbTable, ToggleImage, TitleAndBtn } from "~components";
import { onMounted, ref, computed } from "vue";
import PrintView from "./modules/PrintView";
import { VUE_APP_UPLOAD_URL_ORDER } from "~config";
import AddProductModal from "./modules/AddProductModal";
import useOrderDetailService from "./service/detail";
import cols from "./service/detail_prods_cols";
export default {
  props: ["id"],
  components: {
    EditableField,
    PrintView,
    AddProductModal,
    SbTable,
    ToggleImage,
    TitleAndBtn,
  },
  directives: {
    print,
  },
  setup(props) {
    let service = useOrderDetailService(props.id);
    let { getOrderDetail } = service;
    onMounted(async () => {
      getOrderDetail();
    });

    return {
      ...service,
      cols,
      VUE_APP_UPLOAD_URL_ORDER,
      getStaticPath,
      calcVolumn,
    };
  },
};
</script>

<style scoped lang="scss"></style>
