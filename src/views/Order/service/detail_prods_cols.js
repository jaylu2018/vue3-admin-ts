import { $decorateCols } from '~mixins/useUtils'
/**
 * 详情页所需要的货品表格的列
 */
export default $decorateCols([
    {
        title: "货品编号",
        key: "expressno",
        slots: { customRender: "zdh" },
        width: 180,
    },
    {
        title: "国内单号",
        dataIndex: "express_no",
        key: "express_no",
    },
    {
        title: "货品名称",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "尺寸(长*宽*高)CM",
        key: "Size",
        slots: { customRender: "Size" },
    },
    {
        title: "体积重(KG)",
        key: "Volumn",
        slots: { customRender: "Volumn" },
    },
    {
        title: "重量(KG)",
        dataIndex: "weight",
        key: "weight",
    },

    {
        title: "操作",
        dataIndex: "action",
        key: "action",
        slots: { customRender: "action" },
    },
])