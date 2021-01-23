export default {
    path: "/Text",
    redirect: "/Text/CountTo",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "文本相关",
        icon: "i-file-image",
        sort: 1
    },
    children: [
        {
            path: "/Text/AnimateCount",
            meta: {
                title: "数字滚动",
                icon: "i-edit",
                sort: 1
            },
            component: () => import("~views/Text/AnimateCount")
        },
        {
            path: "/Text/Copy2ClipBoard",
            meta: {
                title: "复制粘贴",
                icon: "i-copy",
                sort: 1
            },
            component: () => import("~views/Text/Copy2ClipBoard")
        },
    ]
}