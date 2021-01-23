export default {
    path: "/zhal",
    redirect: '/order/list',
    component: () => import('~Layout/BaseLayout'),
    meta: {
        title: "综合案例",
        sort: 999,
        icon: "i-dropbox",
        role: ["admin", 'order']
    },
    children: [
        {
            path: '/order/add',
            meta: {
                title: "添加订单",
                icon: "i-edit",
                sort: 1,
                hideInMenu: true
            },
            component: () => import("~views/Order/Add")
        },
        {
            path: '/order/detail/:id',
            props: true,
            meta: {
                title: "订单详情",
                hideInMenu: true
            },
            component: () => import("~views/Order/Detail")
        },
        {
            path: '/cus/list',
            meta: {
                title: "客户管理",
                icon: "i-user"
            },
            component: () => import("~views/Customer/List")
        },
        {
            path: '/order/list',
            meta: {
                title: "订单管理",
                icon: "i-ordered-list"
            },
            component: () => import("~views/Order/List")
        },
        {
            path: '/zhal/addPerson',
            meta: {
                title: "录入家庭成员",
                icon: "i-edit",
                sort: 1,
            },
            component: () => import("~views/Examples/AddPerson")
        },
        
    ]
}