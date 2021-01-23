export default {
    title: [
        {
            required: true,
            message: "请输入标题",
            trigger: "blur",
        },
    ],
    dataIndex: [
        {
            required: true,
            message: "请输入dataIndex",
            trigger: "blur",
        },
    ],
    width: [
        {
            pattern: /^\d*$/,
            message: "请输入正数",
            trigger: "blur",
        },
    ]
}