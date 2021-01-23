export default {
    path: '/table',
    redirect: '/table/dynamic',
    meta: {
        title: "表格相关",
        sort: 4,
        icon: "i-table",
    },
    component: () => import("~Layout/BaseLayout"),
    children: [
        {
            path: '/table/xxx',
            meta: {
                title: "员工管理",
                icon: "i-team",
                hideInMenu: true
            },
            component: () => import("~views/Employee/Index")
        },
        {
            path: '/table/dynamic',
            meta: {
                title: "动态表格",
                icon: "i-table",
            },
            component: () => import("~views/Table/Dynamic")
        }
    ]
}