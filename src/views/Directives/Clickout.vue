<template>
  <div>
    <div v-clickout='log' class="demo flex j-c a-c">点击我外面都会触发</div>
  </div>
</template>

<script>
export default {
    methods: {
        log(){
            this.$ms('点击了外面')
        }
    },
};
</script>

<style scoped lang='scss'>
.demo {
  width: 300px;
  height: 200px;
  border: teal 1px solid;
}
</style>