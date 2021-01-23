import * as msg from './useMsg'
import * as request from './useRequest'
import * as utils from './useUtils'
import filters from './useFilter'
import moment from 'moment'
export default function (app) {
    app.mixin({
        methods: {
            ...msg,
            ...request,
            ...utils,
            ...filters,
        },
        data() {
            return {
                moment,
            }
        },
    })
}