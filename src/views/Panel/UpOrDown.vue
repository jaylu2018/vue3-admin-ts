<template>
  <transition-group name="flip-list" tag="ul" style="width: 500px">
    <li v-for="(item, index) in data" :key="item.id" class="item flex j-s a-c">
      <div class="flex a-c">
        <a-avatar :size="48" src="/images/avatar.jpg"></a-avatar>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="desc">明年能买野马吗？</div>
        </div>
      </div>
      <div>
        <a @click="moveUp(index)" v-if="index > 0"><i-ArrowUp />上移</a>
        <SplitLine />
        <a @click="moveDown(index)" v-if="index < data.length - 1">
          <i-ArrowDown />下移
        </a>
        <SplitLine />
        <a @click="data.splice(index, 1)"> <i-delete />删除 </a>
      </div>
    </li>
  </transition-group>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    let data = ref([]);

    function moveUp(i) {
      //让当前列和上一个换位置
      let prev = data.value[i - 1];
      data.value[i - 1] = data.value[i];
      data.value[i] = prev;
    }

    function moveDown(i) {
      //让当前列和上一个换位置
      let next = data.value[i + 1];
      data.value[i + 1] = data.value[i];
      data.value[i] = next;
    }

    onMounted(() => {
      data.value = Array.from({ length: 5 }).map((r, i) => ({
        id: i + 1,
        title: "User - " + (i + 1),
      }));
    });
    return { data, moveDown, moveUp };
  },
};
</script>
<style lang='scss' scoped>
.flip-list-move {
  transition: transform 0.8s ease;
}

.flip-list-enter-active {
  transition: 0.3s ease;
}

.flip-list-leave-active {
  transition: 0.5s ease;
}

.flip-list-enter,
.flip-list-leave-to{
  transform: translateX(10px);
  opacity: 0;
}

.item {
  padding: 10px 0;
  .info {
    padding-left: 10px;
    .desc {
      font-size: 14px;
      color: #ccc;
    }
    .title {
      font : {
        weight: bold;
        size: 18px;
      }
    }
  }
}
</style>
