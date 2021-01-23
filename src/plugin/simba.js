console.log(`%c
███████╗██╗███╗   ███╗██████╗  █████╗        █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔════╝██║████╗ ████║██╔══██╗██╔══██╗      ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
███████╗██║██╔████╔██║██████╔╝███████║█████╗███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
╚════██║██║██║╚██╔╝██║██╔══██╗██╔══██║╚════╝██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
███████║██║██║ ╚═╝ ██║██████╔╝██║  ██║      ██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
╚══════╝╚═╝╚═╝     ╚═╝╚═════╝ ╚═╝  ╚═╝      ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝@2020`,'color:#006699');

/**
 * 将a=2&b=3转换成{a:2,b:3}
 * @param {*} str 
 * @param {*} splitCode 
 */
export function parseQs2Obj(str, splitCode) {
    if (!str) return
    return str.split(splitCode).reduce((res, curr) => {
        var [key, val] = curr.split('=')
        res[key] = val
        return res
    }, {})
}

/**
 * 将{a:2,b:3}转换成a=2&b=3
 * @param {*} obj 
 */
export function parseObj2Qs(obj) {
    if (!obj) return ''
    return Object.keys(obj).map(key => [key, obj[key]].join('=')).join('&')
}
