const baseURL = '/api'

const auth = '/auth'
const orders = "/orders"
const comments = "/comments"
const groups = "/groups"
const users = "/users"


const urls = {
    auth: {
        login: `${auth}/sign-in`,
        me: `${auth}/me`,
        refresh: `${auth}/refresh`,
        logOut: `${auth}/sign-out`,
        signUpManager: `${auth}/sign-up/manager`,
        getURLForActivate: (userId: string): string => `${auth}/activate?userId=${userId}`,
        getURLForRecoveryPassword: `${auth}/recovery-password`,
        activateAccount: (actionToken: string): string => `${auth}/activate/${actionToken}`,
        recoveryPassword: (actionToken: string): string => `${auth}/recovery-password/${actionToken}`,
    },
    order: {
        getAll: (query: string): string =>  `${orders}${query}`,
        updateById: (id: string): string => `${orders}/${id}`,
        getStatusStatistic: `${orders}/statistic`,
        downloadExcel: (query: string): string => `${orders}/excel_table${query}`,
    },
    comment: {
        postComment: (id: string): string => `${comments}/${id}`
    },
    group: {
        getAll: groups,
        createGroup: groups
    },
    user: {
        getAllManagers: (query: string): string => `${users}${query}`,
        bannedById: (userId: string): string => `${users}/banned/${userId}`,
        unbannedById: (userId: string): string => `${users}/unbanned/${userId}`
    }
}

export {
    baseURL,
    urls
}