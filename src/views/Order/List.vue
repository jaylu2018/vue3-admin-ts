<template>
  <div>
    <!-- <a-modal v-model="modal_visible_fahuo" title="统一发货" @ok="fahuo">
      <div>
        发货批次号/航班号：
        <a-input
          style="width: 300px"
          v-model.trim="plane_no"
          placeholder="发货批次号/航班号"
        ></a-input>
      </div>
    </a-modal> -->
    <SearchPanel show-line>
      <template #line1-left>
        <a-dropdown :disabled="unSelected">
          <template #overlay>
            <a-menu @click="updateMultiState">
              <a-menu-item :key="i" v-for="(item, i) in PayState">
                {{ item.name }}
              </a-menu-item>
            </a-menu>
          </template>
          <sb-btn icon="swap" type="danger">
            批量更新付款状态
            <i-down />
          </sb-btn>
        </a-dropdown>

        <sb-btn
          icon="rise"
          type="primary"
          :disabled="unSelected"
          style="margin-left: 30px"
          @click="modal_visible_fahuo = true"
        >
          批量发货
        </sb-btn>

        <sb-btn
          icon="file-excel"
          ghost
          type="primary"
          :disabled="unSelected"
          style="margin-left: 30px"
          @click="export2Excel"
        >
          导出
        </sb-btn>
      </template>
      <template #line1-right>
        <sb-btn icon="search" type="primary" @click="() => tb.refresh()">
          搜索
        </sb-btn>
      </template>
      <template #line2-1>
        <a-form-item label="关键字">
          <a-input
            style="min-width: 250px"
            v-model:value="localParams.keywords"
            placeholder="订单号/国内单号/收件人"
          ></a-input>
        </a-form-item>
      </template>
      <template #line2-2>
        <a-form-item label="付款状态">
          <a-select
            mode="multiple"
            v-model:value="localParams.payState"
            placeholder="默认全部"
            style="max-width: 600px; min-width: 250px"
          >
            <a-select-option v-for="s in PayState" :key="s.id + ''">
              {{ s.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <template #line2-3>
        <a-form-item label="时间区间">
          <a-radio-group default-value="a">
            <a-radio-button value="a">本周内</a-radio-button>
            <a-radio-button value="b">本月内</a-radio-button>
            <a-radio-button value="d">90天内</a-radio-button>
            <a-radio-button value="d">今年</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </template>
      <template #line3-1>
        <a-form-item label="日期区间">
          <a-range-picker
            :ranges="{
              Today: [moment(), moment()],
              'This Month': [moment(), moment().endOf('month')],
            }"
            show-time
            format="YYYY/MM/DD HH:mm:ss"
          />
        </a-form-item>
      </template>
    </SearchPanel>
    <a-tabs
      @change="
        () => {
          tb.refresh();
        }
      "
      v-model:activeKey="localParams.deliveryState"
    >
      <a-tab-pane :key="null" tab="全部"></a-tab-pane>
      <a-tab-pane :key="0" tab="未发货"></a-tab-pane>
      <a-tab-pane :key="1" tab="已发货"></a-tab-pane>
    </a-tabs>
    <sb-table ref="tb" :cols="cols" :load="getList">
      <template #sender="{ text: sender, record: r }">
        <a-popover trigger="hover">
          <template #content>
            <div>姓名：{{ sender }}</div>
            <div>电话：{{ r.s_tel }}</div>
          </template>
          <div class="underline" style="font-size: 13px" v-limit="8">
            {{ sender }}
          </div>
        </a-popover>
      </template>
      <template #orderno="{ text: orderno, record: r }">
        <a-popover trigger="hover">
          <template #content>
            <div>国内单号:{{ r.cn_orderno_list }}</div>
          </template>
          <div class="underline flex a-c" style="font-size: 13px">
            <router-link :to="'/order/detail/' + r.id">
              {{ orderno }}
            </router-link>
            <copy :text="orderno" />
          </div>
        </a-popover>
      </template>
      <template #createtime="{ text }">
        <span v-time="text"></span>
      </template>
      <template #pay_state="{ text: state, record: r }">
        <a-popover trigger="hover">
          <template #content>
            <div>总价格：{{ r.price + r.othermoney }}</div>
            <div>快递价格：{{ r.price }}</div>
            <div>每公斤单价：{{ r.perprice }}</div>
            <div>其他费用：{{ r.othermoney }}</div>
          </template>
          <a-tag :color="fmtPayStateColor(state)">{{
            fmtPayState(state)
          }}</a-tag>
        </a-popover>
      </template>
      <template #delivery_state="{ text, record }">
        <a-tag :color="fmtDeliveryStateColor(text)">{{
          fmtDeliveryState(text)
        }}</a-tag>
      </template>
      <template #receiver="{ text: receiver, record: r }">
        <a-popover trigger="hover">
          <template #content>
            <div>姓名：{{ receiver }}</div>
            <div>电话：{{ r.r_tel }}</div>
            <div>地址：{{ r.address }}</div>
          </template>
          <div class="underline" style="font-size: 13px">{{ receiver }}</div>
        </a-popover>
      </template>
      <template #action="{ record: r }">
        <div>
          <a-dropdown>
            <a class="ant-dropdown-link"> <i-swap /></a>
            <template #overlay>
              <a-menu>
                <template v-for="item in PayState">
                  <a-menu-item
                    v-if="r.state !== item.id"
                    :key="item.id"
                    @click="updatePayState(r.id, item.id)"
                    >{{ item.name }}
                  </a-menu-item>
                </template>
              </a-menu>
            </template>
          </a-dropdown>
          <a-divider type="vertical"></a-divider>
          <i-delete class="un-suggestion" @click="del(r.id)" />
        </div>
      </template>
    </sb-table>
  </div>
</template>

<script>
import { PayState } from "~config";
import { SearchPanel, SbTable, Copy } from "~components";
import { $timeStamp2 } from "~mixins/useUtils";
import cols from "./service/index_order_cols";

import {
  getList,
  del,
  updatePayState,
  tb,
  export2Excel,
  unSelected,
  updateMultiState,
  localParams,
  modal_visible_fahuo,
} from "./service/list";
export default {
  name: "OrderList",
  components: { SearchPanel, SbTable, Copy },
  setup() {
    return {
      PayState,
      unSelected,
      getList,
      cols,
      del,
      updatePayState,
      tb,
      modal_visible_fahuo,
      export2Excel,
      localParams,
      updateMultiState,
    };
  },
};
</script>

<style scoped lang="scss"></style>
