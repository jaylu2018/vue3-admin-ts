export default {
    path: '/Flow/Add',
    redirect: "/Flow/Add",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "工作流",
        role: ['example'],
        icon: "i-partition",
    },
    children: [
        {
            path: "/Flow/Add",
            meta: {
                title: "工作流设计",
                icon: "i-partition",
                sort: 1
            },
            component: () => import("~views/Flow/Add")
        },
        {
            path: "/Flow/List",
            meta: {
                title: "流程列表",
                icon: "i-partition",
                sort: 1
            },
            component: () => import("~views/Flow/List")
        },
    ]
}