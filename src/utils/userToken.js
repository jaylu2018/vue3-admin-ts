import { TOKEN_KEY } from '~config'
import { getCookie, setCookie, removeCookie } from '~mixins/useCookie'

export let getToken = () => getCookie(TOKEN_KEY)
export let setToken = (val, expires) => setCookie(TOKEN_KEY, val, expires)
export let removeToken = () => removeCookie(TOKEN_KEY)