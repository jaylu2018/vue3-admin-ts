export default {
    path: '/form',
    redirect: "/Form/Quill",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "表单相关",
        role: ['example'],
        icon: "i-form",
        sort: 1
    },
    children: [
        {
            path: "/Form/Quill",
            meta: {
                title: "富文本编辑器",
                icon: "i-edit",
                sort: 1
            },
            component: () => import("~views/Form/Quill")
        },
        {
            path: "/Form/MarkDown",
            meta: {
                title: "MarkDown编辑器",
                icon: "i-edit",
                sort: 1
            },
            component: () => import("~views/Form/MarkDown")
        },
        {
            path: "/Form/Upload",
            meta: {
                title: "上传文件",
                icon: "i-upload",
                sort: 1
            },
            component: () => import("~views/Form/Upload")
        },
        {
            path: "/Form/Btn",
            meta: {
                title: "业务通用按钮",
                icon: "i-inbox",
                sort: 1
            },
            component: () => import("~views/Form/BussinessButton")
        },
        {
            path: "/Form/EditAField",
            meta: {
                title: "编辑字段",
                icon: "i-edit",
                sort: 1
            },
            component: () => import("~views/Form/EditAField")
        },
        {
            path: "/Form/EditASection",
            meta: {
                title: "编辑区域",
                icon: "i-form",
                sort: 1
            },
            component: () => import("~views/Form/EditASection")
        },
        
    ]
}