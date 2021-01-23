/**
 * 发货状态数组
 */
export const DeliveryState = [{
    id: '0',
    name: "待发货",
    color: "orange"
},
{
    id: '1',
    name: "已发货",
    color: "green"
}]

/**
 * 付款状态数组
 */
export const PayState = [{
    id: '0',
    name: "待付款",
    color: "red"
},
{
    id: '1',
    name: "已付款",
    color: "#0099CC"
},
{
    id: '2',
    name: "已取消",
    color: "#ccc"
}]

/**
 * 账单状态数组
 */
export const BillState = [{
    id: 0,
    name: "新订单",
    color: "red"
},
{
    id: 1,
    name: "打款",
    color: "blue"
},
{
    id: 2,
    name: "采购",
    color: "green"
},
{
    id: 3,
    name: "核对",
    color: "purple"
},
{
    id: 4,
    name: "完成",
    color: "#069"
},
]

/**
 * 免登录的白名单
 */
export const WHITE_LIST = ['/login']

/**
 * 角色类型
 */
export const RoleType = {
    GUEST: '0',
    ADMIN: '1'
}

/**
 * 暂无图片的占位图片路径
 */
export const NO_IMG_PATH = "/noimg.jpg"

/**
 * 后台API地址
 */
export const AJAX_BASE_URL = process.env.VUE_APP_AJAX_BASE_URL

/**
 * Socket地址
 */
export const SOCKET_URL = process.env.VUE_APP_SOCKET_URL

/**
 * AJAX超时时间
 */
export const AJAX_TIMEOUT = process.env.VUE_APP_AJAX_TIMEOUT || 5000

/**
 * 静态资源路径
 */
export const STATIC_URL = process.env.VUE_APP_STATIC_URL

/**
 * 文件上传路径
 */
export const UPLOAD_URL = process.env.VUE_APP_UPLOAD_URL

/**
 * 上传订单图片的路径（根据业务需要自行配置）
 */
export const VUE_APP_UPLOAD_URL_ORDER =  process.env.VUE_APP_UPLOAD_URL_ORDER

/**
 * 全局网站标题
 */
export const GLOBAL_TITLE = process.env.VUE_APP_GLOBAL_TITLE

/**
 * 版权企业名称
 */
export const COMPANY_NAME = process.env.VUE_APP_COMPANY_NAME

/**
 * 图片上传的限制大小(MB),默认10MB
 */
export const LIMIT_UPLOAD_SIZE = process.env.VUE_APP_LIMIT_UPLOAD_SIZE || 10

/**
 * 登录时存TOKEN的KEY
 */
export const TOKEN_KEY = 'LOGIN-USER-TOKEN'