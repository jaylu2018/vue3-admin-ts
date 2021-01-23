import {
    ref,
    computed
} from "vue";

import { calcVolumn, getStaticPath } from "~utils";
import {
    $mc,
    $ms
} from "~mixins/useMsg";
import {
    $get,
    $post
} from '~mixins/useRequest'

export default (orderId) => {

    let info = ref({});
    // 用于表格ref的对象名
    let tb = ref(null)
    let modal_visible_addProd = ref(false)
    let currentEditProdId = ref(0)

    let cn_orderno_list = computed(() => {
        if (tb.value)
            return tb.value.tableData.map(r => r.express_no).join("，")
        return '暂无'
    })

    let totalWeight = computed(() => {
        if (tb.value)
            return tb.value.tableData.reduce((res, item) => (res += item.weight), 0)
        return 0
    })

    let totalVolumn = computed(() => {
        if (tb.value)
            return tb.value.tableData.reduce((res, { width, height, length }) => {
                return res += calcVolumn({ width, height, length })
            }, 0)
        return 0
    })

    let feeWeight = computed(() => {
        return Math.max(totalVolumn.value, totalWeight.value)
    })

    let orderPrice = computed(() => {
        return (info.value.perprice || 0) * feeWeight.value
    })

    let avatarSrc = computed(() =>
        info.value.avatar ? getStaticPath(info.value.avatar) : ""
    );

    async function getOrderDetail() {
        let { data } = await $get("/order/detail", {
            orderId
        })

        info.value = data
    }

    async function getOrderProds(params) {
        return $get("/order/getOrderProds", {
            orderId,
            ...params
        })
    }

    async function removeProd(id) {
        await $mc("确定删除此货品？");
        let {
            success
        } = await $post('/order/removeProduct', { id });
        if (success) {
            $ms("货品删除成功!");
            tb.value.refresh();
        }
    }

    async function updateOrderField({
        key,
        val
    }) {
        let {
            success
        } = await $post("/order/updateOrderField", {
            key,
            val,
            id: orderId
        });
        if (success) {
            $ms("修改成功!");
            getOrderDetail();
        }
    }

    function updateOrderAvatar(path) {
        return updateOrderField({ key: 'avatar', val: path })
    }

    function showEditProductModal(id) {
        currentEditProdId.value = id
        modal_visible_addProd.value = true
    }

    return {
        removeProd,
        totalWeight,
        updateOrderField,
        getOrderProds,
        showEditProductModal,
        getOrderDetail,
        tb,
        info,
        modal_visible_addProd,
        updateOrderAvatar,
        avatarSrc,
        currentEditProdId,
        cn_orderno_list,
        feeWeight,
        totalVolumn,
        orderPrice
    }

}
