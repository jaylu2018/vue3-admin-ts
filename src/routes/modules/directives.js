export default {
    path: '/Directives',
    redirect: "/Directives/Clickout",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "自定义指令",
        icon: "i-bar-chart",
    },
    children: [
        {
            path: "/Directives/Clickout",
            meta: {
                title: "v-clickout",
                icon: "i-fund",
                sort: 1
            },
            component: () => import("~views/Directives/Clickout")
        },
        {
            path: "/Directives/CuteTime",
            meta: {
                title: "v-cutetime",
                icon: "i-line-chart",
                sort: 1
            },
            component: () => import("~views/Directives/CuteTime")
        },
    ]
}