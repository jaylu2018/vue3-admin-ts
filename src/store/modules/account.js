import { $post } from '~mixins/useRequest'
import { getToken, removeToken, setToken } from '~utils/userToken';
import asyncRoutes from '~routes/asyncRoutes'
import constantRoutes from '~routes/constantRoutes'
import router, { repairMeta } from '~routes'
function filterRoutes(routes, role) {
    let res = []
    routes.forEach(r => {
        let temp = { ...r }
        if (!temp.meta.role || temp.meta.role.includes(role)) {
            if (temp.children) temp.children = filterRoutes(r.children, role)
            res.push(temp)
        }
    })
    return res
}

function sortRoutes(routes) {
    repairMeta(routes)
    routes.sort((a, b) => {
        return a.meta.sort - b.meta.sort
    })
    routes.forEach(r => {
        r.children && r.children.length && sortRoutes(r.children)
    })
}

export default {
    namespaced: true,
    state: {
        token: getToken(),
        userInfo: {},
        routes: []
    },
    mutations: {
        SET_TOKEN(state, val) {
            state.token = val
        },
        SET_USERINFO(state, val) {
            state.userInfo = val
        },
        SET_ROUTES(state, val) {
            let allRoutes = constantRoutes.concat(val)
            sortRoutes(allRoutes);
            state.routes = allRoutes
        },
        LOG_OUT(state) {
            state.userInfo = {}
            state.token = ''
            state.routes = []
            removeToken()
            router.push('/login', { replace: true })
        }
    },
    actions: {
        async generateRoutes({ commit, state: { userInfo: { role } } }) {
            let routes = [...asyncRoutes]
            if (role !== 'admin')
                routes = filterRoutes(routes, role)
            commit('SET_ROUTES', routes)
            return routes
        },
        getUserInfo({ commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let { data, data: { nickname, role } } = await $post('/account/getUserInfo')
                    if (nickname && role) {
                        commit('SET_USERINFO', data)
                        return resolve()
                    }
                    reject('用户信息不正确,请重新登录！')
                } catch (error) {
                    reject('用户信息不正确,请重新登录！')
                }

            })
        },
        async login({ commit }, loginModel) {
            let { success, data: token } = await $post('/account/login', loginModel)
            if (success) {
                setToken(token, loginModel.remember ? 1 : null);
                commit('SET_TOKEN', token)
            }
            return success
        },
        logOut({ commit }) {
            commit('LOG_OUT')
            commit('system/clearOpendPages', '', { root: true })
        }
    }
}