import { ref, computed, reactive } from 'vue'
import { $get, $post } from '~mixins/useRequest'
import { $mc, $ms } from '~mixins/useMsg'
// 用于表格ref的对象名
export let tb = ref(null)
export let modal_visible_fahuo = ref(false)

/**
 * 本页面查询所需的参数
 */
export let localParams = reactive({
    keywords: '',
    payState: [],
    deliveryState: null
})

/**
 * 获取数据，各页面基本按这个规则写就行
 * 数据必须返回如下格式，或者修改组件
 *      {
 *          data:{
                list:Array,
                total:number
            }
 *      }
 *  */
export function getList(params) {
    let query = Object.assign({}, localParams, params, {
        payState: localParams.payState.join()
    })
    return $get("/order/list", query);
}
// watch(deliveryState, getList)
// watch(current, getList)
export let unSelected = computed(() => !tb.value || tb.value.selectedRowKeys.length === 0)


export async function updatePayState(id, state) {
    await $mc("确定更新状态？");
    let { success } = await $post("/order/updatestate", { id, state });
    if (success) {
        $ms("状态修改成功!");
        tb.value.refresh();
    }
}

export async function export2Excel() {
    // let excel = await import("~vendor/Export2Excel")
    // const tHeader = ["单号", "寄件人", "寄件人号码", "收件人", "收件人号码", "件数", "总价格", "总重量", "下单时间", "其他费用"];
    // const keys = ["orderno", "sender", "s_tel", "receiver", "r_tel", "count", "price", "weight", "createtime", "othermoney"];
    // const data = tb.value.selectedRows.map((r) => {
    //     return keys.map((k) => {
    //         if (k === "count") return (r["prods"] || []).length;
    //         return r[k];
    //     });
    // });
    tb.value.selectedRowKeys = [];
    // excel.export_json_to_excel({
    //     header: tHeader,
    //     data,
    //     filename: "订单_" + $timeStamp2(),
    // });
}

export async function del(orderId) {
    await $mc("删除后将无法恢复，确定删除？");
    let { success } = await $post("/order/del", { orderId });
    if (success) {
        $ms("删除成功!");
        tb.value.refresh();
    }
}

// export async function fahuo() {
//     if (!this.selectedRowKeys || !this.selectedRowKeys.length) return this.$me("请选择订单再操作");
//     if (!this.plane_no || !this.plane_no.trim()) return this.$me("输入不能为空");
//     let { success } = await this.$post("/delivery/add", {
//         order_ids: this.selectedRowKeys,
//         plane_no: this.plane_no,
//     });
//     if (success) {
//         this.showFahuoModal = false;
//         this.$ms("发货成功!");
//         this.selectedRowKeys = [];
//         this.getList();
//     }
// }

export async function updateMultiState({ key: state }) {
    await $mc("确定更新状态？");
    let { success } = await this.$post("/order/updateMultiState", {
        state,
        ids: tb.value.selectedRowKeys.join(","),
    });
    if (success) {
        $ms("批量修改订单付款状态成功!");
        tb.value.refresh();
    }
}