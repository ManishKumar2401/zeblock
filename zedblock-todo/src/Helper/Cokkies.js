import Cookies from 'js-cookie'

export const setCookie=(key, value, maxAge)=>{
    Cookies.set(key, value, { expires: maxAge? maxAge :'' })
}
export const getCookie=(key)=>{
   return Cookies.get(key)
}
export const getAllCookie=()=>{
   return Cookies.get()
}
export const removeCookie=(key)=>{
    Cookies.remove(key)
}