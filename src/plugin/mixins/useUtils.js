import Clipboard from 'clipboard'
import md5 from 'js-md5'
import { $ms, $me } from './useMsg'
/**
 * 一键拷贝
 * @param {*} text 
 */
export function $copy(text) {
    const clipboard = new Clipboard(document.body, {
        text: () => text
    })
    clipboard.on('success', () => {
        $ms('复制成功!')
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        $me('复制失败!')
        clipboard.destroy()
    })
}

/**
 * 加密方法可以自行调整规则
 */
export function $encrypt(str) {
    return md5(str)
}

export function $repairZero(num) {
    num = num + ''
    return num[1] ? num : ('0' + num)
}

function $parseTime(val, callback) {
    let d = new Date(val)
    let yy = d.getFullYear()
    let mm = $repairZero(d.getMonth() + 1)
    let dd = $repairZero(d.getDate())
    let hh = $repairZero(d.getHours())
    let mi = $repairZero(d.getMinutes())
    let ss = $repairZero(d.getSeconds())
    let yymmdd = [yy, mm, dd].join('/')
    let hhmiss = [hh, mi, ss].join(':')
    let weekday = `星期${'日一二三四五六'[d.getDay()]}`
    let ms = d.getTime()
    return callback({
        yymmdd, hhmiss, weekday, ms
    })
}
export function $parseCuteTime(d) {
    var now = new Date();
    var that = new Date(d);
    var sec = (now - that) / 1000
    if (sec < 60) return '刚刚'
    else if (sec < 60 * 60) return Math.floor(sec / 60) + "分钟前"
    else if (sec < 60 * 60 * 24) return Math.floor(sec / 60 / 60) + "小时前"
    return $parseDateTime(d)
}

export function $parseDateTime(date) {
    return $parseTime(date, ({ yymmdd, hhmiss }) => [yymmdd, hhmiss].join(' '))
}

export function $parseYMD(date) {
    return $parseTime(date, ({ yymmdd }) => yymmdd)
}

export function $parseHMS(date) {
    return $parseTime(date, ({ hhmiss }) => hhmiss)
}

export function $getNumberText(now) {
    var yy = now.getFullYear()
    var mm = $repairZero(now.getMonth() + 1)
    var dd = $repairZero(now.getDate())
    var hh = $repairZero(now.getHours())
    var mi = $repairZero(now.getMinutes())
    var ss = $repairZero(now.getSeconds())
    return [yy, mm, dd, hh, mi, ss].join('')
}

/**
 * 修饰表格的列
 * @param {*} cols 
 */
export function $decorateCols(cols) {
    cols.forEach(r => {
        r.align = "center"
        r.ellipsis = true
    })

    return cols
}

/**
 * 返回时间戳
 */
export function $timeStamp() {
    return +new Date
}

/**
 * 返回202011002201这种
 */
export function $timeStamp2() {
    return $getNumberText(new Date())
}

/**
* 将user_name修改改成驼峰userName
*/
export function $camelCase(name) {
    return name.charAt(0).toLowerCase() + name.slice(1).replace(/_(\w)/g, (m, n) => {
        return n.toUpperCase();
    })
}

export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}