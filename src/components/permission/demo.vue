<template>
  <div>
    <permission role="admin">
      <button>删除</button>
    </permission>

    <permission role="guest">
      <button>编辑</button>
    </permission>

    <button v-has='admin'>查看</button>
  </div>
</template>

<script>
import permission from "./index";
export default {};
</script>

<style scoped lang='scss'>
</style>