<template>
  <div v-show="false">
    <div id="print_order" class="container-print">
      <div v-for="(item, i) in prods">
        <div
          style="border: 1px solid #000; height: 98%; width: 99%; padding: 10px"
        >
          <h2 class="title">NO. {{ info.orderno }}-{{ i + 1 }}</h2>
          <div class="flex">
            <div class="label">CAN-LLW</div>
            <div class="val">{{ i + 1 }}/{{ prods.length }}</div>
          </div>
          <div class="flex">
            <div class="label">WEIGHT</div>
            <div class="val">{{ item.weight }}KG</div>
          </div>
          <div class="flex">
            <div class="label">VOLOUM</div>
            <div class="val">({{ item.ckg }}) {{ item.tjz }}m3</div>
          </div>
          <div class="flex">
            <div class="label">NATURE</div>
            <div class="val">{{ item.name }}</div>
          </div>
          <h1 class="title">NO. {{ info.orderno }}</h1>
          <div class="flex">
            <div class="label">SENDER</div>
            <div class="val">{{ info.sender }}</div>
          </div>
          <div class="flex">
            <div class="label">NUMBER</div>
            <div class="val">{{ info.s_tel }}</div>
          </div>
          <div class="flex">
            <div class="label">RECEIVER</div>
            <div class="val" style="font-size: 20px">{{ info.receiver }}</div>
          </div>
          <div class="flex">
            <div class="label">NUMBER</div>
            <div class="val" style="font-size: 22px">{{ info.r_tel }}</div>
          </div>
          <div class="flex">
            <div class="label">ADDRESS</div>
            <div class="val">{{ info.address }}</div>
          </div>
          <div
            style="padding: 5px 0; height: 2px; background: #000; width: 100%"
          ></div>
          <div class="flex j-s a-c">
            <div class="flex a-c">
              <div class="label">TOTAL WEIGHT</div>
              <div class="val">{{ info.weight }}KG</div>
            </div>
            <div class="flex a-c">
              <div class="label">TOTAL PIECES</div>
              <div class="val">{{ prods.length }}</div>
            </div>
          </div>
          <div class="flex">
            <div class="label">TOTAL VOLOUM</div>
            <div class="val">{{ info.tjz }}</div>
          </div>
          <div class="flex">
            <div class="label">TOTAL CHARGABLE WEIGHT:</div>
            <div class="val">{{ info.jfzl }}KG</div>
          </div>
          <div class="flex">
            <div class="label">PAY MARK</div>
            <div class="val">{{ info.remark }}</div>
          </div>
          <h2 class="title">NO. {{ info.orderno }}-{{ i + 1 }}</h2>
          <div>SIGNATURE</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useOrderDetailService from "../service/detail";
export default {
  props: ["id", "info"],
  setup(props) {
    let { getOrderProds } = useOrderDetailService(props.id);
    let prods = ref([]);
    onMounted(async () => {
      let {
        data: { list },
      } = await getOrderProds();
      prods.value = list;
    });

    return { prods };
  },
};
</script>

<style scoped lang='scss'>
.container-print {
  & > div {
    width: 100vw;
    height: 100vh;
    border: 1px solid #333;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin: 6px 0;
  }

  & > div {
    padding: 3px 10px;
    align-items: center;
  }

  .label {
    min-width: 60px;
    display: flex;
    align-items: center;
    &::after {
      content: ":";
      display: block;
      height: 100%;
      text-indent: 5px;
    }
  }

  .val {
    font-weight: bold;
    text-align: center;
    padding: 8px 10px;
    margin: 0 10px;
    /* border-bottom: 1px solid #000; */
  }
}
</style>