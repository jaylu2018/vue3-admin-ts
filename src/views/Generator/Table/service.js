import { $mc, $ms } from "~mixins/useMsg";
import cloneDeep from "loadsh/cloneDeep";
import { $get } from "~mixins/useRequest";
import { ref, computed } from "vue";
import { parseStr2Base64 } from "~utils";


let col_info_form = ref(null);
let colInfo = ref({
    dataIndex: "",
    title: "",
    width: "",
    center: true,
    slots: {
        customRender: "",
    },
});
//用于在上面表格的列数组，
export let dataSource = ref([]);
let str = ref(``);
let visible = ref(false);

//用于json展示和下载vue的列数组，根据dataSource算出来
let displayData = computed(() => {
    return dataSource.value.map(r => {
        //用于展示和下载的列数组
        let displayDataCol = {
            dataIndex: r.dataIndex,
            title: r.title,
            key: r.dataIndex
        }
        if (r.slots && r.slots.customRender)
            displayDataCol.slots = r.slots
        if (r.width)
            displayDataCol.width = parseInt(r.width)
        if (r.center)
            displayDataCol.align = 'center'
        return displayDataCol
    })
});

export let removeCol = async (i) => {
    await $mc("确定删除此列？");
    dataSource.value.splice(i, 1);
    $ms("删除成功！");
};

let saveField = async () => {
    await col_info_form.value.validate()
    //防止地址引用，所以要深克隆
    let newCol = cloneDeep(colInfo.value);
    //加入数组
    dataSource.value.push(newCol);
    //清空表单
    colInfo.value = {
        dataIndex: "",
        title: "",
        width: "",
        center: true,
        slots: {
            customRender: "",
        },
    };
    col_info_form.value.resetFields();
    visible.value = false;
};

async function downLoad() {
    let a = document.createElement("a");
    a.download = "SimbaTable.vue";
    let template = await $get('dev/template/table.html')
    template = template.trim().replace('$$cols$$', JSON.stringify(dataSource.value, null, 6))
    a.href = parseStr2Base64(template);
    a.type = "text/plain";
    a.click();
}


export function moveUp(i) {
    //让当前列和上一个换位置
    let prev = dataSource.value[i - 1]
    dataSource.value[i - 1] = dataSource.value[i]
    dataSource.value[i] = prev
}

export function moveDown(i) {
    //让当前列和上一个换位置
    let next = dataSource.value[i + 1]
    dataSource.value[i + 1] = dataSource.value[i]
    dataSource.value[i] = next
}


dataSource.value.push({
    dataIndex: "id",
    title: "编号",
    center: true,
})

export default {
    col_info_form,
    colInfo,
    dataSource,
    str,
    visible,
    saveField,
    downLoad,
    displayData
}