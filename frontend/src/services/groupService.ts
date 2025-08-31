import {urls} from "../constants/urls";
import {apiService} from "./apiService";
import {IRes} from "../types/responeType";
import {IGroup} from "../interfaces/group.interface";

const groupService = {
    getAll: ():IRes<IGroup[]> => apiService.get(urls.group.getAll),
    createGroup: (dto: {name: string}):IRes<void> => apiService.post(urls.group.createGroup, dto),
}

export {
    groupService
}