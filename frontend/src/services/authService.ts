import {IAuthUser, ICreateManager, IUser} from "../interfaces/user.interface";
import {urls} from "../constants/urls";

import {IRes} from "../types/responeType";
import {ITokenPair} from "../interfaces/token.interface";
import {apiService} from "./apiService";
import {IPassword} from "../interfaces/password.interface";

const accessTokenKey = "access"
const refreshTokenKey = "refresh"


const authService = {
    async login(loginDTO: { email: string, password: string }): Promise<IUser> {
        const {data} = await apiService.post(urls.auth.login, loginDTO)
        const {user, tokens} = data as IAuthUser
        this.setTokens(tokens)
        return user
    },

    async signUpManager(body: ICreateManager): Promise<void> {
        await apiService.post(urls.auth.signUpManager, body)
    },

    async getURLForActivate(userId: string): Promise<IRes<string>> {
       return await apiService.post(urls.auth.getURLForActivate(userId))
    },

    async activateAccount(actionToken: string, body: IPassword): Promise<void> {
        await apiService.patch(urls.auth.activateAccount(actionToken), body)
    },

    async getURLForRecoveryPassword(email: string): Promise<IRes<string>> {
        return await apiService.post(urls.auth.getURLForRecoveryPassword, {email})
    },

    async recoveryPassword(actionToken: string, body: IPassword): Promise<void> {
        await apiService.patch(urls.auth.recoveryPassword(actionToken), body)
    },

    me(): IRes<IUser> {
        return apiService.get(urls.auth.me)
    },
    async refresh(): Promise<void> {
        const refresh = this.getRefreshToken();
        const {data} = await apiService.post(urls.auth.refresh, {refresh});
        this.setTokens(data)
    },
    async logOut(): Promise<void> {
        await apiService.delete(urls.auth.logOut)
        this.deleteTokens()
    },
    setTokens(tokens: ITokenPair): void {
        localStorage.setItem(accessTokenKey, tokens.accessToken)
        localStorage.setItem(refreshTokenKey, tokens.refreshToken)
    },
    getAccessToken(): string {
        return localStorage.getItem(accessTokenKey)
    },
    getRefreshToken(): string {
        return localStorage.getItem(refreshTokenKey)
    },
    deleteTokens(): void {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    }
}

export {
    authService
}