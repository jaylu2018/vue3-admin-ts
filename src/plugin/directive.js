// import { RoleType } from './config/enum'
import { $parseCuteTime } from '~mixins/useUtils'
const directives = {
    limit: (el, data) => {
        let str = el.innerText
        if (str.length > data.value) {
            el.innerText = str.substring(0, data.value) + "..."
        }
    },
    clickout: {
        mounted(el, binding) {
            el.__click__ = (e) => {
                //点击了dropdown外面，执行对应的操作
                if (!el.contains(e.target))
                    binding.value()
            }
            window.addEventListener('click', el.__click__)
        },
        unmounted(el) {
            window.removeEventListener('click', el.__click__)
            delete el.__click__
        }
    },
    has(el, data) {
        if (localStorage.getItem('login-type') !== RoleType.ADMIN) {
            el.style.display = 'none'
        }
    },
    time(el, data) {
        el.innerText = $parseCuteTime(data.value)
    }
}

export default (app) => {
    Object.keys(directives).forEach(key => {
        app.directive(key, directives[key])
    })
}