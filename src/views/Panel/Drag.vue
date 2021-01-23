<template>
  <div>
    <a-row :gutter='50'>
      <a-col :span="6">
        <Draggable title="分组一" v-model="group1">
          <template #item="{ el, index }">
            {{ el.name }}
          </template>
        </Draggable>
      </a-col>
      <a-col :span="6">
        <Draggable v-model="group2" title="分组二">
          <template #item="{ el, index }">
            {{ el.name }}
          </template>
        </Draggable>
      </a-col>
      <a-col :span="6">
        <h1>group1:</h1>
        <HighLightData :data="group1" />
      </a-col>
      <a-col :span="6">
        <h1>group2:</h1>
        <HighLightData :data="group2" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Draggable, HighLightData } from "~components";
export default {
  data() {
    return {
      group2: [
        {
          id: 12,
          name: "张国富",
        },
        {
          id: 13,
          name: "张有才",
        },
      ],
      group1: [
        {
          id: 1,
          name: "Simba",
        },
        {
          id: 2,
          name: "Ace",
        },
        {
          id: 3,
          name: "Roger",
        },
        {
          id: 4,
          name: "Zoro",
        },
      ],
    };
  },
  components: {
    HighLightData,
    Draggable,
  },
};
</script>
<style scoped  lang='scss'>
.drag-group {
  min-height: 50px;
  width: 200px;
  text-align: center;
  border: 1px #ccc solid;
  background: #fefefe;
  &::v-deep(.group-header) {
    background: orangered;
    color: #fff;
    padding: 15px;
    font-weight: bold;
  }
  /* outline: 1px dashed; */
  &::v-deep(li.item) {
    padding: 10px 0;
    cursor: pointer;
    box-shadow: 0 1px 1px #eee;
    &:hover {
      background: rgb(236, 230, 230);
    }
  }
}
</style>