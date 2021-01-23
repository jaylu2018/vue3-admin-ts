import axios from 'axios'
import NProgress from 'nprogress'
import { getToken } from '~utils/userToken';
import { parseObj2Qs } from '~simbajs'
import { notification } from 'ant-design-vue'
import { AJAX_BASE_URL, AJAX_TIMEOUT } from '~config'
var instance = axios.create({
    baseURL: AJAX_BASE_URL,
    timeout: AJAX_TIMEOUT
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {

    let token = getToken()
    if (token)
        config.headers.common['token'] = token;
    NProgress.start()
    let { method, url, params, data } = config
    //说明是访问网站内的public文件夹
    if (url.startsWith('dev'))
        config.url = location.origin + url.replace('dev', '')
    // 在发送请求之前打印日志
    params = params || data
    let str = params && Object.keys(params).length ? decodeURIComponent(parseObj2Qs(params)) : ""
    console.fakeLog(`${method}请求了${url}${str ? ',参数为' + str : ''}`);
    return config;
}, function ({ message }) {
    NProgress.done()
    notification.error({
        message
    })
    return Promise.reject(message);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    NProgress.done()
    console.fakeLog('响应为', response.data);
    return response;
}, function ({ message }) {
    NProgress.done()
    notification.error({
        message
    })
    return Promise.reject(message);
});

export const $get = async (url, params) => {
    let { data } = await instance.get(url, { params })
    return data
}
export const $post = async (url, params) => {
    let { data } = await instance.post(url, params)
    return data
}