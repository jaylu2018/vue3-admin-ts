export default {
    path: '/sys',
    redirect: "/sys/updatepwd",
    meta: {
        title: "系统管理",
        sort: 5,
        icon: "i-setting"
    },
    component: () => import("~Layout/BaseLayout"),
    children: [
        {
            path: '/sys/priceconfig',
            meta: {
                title: "价格配置",
                icon: "i-setting",
                sort: 1,
                hideInMenu:true,
            },
            component: () => import("~views/System/UpdatePassword")
        }, 
        {
            path: '/sys/updatepwd',
            meta: {
                title: "修改密码",
                icon: "i-lock",
                sort: 2
            },
            component: () => import("~views/System/UpdatePassword")
        }
    ]
}