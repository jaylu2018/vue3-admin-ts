import { createStore } from 'vuex'
/**
 * 自动导入所有模块
 */
let moduleFiles = require.context('./modules', true, /\.js$/)
let modules = moduleFiles.keys().reduce((modules, module_path) => {
    let module_name = module_path.replace(/\.\/(.+)\.js/, '$1')
    modules[module_name] = moduleFiles(module_path).default
    return modules
}, {})

const store = createStore({
    getters: {
        role: state => state.account.userInfo.role,
        nickname: state => state.account.userInfo.nickname,
        opendPages: state => state.system.opendPages,
        activedPage: state => state.system.activedPage,
    },
    modules
})

export default store