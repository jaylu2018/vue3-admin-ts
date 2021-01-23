export default {
    path: '/Chart',
    redirect: "/Chart/City",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "图表相关",
        icon: "i-bar-chart",
    },
    children: [
        {
            path: "/Chart/City",
            meta: {
                title: "某城市数据",
                icon: "i-fund",
                sort: 1
            },
            component: () => import("~views/Chart/City")
        },
        {
            path: "/Chart/Socket",
            meta: {
                title: "Socket联动",
                icon: "i-line-chart",
                sort: 1
            },
            component: () => import("~views/Chart/Socket")
        },
    ]
}