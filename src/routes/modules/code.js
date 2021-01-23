export default {
    path: '/Generator',
    redirect: "/Generator/Form",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "代码生成器",
        role: ['example'],
        icon: "i-code",
    },
    children: [
        {
            path: "/Generator/Form",
            meta: {
                title: "表单设计",
                icon: "i-code",
                sort: 1
            },
            component: () => import("~views/Generator/Form")
        },
        {
            path: "/Generator/Table",
            meta: {
                title: "表格设计",
                icon: "i-code",
                sort: 1
            },
            component: () => import("~views/Generator/Table")
        },
        {
            path: "/Generator/Poster",
            meta: {
                title: "海报生成",
                icon: "i-code",
                sort: 1
            },
            component: () => import("~views/Generator/Poster")
        },
    ]
}