import {
    PayState,
    BillState,
    DeliveryState
} from '~config'
export default {
    fmtGender: val => ['男', '女'][val],
    fmtDate: val => new Date(val).getFormatDate(),
    fmtPayStateColor: id => PayState.find(r => r.id == id).color,
    fmtPayState: id => PayState.find(r => r.id == id).name,
    fmtDeliveryStateColor: id => DeliveryState.find(r => r.id == id).color,
    fmtDeliveryState: id => DeliveryState.find(r => r.id == id).name,
    fmt2Fixed2Num: (n) => {
        n = parseFloat(n)
        n = n.toFixed(2)
        return parseFloat(n)
    }
}