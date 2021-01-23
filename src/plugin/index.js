import registerMixins from './mixins'
import registerDirectives from './directive'
import registerComponents from './component'
import registerIcons from './icon'
import lazyLoadAntd from './lazyLoadAntd'

export default {
    //注意顺序不能乱，因为组件中可能依赖了指令或混入或antd组件
    install(app, options = {}) {
        /**
         * 自定义打印方法，可控，只在开发环境打印
         */
        console.fakeLog = function () {
            // if (process.env.NODE_ENV === 'development') {
            Array.prototype.unshift.call(arguments, 'simba:')
            console.log.apply(this, arguments)
            // }
        }
        //按需加载所有Antd的组件
        lazyLoadAntd(app)
        //注册全局混入
        registerMixins(app, options)
        //注册所有图标
        registerIcons(app)
        //注册全局指令
        registerDirectives(app)
        //注册全局组件
        registerComponents(app)

        if (!options.silent) {
            console.fakeLog('SIMBA-PLUGIN加载成功');
        }
    }
}