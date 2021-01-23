import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import i18n from './locale'
import 'nprogress/nprogress.css'
import 'animate.css/animate.css'
import 'ant-design-vue/dist/antd.css';
import './simba.scss'
import plugin from '~plugin'
import './mock'
let app = createApp(App)
app.config.devtools = false
app.config.performance = true//浏览器性能跟踪
//这可以代替 Vue 2.x Vue.prototype
app.config.globalProperties.$simba = {}
app.use(i18n)
app.use(router)
app.use(store)
app.use(plugin, {
    silent: process.env.NODE_ENV !== 'development'
})
app.mount('#app')