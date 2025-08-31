import {baseURL, urls} from "../constants/urls";
import {authService} from "./authService";
import axios, {AxiosError} from "axios";
import {routes} from "../routers/router";

let isRefreshing = false
type IWaiteList = () => void
const waitList:IWaiteList[] = []
let refreshExcist = false
const apiService = axios.create({baseURL})

apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken();
    const refreshToken = authService.getRefreshToken();
    refreshExcist = !!refreshToken
    if (accessToken && req.url !== urls.auth.refresh) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    else {
        req.headers.Authorization = `Bearer ${refreshToken}`
    }
    return req
})

apiService.interceptors.response.use(
    res => res,
    async (error: AxiosError)=> {
        const originalRequest = error.config

        if (error.response.status === 401 && refreshExcist) {
            if (!isRefreshing) {
                isRefreshing = true

                try {
                    await authService.refresh()
                    isRefreshing = false
                    runAfterRefresh()
                    return apiService(originalRequest)
                }
                catch (e) {
                    authService.deleteTokens()
                    isRefreshing = false
                    await routes.navigate("/login?sessionExpiration=true")
                    return Promise.reject(error)
                }
            }
            if (originalRequest.url === urls.auth.refresh) {
                return Promise.reject(error)
            }

            return new Promise(resolve => {
                subscribeToWaitList(() => {
                    resolve(apiService(originalRequest))
                })
            })

        }
        return Promise.reject(error)
    }
)

const subscribeToWaitList = (cb: IWaiteList): void => {
    waitList.push(cb)
}

const runAfterRefresh = ():void => {
    while (waitList.length) {
        const cb = waitList.pop()
        cb()
    }
}


export {apiService}