<template>
  <draggable
    tag="ul"
    v-model="data"
    class="drag-group"
    :group="group"
    :item-key="itemKey"
  >
    <template #header v-if="title">
      <li class="group-header">{{ title }}</li>
    </template>
    <template #item="{ element: el, index }">
      <li class="item">
        <slot name="item" :el="el" :index="index"></slot>
      </li>
    </template>
  </draggable>
</template>
<script>
// 约定大于配置，你可以自行调整标签和class
import draggable from "vuedraggable";
export default {
  name: "dg",
  emits: ["update:modelValue"],
  props: {
    title: {
      type: String,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    group: {
      type: String,
      default: "group",
    },
    itemKey: {
      type: String,
      default: "id",
    },
    tag: {
      type: String,
      default: "ul",
    },
  },
  data() {
    return {
      data: this.modelValue,
    };
  },
  watch: {
    data() {
      this.$emit("update:modelValue", this.data);
    },
    modelValue() {
      this.data = this.modelValue;
    },
  },
  components: {
    draggable,
  },
};
</script>