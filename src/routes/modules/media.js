export default {
    path: '/media',
    redirect: "/media/copy",
    component: () => import("~Layout/BaseLayout"),
    meta: {
        title: "多媒体相关",
        icon: "i-play-circle",
        sort: 1
    },
    children: [
        // {
        //     path: "/Media/Player",
        //     meta: {
        //         title: "播放视频",
        //         icon: "i-play-circle",
        //         sort: 1
        //     },
        //     component: () => import("~views/Media/Player")
        // },
        {
            path: "/Media/ToggleImage",
            meta: {
                title: "切换单张图",
                icon: "i-swap",
                sort: 1
            },
            component: () => import("~views/Media/ToggleImageDemo")
        },
        {
            path: "/Media/PreviewFullImage",
            meta: {
                title: "查看大图",
                icon: "i-fileImage",
                sort: 1
            },
            component: () => import("~views/Media/PreviewFullImage")
        },
        
        {
            path: "/Media/SignBoard",
            meta: {
                title: "签名板",
                icon: "i-highlight",
                sort: 1
            },
            component: () => import("~views/Media/SignBoard")
        },
        {
            path: "/Media/Capture",
            meta: {
                title: "生成截图",
                icon: "i-scissor",
                sort: 1
            },
            component: () => import("~views/Media/Capture")
        },
    ]
}