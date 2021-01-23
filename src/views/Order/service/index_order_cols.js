import { $decorateCols } from '~mixins/useUtils'

export default $decorateCols([
    {
        dataIndex: "orderno",
        key: "orderno",
        title: "订单号",
        width: 180,
        slots: { customRender: "orderno" },
    },
    {
        title: "寄件人",
        dataIndex: "sender",
        width: 120,
        key: "sender",
        slots: { customRender: "sender" },
    },
    {
        title: "收件人",
        dataIndex: "receiver",
        key: "receiver",
        width: 200,
        ellipsis: true,
        slots: { customRender: "receiver" },
    },
    {
        dataIndex: "pay_state",
        title: "付款状态",
        key: "pay_state",
        slots: { customRender: "pay_state" },
    },
    {
        dataIndex: "delivery_state",
        title: "物流状态",
        key: "delivery_state",
        slots: { customRender: "delivery_state" },
    },
    {
        dataIndex: "createtime",
        title: "下单时间",
        key: "createtime",
        slots: { customRender: "createtime" },
    },
    {
        title: "操作",
        key: "action",
        slots: { customRender: "action" },
        width: 200,
    },
])