<template>
  <a-button
    :type="type || 'primary'"
    :size="size"
    :ghost="ghost"
    :block="block"
  >
    <component #icon v-if="icon" :is="'i-' + (loading ? 'loading' : icon)" />
    <slot></slot>
  </a-button>
</template>
<script>
/**
    因为antd2中目前按钮组件只能用插槽的方式加图标(文档说可以写icon属性实测暂时不行)
    得这样写：
    <a-button  size="large" ghost type="primary">
        <SaveOutlined #icon/>保存
    </a-button
    所以自己写个小组件封一下，回头要是支持了还能全局替换回来
    因为常用，所以注册成全局组件，参数都保留，调用如下
    <sb-btn size="large" ghost type="primary" icon="save">保存</sb-btn>
*/
export default {
  props: ["type", "icon", "size", "ghost", "block", "loading"],
};
</script>
