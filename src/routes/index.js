import { createRouter, createWebHashHistory } from 'vue-router'
import constantRoutes from './constantRoutes'
import nprogress from 'nprogress'
import store from '~store'
import { getToken } from '~utils/userToken'
import { $me } from '~mixins/useMsg'
import { WHITE_LIST, GLOBAL_TITLE } from '~config'
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }

//处理meta为空的情况
export function repairMeta(routes) {
    routes.forEach(r => {
        if (!r.meta) r.meta = { sort: 9999 }
        if (!r.meta.sort) r.meta.sort = 9999
        if (r.children && r.children.length) repairMeta(r.children)
    })
}

repairMeta(constantRoutes);

const createMyRouter = () => createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createMyRouter()

router.beforeEach(async (to, from) => {
    // nprogress.start()
    if (to.meta && to.meta.title)
        document.title = [GLOBAL_TITLE, to.meta.title].join(' - ')
    //没登录
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') return router.push('/')
        else {
            //判断是否有获取过路由数组
            if (store.getters.role) return true
            else {
                try {
                    //获取用户身份
                    await store.dispatch('account/getUserInfo')
                    const myRoutes = await store.dispatch('account/generateRoutes')
                    myRoutes.forEach(r => router.addRoute(r))
                    return to.fullPath
                } catch (error) {
                    $me(error.message || error);
                    store.dispatch('account/logOut')
                    return router.push('/login')
                }
            }
        }
    } else {
        if (!WHITE_LIST.includes(to.path))
            return router.push('/login')
        else
            return true
    }
})

router.afterEach((to) => {
    if (to.path !== '/login')
        store.commit('system/addOpendPages', to)
    nprogress.done()
})


export default router