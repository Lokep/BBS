const STORAGE_KEY = 'USERINFO'

export default {
    SET(items) {
        return window.localStorage.setItem(STORAGE_KEY, window.JSON.stringify(items))
    },
    GET() {
        return window.JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    },
    REMOVE() {
        return window.localStorage.removeItem(STORAGE_KEY) //undefined
    },
    CLEAR() {
        return window.localStorage.clear() //undefined
    },
    HAS(items) {
        return localStorage.hasOwnProperty(items) //boolean
    }
}