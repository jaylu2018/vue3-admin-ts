<template>
  <div>
    <div
      ref="tagsView"
      class="tags-view flex a-c flex-nowrap"
      v-if="opendPages.length"
    >
      <template v-for="page in opendPages">
        <a-tag
          @click="open(page.path)"
          :color="page.path === activedPage ? 'cyan' : ''"
          :closable="!page.fixedInBar"
          @close="closePage(page.path)"
        >
          {{ page.title }}
        </a-tag>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      fixedPages: [],
      count: 10,
    };
  },
  // watch: {
  //   opendPages() {

  //   },
  // },
  computed: {
    ...mapGetters(["opendPages", "activedPage"]),
  },
  methods: {
    open(path) {
      this.activedPage(path);
      let { tagsView } = this.$refs;
      tagsView.scrollLeft = tagsView.offsetWidth;
      console.log(tagsView.scrollLeft);
    },
    ...mapMutations("system", [
      "activatePage",
      "removeOpendPages",
      "initFixedPages",
    ]),
    closePage(path) {
      this.removeOpendPages(path);
    },
    getFixedPages(routes) {
      routes.forEach((r) => {
        if (r.meta.fixedInBar) this.fixedPages.push(r);
        if (r.children) this.getFixedPages(r.children);
      });
    },
    scrollTags(e) {
      let tv = this.$refs.tagsView;
      if (e.wheelDelta < 0) {
        tv.scrollLeft += 20;
      } else {
        tv.scrollLeft -= 20;
      }
      console.log(tv.scrollLeft);
    },
  },
  created() {
    //默认将固定页签给加入到tagsview
    this.getFixedPages(this.$router.options.routes);
    this.fixedPages.forEach((page) => {
      this.initFixedPages(page);
    });
  },
  mounted() {
    let { tagsView } = this.$refs;
    if (tagsView) tagsView.addEventListener("mousewheel", this.scrollTags);
  },
  beforeUnmount() {
    let { tagsView } = this.$refs;
    if (tagsView && tagsView.removeEventLisener)
      tagsView.removeEventLisener("mousewheel", this.scrollTags);
  },
};
</script>

<style scoped lang='scss'>
.tags-view {
  background: #fff;
  box-shadow: 0 2px 5px #ccc;
  border-top: 1px solid #eee;
  height: 30px;
  box-sizing: content-box;
  padding: 5px 10px;
  &:hover {
    overflow-x: scroll;
  }
  overflow-y: hidden;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #dfe1e2;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #f7f7f7;
  }
}
</style>