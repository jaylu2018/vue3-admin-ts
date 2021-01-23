# Simba-Admin-Vue
> 基于Vue3+ant-design-vue2，接入了i18n/quill/tui-markdown/xlsx等库
为方便业务开发，做了大量的封装
为方便过渡，在部分页面继续提供了Vue2的代码示例。

```
想搞钱，从使用yarn代替npm开始
yarn dev
```

# 有些坑，我一个人踩就够了。

1.以fmt开头的function都代表全局过滤器，Vue3中不支持全局过滤器，所以放到了methods中代替

使用了day.js优化了体积

2.setup中监听route的问题


#体验了pug
```
npm i -D pug-plain-loader pug
```

## 有个小规则
如果想访问public中的静态json等，可以在接口前面加个dev做区分，也就是如果访问后台接口是`/user/login`，本地则是`dev/test/data.json`