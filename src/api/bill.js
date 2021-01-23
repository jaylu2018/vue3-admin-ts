import { $get } from '~mixins/useRequest'

export function getBillInfo(id) {
    return $get('/bill/info', { id })
}