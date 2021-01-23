<template>
  <div class="sb-search-panel">
    <div class="flex a-c j-s">
      <div>
        <slot name="line1-left"></slot>
      </div>
      <div>
        <slot name="line1-right"></slot>
      </div>
    </div>
    <div style="margin: 10px 0">
      <a-row type="flex" align="middle">
        <a-col :span="8">
          <slot name="line2-1"></slot>
        </a-col>
        <a-col :span="8">
          <slot name="line2-2"></slot>
        </a-col>
        <a-col :span="8">
          <slot name="line2-3"></slot>
        </a-col>
      </a-row>
      <a-row v-show="showLine2" type="flex" align="middle">
        <a-col :span="12">
          <slot name="line3-1"></slot>
        </a-col>
        <a-col :span="12">
          <slot name="line3-2"></slot>
        </a-col>
      </a-row>
    </div>
    <a-divider class="showmore" v-if="showLine">
      <div @click="collapsed = !collapsed">
        <component :is="collapsed ? 'i-down-circle' : 'i-up-circle'" />
        {{ collapsed ? "查看全部选项" : "回到常用选项" }}
      </div>
    </a-divider>
  </div>
</template>
<script>
import { ref, toRef, computed } from "vue";
export default {
  props: {
    showLine: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let collapsed = ref(true);
    let showLine2 = computed(
      () => !props.showLine || (props.showLine && !collapsed.value)
    );
    return { collapsed, showLine2 };
  },
};
</script>

<style scoped lang='scss'>
.sb-search-panel {
  .showmore {
    color: #bbb;
    cursor: pointer;
    user-select: none;
  }

  &::v-deep(.ant-form-item) {
    margin-bottom: 5px;
  }
  &::v-deep(.ant-divider-horizontal.ant-divider-with-text-center) {
    margin-bottom: 0px;
  }
}
</style>