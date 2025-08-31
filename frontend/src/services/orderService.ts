import {urls} from "../constants/urls";
import {apiService} from "./apiService";
import {IRes} from "../types/responeType";
import {IOrderPagination, IStatusStatistic, IUpdateDtoOrder} from "../interfaces/order.interface";

const orderService = {
    getAll: (query: string):IRes<IOrderPagination> => apiService.get(urls.order.getAll(query)),
    updateById: (id: string, dto: IUpdateDtoOrder):IRes<void> => apiService.put(urls.order.updateById(id), dto),
    getStatusStatistic: ():IRes<IStatusStatistic> => apiService.get(urls.order.getStatusStatistic),
    downloadExcel: (query: string): IRes<Blob> => apiService.get(urls.order.downloadExcel(query), { responseType: "blob" }),
}

export {
    orderService
}