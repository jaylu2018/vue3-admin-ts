import router from '@/routes'
export default {
    namespaced: true,
    state: {
        collapsed: false,
        opendPages: [],
        activedPage: undefined
    },
    mutations: {
        TOGGLE_COLLAPSED(state) {
            state.collapsed = !state.collapsed
        },
        initFixedPages(state, page) {
            let { path, meta: { title = '无标题', fixedInBar }, } = page
            let p = state.opendPages.find(r => r.path === page.path)
            if (!p) state.opendPages.unshift({ path, title, fixedInBar })
        },
        addOpendPages(state, page) {
            let { path, meta: { title = '无标题', fixedInBar }, } = page
            let p = state.opendPages.find(r => r.path === path)
            if (!p) state.opendPages.push({ path, title, fixedInBar })
            state.activedPage = path
        },
        removeOpendPages(state, path) {
            //删除当前页
            let index = state.opendPages.findIndex(r => r.path == path)
            state.opendPages.splice(index, 1)
            if (state.activedPage === path) {
                //跳转到上一页
                state.activedPage = state.opendPages[index - 1].path
                router.push(state.activedPage)
            }
        },
        clearOpendPages(state) {
            console.fakeLog('已清空tagsview中的pages');
            state.opendPages = []
            state.activedPage = undefined
        },
        activatePage(state, path) {
            state.activedPage = path
            router.push(path)
        }
    }
}



