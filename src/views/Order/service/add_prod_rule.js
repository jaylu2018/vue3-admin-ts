export default {
    express_no: [
        {
            required: true,
            message: "请输入国内单号",
            trigger: "blur",
        },
    ],
    name: [
        {
            required: true,
            message: "请输入货品名称",
            trigger: "blur",
        },
    ],
    weight: [
        {
            required: true,
            message: "请输入重量",
            trigger: "blur",
            type: 'number'
        },
    ],
    c: [
        {
            required: true,
            message: " ",
            trigger: "blur",
            type: 'number'
        },
    ],
    k: [
        {
            required: true,
            message: " ",
            trigger: "blur",
            type: 'number'
        },
    ],
    g: [
        {
            required: true,
            message: " ",
            trigger: "blur",
            type: 'number'
        },
    ],
}