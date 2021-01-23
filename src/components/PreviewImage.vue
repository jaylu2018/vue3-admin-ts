<template>
  <div class="shadow flex a-c j-c" v-if="show" @click="closeShadow">
    <img
      :src="src"
      @click="$event.stopPropagation()"
      :style="{ width: w, height: h }"
    />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    w: {
      type: String,
    },
    h: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:show"],
  setup(props, { emit }) {
    onMounted(() => {
      window.addEventListener("keydown", escCloseFull);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", escCloseFull);
    });

    //ESC
    function escCloseFull(e) {
      if (e.keyCode === 27) closeShadow();
    }

    function closeShadow() {
      emit("update:show", false);
    }

    return { closeShadow };
  },
};
</script>

<style scoped lang='scss'>
.shadow {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.9);
  img {
    max-width: 95%;
    max-height: 95%;
    border-radius: 5px;
  }
}
</style>