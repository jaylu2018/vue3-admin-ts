<template>
  <div>
    <h1>这是一个ul列表</h1>
    <ul>
      <li v-for="item in list" style="padding:20px">
        {{ item }}
        <sb-btn @click="$copy(item)" size="small" icon="copy">copy</sb-btn>
      </li>
    </ul>
    <textarea style="width:300px" placeholder="粘贴到这来试试"> </textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ["AJ", "Simba", "Ace"],
    };
  },
};
</script>

<style scoped lang='scss'>
</style>