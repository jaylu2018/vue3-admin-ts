export default {
    path: '/Map',
    redirect: "/Map/Tencent",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "地图相关",
        icon: "i-code-sandbox",
        sort: 1
    },
    children: [
        {
            path: "/Map/Tencent",
            meta: {
                title: "腾讯地图",
                icon: "i-qq",
                sort: 1
            },
            component: () => import("~views/Map/Tencent")
        },
        {
            path: "/Map/Baidu",
            meta: {
                title: "百度地图",
                icon: "i-Frown",
                sort: 1
            },
            component: () => import("~views/Map/Baidu")
        },
    ]
}