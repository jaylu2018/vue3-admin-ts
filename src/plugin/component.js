let components = require.context('./components', true, /\.vue$/)
// import upperFirst from 'lodash/upperFirst'
import kebabCase from 'lodash/kebabCase'

export default function (app) {
    components.keys().forEach((fileName) => {
        // 获取和目录深度无关的文件名
        const componentName = kebabCase(fileName.split('/').pop().replace(/(.+)\.vue$/, '$1'))
        app.component('sb-' + componentName, components(fileName).default)
    })
}