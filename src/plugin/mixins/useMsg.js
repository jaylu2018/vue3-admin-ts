import {
    notification,
    message,
    Modal
} from 'ant-design-vue';
import {
    createVNode
} from 'vue'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons-vue'

export function $msg(type, message, description) {
    return new Promise((resolve) => {
        notification[type]({
            message,
            onClose: () => resolve(),
            description,
            duration: 2,
        });
    })
}

export function $ms(message, description) {
    return $msg('success', message, description)
}

export function $mw(message, description) {
    return $msg('warning', message, description)
}

export function $me(message, description) {
    return $msg('error', message, description)
}

export function $ml(msg, delay = 1) {
    return message.loading(msg, delay)
}

export function $mc(content) {
    return new Promise((resolve) => {
        Modal.confirm({
            title: "系统提示",
            icon: createVNode(ExclamationCircleOutlined),
            content,
            onOk: () => resolve()
        });
    })
}
