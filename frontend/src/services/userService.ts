import {urls} from "../constants/urls";
import {apiService} from "./apiService";
import {IRes} from "../types/responeType";
import {IManagerRes} from "../interfaces/user.interface";


const userService = {
    getAllManagers: (query: string):IRes<IManagerRes> => apiService.get(urls.user.getAllManagers(query)),
    bannedById: (userId: string): IRes<void> => apiService.patch(urls.user.bannedById(userId)),
    unbannedById: (userId: string): IRes<void> => apiService.patch(urls.user.unbannedById(userId))
}

export {
    userService
}