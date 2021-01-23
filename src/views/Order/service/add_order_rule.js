export default {
    sender: [
        {
            required: true,
            message: "请输入寄件人",
            trigger: "blur",
        },
        
    ],
    receiver: [
        {
            required: true,
            message: "请输入收件人",
            trigger: "change",
        },
    ],
    s_tel: [
        {
            required: true,
            message: "请输入寄件人电话",
            trigger: "blur",
        },
    ],
    r_tel: [
        {
            required: true,
            message: "请输入收件人电话",
            trigger: "blur",
        },
    ],
    address: [
        {
            required: true,
            message: "请输入地址",
            trigger: "blur",
        },
    ],
    price: [
        {
            required: true,
            message: "请输入价格",
            trigger: "blur",
        },
    ]
}