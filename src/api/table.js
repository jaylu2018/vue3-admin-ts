import { $get } from '~mixins/useRequest'

export function getDynamicTable() {
    return $get('/mock/getdynamictable')
}