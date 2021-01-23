<template>
  <a-drawer
    title="客户列表"
    placement="left"
    :closable="false"
    :visible="visible"
    @close="$emit('update:visible', false)"
  >
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      item-layout="horizontal"
      :data-source="cus_data"
    >
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      >
        <a-spin v-if="loadingMore" />
        <sb-btn v-else @click="getCustomerList">加载更多</sb-btn>
      </div>
      <a-list-item #renderItem="{item, index}">
        <!-- <a #actions>
          <ArrowRightOutlined @click="setCus(item)" />
        </a> -->
        <a-list-item-meta :description="item.tel">
          <a slot="title" href="https://www.antdv.com/">{{ item.realname }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-drawer>
</template>

<script>
export default {
  props: ["visible"],
  data() {
    return {
      loading: false,
      loadingMore: false,
      showLoadingMore: true,
      cus_data: [],
      cus_page_current: 1,
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.getCustomerList();
        } else {
          this.cus_data = [];
          this.cus_page_current = 1;
        }
      },
    },
  },
  methods: {
    setCus(item) {
      this.$emit("select", item);
      this.$emit("update:visible", false);
    },
    async getCustomerList() {
      this.loadingMore = true;
      let { data } = await this.$get("/cus/list", {
        pageIndex: this.cus_page_current++,
        pageSize: 10,
        type: "bill",
      });
      //没有更多数据了
      if (!data || !data.list || !data.list.length) {
        this.$mw("没有更多数据了");
        this.showLoadingMore = false;
        this.loading = false;
        return;
      }
      //拿旧的数组和新的结果进行拼接
      this.cus_data = this.cus_data.concat(data.list);
      this.loadingMore = false;
      this.$nextTick(() => {
        window.dispatchEvent(new Event("resize"));
      });
    },
  },
};
</script>

<style scoped lang='scss'>
</style>