<template>
  <h1>
    <a-row>
      <a-col :span="3">
        <count-to :endVal="9898" :duration="3000"></count-to>
      </a-col>
      <!-- <a-col :span="3">
        <count-to :endVal="800" :duration="3000"></count-to>
      </a-col>
      <a-col :span="3">
        <count-to :endVal="1999" :duration="3000"></count-to>
      </a-col> -->
    </a-row>
  </h1>
</template>

<script>
import { CountTo } from "~components";
export default {
  components: { CountTo },
};
</script>

<style></style>
