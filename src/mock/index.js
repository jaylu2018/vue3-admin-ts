import Mock from 'mockjs'
import './dynamicTable'
Mock.mock(/\/mock\/getWaterFullData/, {
    'data|20': [{
        "src": "@dataImage",
        "href": "https://www.baidu.com",
        "info": "一些图片描述文字"
    }]
})

// Mock.mock(/\/account\/login/, { "success": true, "data": "T7AwYDOLqOTtiTZRbHpeow==" })
// Mock.mock(/\/account\/getUserInfo/, { "success": true, "data": { "nickname": "辛巴", "role": "admin" } })
