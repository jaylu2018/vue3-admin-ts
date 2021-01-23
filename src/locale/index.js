import cn from './lang/cn'
import en from './lang/en'
//https://github.com/intlify/vue-i18n-next
import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    locale: 'cn',
    fallbackLocale: 'cn',
    messages: {
        cn, en
    },
    silentTranslationWarn: true
})

export default i18n