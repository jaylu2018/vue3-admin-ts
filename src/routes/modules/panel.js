export default {
    path: "/panel",
    redirect: "/panel/SearchPanel",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "面板相关",
        role: ['example'],
        icon: "i-table",
        sort: 1
    },
    children: [
        {
            path: "/panel/SearchPanelDemo",
            meta: {
                title: "查询条件",
                icon: "i-search",
                sort: 1
            },
            component: () => import("~views/Panel/SearchPanelDemo")
        },
        {
            path: "/panel/Tip",
            meta: {
                title: "模块标题",
                icon: "i-copy",
                sort: 1
            },
            component: () => import("~views/Panel/Tip")
        },
        {
            path: "/panel/LabelAndBtn",
            meta: {
                title: "标题/按钮",
                icon: "i-copy",
                sort: 1
            },
            component: () => import("~views/Panel/LabelAndBtn")
        },
        {
            path: '/panel/Drag',
            meta: {
                title: "拖拽面板",
                icon: "i-block",
                sort: 1,
            },
            component: () => import("~views/Panel/Drag")
        },
        {
            path: '/panel/UpOrDown',
            meta: {
                title: "列表上移/下移",
                icon: "i-VerticalAlignMiddle",
                sort: 1,
            },
            component: () => import("~views/Panel/UpOrDown")
        },
        {
            path: '/panel/waterfall',
            meta: {
                title: "瀑布流",
                icon: "i-project",
                sort: 1,
            },
            component: () => import("~views/Panel/WaterFall")
        },
    ]
}