<template>
  <div>
    <a-modal
      title="添加货品"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :afterClose="clearForm"
    >
      <a-form-model
        ref="prods_form"
        :model="form_prods"
        :rules="prod_rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="国内单号" prop="expressno">
          <a-input v-model="form_prods.expressno" placeholder="请输入国内单号" />
        </a-form-model-item>
        <a-form-model-item label="货品名称" prop="name">
          <a-input v-model="form_prods.name" placeholder="请输入货品名称" />
        </a-form-model-item>
        <a-form-model-item label="货品重量(KG)" prop="weight">
          <a-input-number v-model="form_prods.weight" :min="0.1" :max="1000" placeholder="重量" />
        </a-form-model-item>
        <a-form-model-item label="长*宽*高(cm)">
          <a-row :gutter="80">
            <a-col :span="7">
              <a-form-model-item prop="c">
                <a-input-number v-model="form_prods.c" :min="1" :max="1000" placeholder="长度" />
              </a-form-model-item>
            </a-col>
            <a-col :span="7">
              <a-form-model-item prop="k">
                <a-input-number v-model="form_prods.k" :min="1" :max="1000" placeholder="宽度" />
              </a-form-model-item>
            </a-col>
            <a-col :span="7">
              <a-form-model-item prop="g">
                <a-input-number v-model="form_prods.g" :min="1" :max="1000" placeholder="高度" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item label="体积重(KG)">
          <h3>{{tjz}}</h3>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-form-model
      ref="main_form"
      :model="main_form"
      :rules="main_rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row :gutter="30">
        <a-col :span="14">
          <a-row>
            <a-col :span="4">
              <sb-btn icon="save" v-admin @click="saveOrder" type="primary">保存订单</sb-btn>
            </a-col>
            <a-col :span="10" :offset="2">
              <a-form-item style="margin:0" label="下单时间">
                <a-date-picker
                  inputReadOnly
                  v-model="createtime"
                  format="YYYY-MM-DD HH:mm:ss"
                  :show-time="{ defaultValue: moment(new Date().getFormatTime(), 'HH:mm:ss') }"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider orientation="left">{{$t("label.jbxx")}}</a-divider>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="寄件人" prop="sender">
                <a-input v-model="main_form.sender" placeholder="请输入寄件人姓名" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="寄件人电话" prop="s_tel">
                <a-input v-model="main_form.s_tel" placeholder="请输入寄件人电话" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="收件人" prop="receiver">
                <a-input v-model="main_form.receiver" placeholder="请输入收件人姓名">
                  <a-icon
                    style="cursor:pointer;"
                    @click="drawer_visible=true"
                    slot="suffix"
                    type="file-search"
                  />
                </a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="收件人电话" prop="r_tel">
                <a-input v-model="main_form.r_tel" placeholder="请输入收件人电话" />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-form-model-item
            label="收件地址"
            prop="address"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input type="textarea" :rows="3" v-model="main_form.address" placeholder="请输入收件地址" />
          </a-form-model-item>

          <a-divider orientation="left">价格信息</a-divider>
          <a-row>
            <a-col :span="8">
              <a-form-model-item
                label="订单价格"
                prop="price"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 10 }"
              >
                <a-input-number v-model.number="main_form.price" :min="0" placeholder="订单价格" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item
                label="其他费用"
                prop="othermoney"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 10 }"
              >
                <a-input-number
                  v-model.number="main_form.othermoney"
                  :min="0"
                  :max="100000"
                  placeholder="其他费用"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item
                label="每公斤单价"
                prop="perprice"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 10 }"
              >
                <a-input-number
                  v-model="main_form.perprice"
                  :min="0"
                  :max="100000"
                  placeholder="单价"
                />
              </a-form-model-item>
            </a-col>

            <a-col :span="24">
              <a-form-model-item label="备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
                <a-input type="textarea" :rows="3" v-model="main_form.remark" placeholder="请输入备注" />
              </a-form-model-item>
            </a-col>
            <a-col :span="24">
              <a-form-model-item label="国内单号" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
                <a-input type="textarea" :rows="3" v-model="main_form.cn_orderno_list" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="10">
          <sb-btn
            style="margin:16px 0"
            icon="plus-square"
            type="primary"
            @click="visible=true"
          >添加货品</sb-btn>
          <a-table :columns="columns" :data-source="prods" rowKey="expressno" :pagination="false">
            <span slot="id" slot-scope="text,r,i">{{i+1}}</span>
            <span slot="tjz" slot-scope="text,r">
              <a-popover trigger="hover">
                <span style="text-decoration:underline">{{text}}</span>
                <template slot="content">
                  长宽高：{{r.c}}cm&nbsp;*
                  {{r.k}}cm&nbsp;*
                  {{r.g}}cm&nbsp;
                </template>
              </a-popover>
            </span>
            <span slot="action" slot-scope="text, record,i">
              <a-icon type="delete" style="color:red" @click="prods.splice(i,1)" />
            </span>
          </a-table>

          <a-card title="重量统计" style="margin-top: 30px">
            <a-row>
              <a-col :span="8">
                <a-statistic title="总重量(KG)" :value="weight" style="margin-right: 50px" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="总体积重(KG)" :value="ztjz" style="margin-right: 50px" />
              </a-col>
              <a-col :span="8">
                <a-statistic title="计费重量(KG)" :value="zjfzl" style="margin-right: 50px" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-form-model>

    <a-drawer
      title="客户列表"
      placement="left"
      :closable="false"
      :visible="drawer_visible"
      @close="drawer_visible=false"
    >
      <a-list
        class="demo-loadmore-list"
        :loading="loading"
        item-layout="horizontal"
        :data-source="cus_data"
      >
        <div
          v-if="showLoadingMore"
          slot="loadMore"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-spin v-if="loadingMore" />
          <sb-btn v-else @click="getCustomerList">loading more</sb-btn>
        </div>
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a slot="actions">
            <a-icon @click="setRecevier(item)" type="arrow-right" />
          </a>
          <a-list-item-meta :description="item.tel">
            <a slot="title" href="https://www.antdv.com/">{{ item.realname }}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>
import moment from "moment";
import add_order_rule from "./service/add_order_rule";
import add_prod_rule from "./service/add_prod_rule";
import { getWholeWeight } from "~utils";

const columns = [
  {
    title: "编号",
    key: "id",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "重量(KG)",
    dataIndex: "weight",
    key: "weight",
  },
  {
    title: "体积重(KG)",
    dataIndex: "tjz",
    key: "tjz",
    scopedSlots: { customRender: "tjz" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

columns.forEach((r) => {
  r.align = "center";
});
export default {
  methods: {
    async getPerPrice() {
      let { data } = await this.$get("/sys/getprice");
      this.main_form.perprice = data.price;
    },
    async getCustomerList() {
      this.loadingMore = true;
      let { data } = await this.$get("/cus/list", {
        pageIndex: this.cus_page_current++,
        pageSize: 10,
        // keywords: this.keywords,
      });
      //没有更多数据了
      if (!data || !data.list || !data.list.length) {
        this.$mw("没有更多数据了");
        this.showLoadingMore = false;
        this.loading = false;
        return;
      }
      //拿旧的数组和新的结果进行拼接
      this.cus_data = this.cus_data.concat(data.list);
      this.loadingMore = false;
      this.$nextTick(() => {
        window.dispatchEvent(new Event("resize"));
      });
    },
    setRecevier(item) {
      this.main_form.receiver = item.realname;
      this.main_form.r_tel = item.tel;
      this.main_form.address = item.address;
      this.drawer_visible = false;
    },
    clearForm() {
      this.$refs.prods_form.resetFields();
    },
    moment,
    saveOrder() {
      this.$refs.main_form.validate(async (valid) => {
        if (valid) {
          if (!this.prods || !this.prods.length)
            return this.$mw("请添加货品！");

          this.main_form.prods = this.prods;
          this.main_form.type = this.isHeDan ? 1 : 0; //是否合单
          this.main_form.state = 1;
          this.main_form.createtime = this.createtime.format(
            "YYYY-MM-DD hh:mm:ss"
          );
          this.main_form.wxid = "admin";
          this.main_form.tjz = this.ztjz;
          this.main_form.weight = this.weight;
          this.main_form.jfzl = this.zjfzl;

          let { success } = await this.$post("/order/add", this.main_form);
          if (success) {
            this.$ms("添加成功");
            this.$refs.main_form.resetFields();
            this.prods = [];
          }
        }
      });
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      this.$refs.prods_form.validate(async (valid) => {
        if (valid) {
          if (this.prods.some((r) => r.expressno === this.form_prods.expressno))
            return this.$me("请核查该单号是否重复！");

          let { success: isRepeat } = await this.$get(
            "order/checkExpressRepeat",
            {
              expressno: this.form_prods.expressno,
            }
          );

          if (isRepeat) return this.$me("请核查该单号是否重复！");

          this.form_prods.tjz = this.tjz;
          this.form_prods.ckg = [
            this.form_prods.c,
            this.form_prods.k,
            this.form_prods.g,
          ].join("*");
          this.prods.push(JSON.parse(JSON.stringify(this.form_prods)));
          this.visible = false;
        }
      });
    },
  },
  watch: {
    zjfzl(val) {
      this.main_form.price = this.main_form.perprice * this.zjfzl;
    },
    "main_form.perprice"(val) {
      this.main_form.price = this.main_form.perprice * this.zjfzl;
    },
    prods(val) {
      this.main_form.cn_orderno_list = val.map((r) => r.expressno).join(",");
    },
    drawer_visible(val) {
      if (val) {
        this.getCustomerList();
      } else {
        this.cus_data = [];
        this.cus_page_current = 1;
      }
    },
  },
  computed: {
    weight() {
      return this.$getFixed2Num(
        this.prods.reduce(
          (r, item) => (r += this.$getFixed2Num(item.weight)),
          0
        )
      );
    },
    ztjz() {
      return this.$getFixed2Num(
        this.prods.reduce((r, item) => (r += parseFloat(item.tjz)), 0)
      );
    },
    zjfzl() {
      return getWholeWeight(Math.max(this.weight, this.ztjz));
    },
    tjz() {
      return this.$getFixed2Num(
        (this.form_prods.c * this.form_prods.k * this.form_prods.g) / 6000
      );
    },
  },
  data() {
    return {
      cus_page_current: 1,
      cus_data: [],
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
      drawer_visible: false,
      visible: false,
      prods: [],
      createtime: moment(new Date()),
      columns,
      isHeDan: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form_prods: {
        expressno: "",
        name: "",
        c: "",
        k: "",
        g: "",
        weight: "",
      },
      main_rules: add_order_rule,
      main_form: {
        perprice: 0,
        price: 0,
        receiver: "",
        r_tel: "",
        address: "",
        sender:"",
        s_tel:""
      },
      prod_rules: add_prod_rule,
    };
  },
  created() {
    this.getPerPrice();
  },
};
</script>

<style scoped lang='scss'>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 300px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  height: 300px;
  text-align: center;
}
</style>