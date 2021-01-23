export default [
    {
        path: '/',
        redirect: '/home',
        component: () => import("~Layout/BlankLayout"),
        meta: {
            title: "数据驾驶舱",
            icon: "home",
            sort: 1
        },
        children: [
            {
                path: "/home",
                meta: {
                    title: "工作平台",
                    icon: "i-desktop",
                    sort: 1,
                    fixedInBar: true
                },
                component: () => import("~views/Home")
            },

        ]
    },
    {
        path: '/login',
        meta: {
            title: "登录",
            hideInMenu: true,
        },
        component: () => import("~views/Login/index")
    },
    {
        path: '/:pathMatch(.*)*',
        meta: {
            hideInMenu: true,
        },
        component: () => import("~views/Error/PageNotFound")
    },
]