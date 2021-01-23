<template>
  <div id="app" style="padding: 20px">
    <h1>查询条件较少就只使用部分插槽</h1>
    <SearchPanel>
      <template #line2-1> 条件1<input /> </template>
      <template #line2-2> 条件2<input /> </template>
      <template #line2-3>
        <sb-btn type="primary" ghost>查询</sb-btn>
      </template>
    </SearchPanel>
    <hr>
    <h1>直接展示全部</h1>
    <SearchPanel>
      <template #line1-left>
        <sb-btn type="primary">批量按钮1</sb-btn>
        <sb-btn type="primary" style="margin-left: 30px">批量按钮2</sb-btn>
        <sb-btn type="primary" style="margin-left: 30px">批量按钮3</sb-btn>
        <sb-btn type="primary" style="margin-left: 30px">批量按钮4</sb-btn>
      </template>
      <template #line1-right>
        <sb-btn type="primary" ghost>右侧按钮</sb-btn>
      </template>
      <template #line2-1> 条件1<input style="margin: 10px 0" /> </template>
      <template #line2-2> 条件2<input /> </template>
      <template #line2-3>条件2<input /> </template>
      <template #line3-1>较长的表单控件<a-date-picker /> </template>
      <template #line3-2>日期范围<a-date-picker /> </template>
    </SearchPanel>
    <hr />
    <h1>参数较多需要收起展开效果</h1>
    <SearchPanel show-line>
      <template #line1-left>1222</template>
      <template #line1-right>133</template>
      <template #line2-1>144</template>
      <template #line2-2>155</template>
      <template #line2-3>1666</template>
      <template #line3-1>1333</template>
      <template #line3-2>1222222</template>
    </SearchPanel>
  </div>
</template>
<script>
import { SearchPanel } from "~components";
export default {
  components: {
    SearchPanel,
  },
};
</script>