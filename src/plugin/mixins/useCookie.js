import Cookie from 'js-cookie'

export function getCookie(key) {
    return Cookie.get(key)
}

export function setCookie(key, val, expires) {
    return Cookie.set(key, val, { expires })
}

export function removeCookie(key) {
    return Cookie.remove(key)
}