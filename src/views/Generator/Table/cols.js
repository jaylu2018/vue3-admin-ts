import { $decorateCols } from "~mixins/useUtils";
import { removeCol, moveUp, moveDown, dataSource } from './service'
export default $decorateCols([
    {
        dataIndex: "index",
        title: "序号",
        customRender({ index }) {
            return index + 1;
        },
    },
    {
        dataIndex: "title",
        title: "列标题",
    },
    {
        dataIndex: "dataIndex",
        title: "对应字段",
    },
    {
        dataIndex: "width",
        title: "宽度",
        customRender({ text }) {
            return text || "自动";
        },
    },
    {
        dataIndex: "center",
        title: "是否居中",
        customRender({ text }) {
            return text + "";
        },
    },
    {
        dataIndex: "slots.customRender",
        title: "插槽名称",
        customRender({ text }) {
            return text || "无插槽";
        },
    },
    {
        title: "操作",
        key: "action",
        customRender({ index }) {
            return (
                <div>
                    <sb-btn
                        size="small"
                        disabled={index === 0}
                        onClick={() => moveUp(index)}
                        icon="ArrowUp"
                    ></sb-btn>
                    <a-divider type="vertical"></a-divider>
                    <sb-btn
                        size="small"
                        ghost
                        disabled={index === dataSource.value.length - 1}
                        onClick={() => moveDown(index)}
                        icon="ArrowDown"
                    ></sb-btn>
                    <a-divider type="vertical"></a-divider>
                    <sb-btn
                        size="small"
                        type='danger'
                        onClick={() => removeCol(index)}
                        icon="delete"
                    ></sb-btn>
                </div>
            );
        },
    },
]);
