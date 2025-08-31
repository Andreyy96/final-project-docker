import exceljs from "exceljs";

import { IGeneralInfoOrder, IOrder } from "../interfaces/order.interface";
import { IQuery } from "../interfaces/query.interface";
import { orderPresenter } from "../presenters/order.presenter";
import { orderRepository } from "../repositories/order.repository";
import { orderService } from "./order.service";

class ExcelService {
  public async getWorkbook(query: IQuery): Promise<exceljs.Workbook> {
    let result: { data: IGeneralInfoOrder[] } | { data: IOrder[] };
    if (
      (query.name ||
        query.surname ||
        query.age ||
        query.group ||
        query.course ||
        query.course_format ||
        query.course_type ||
        query.email ||
        query.status ||
        query.phone ||
        query.start_date ||
        query.manager ||
        query.end_date) &&
      !query.order
    ) {
      const entities = await orderRepository.getFilterListForExcel(query);
      result = orderPresenter.toListForExcelResDto(entities);
    } else if (
      (query.name ||
        query.surname ||
        query.age ||
        query.group ||
        query.course ||
        query.course_format ||
        query.course_type ||
        query.email ||
        query.status ||
        query.phone ||
        query.start_date ||
        query.manager ||
        query.end_date) &&
      query.order
    ) {
      // result = await orderRepository.getSortListForExcel(query);
      const [entries] = await orderRepository.getSortListForExcel(query);
      const orders = await orderService.makeOneArray(entries);
      result = orderPresenter.toListForExcelResDto(orders);
    } else if (query.order) {
      // result = await orderRepository.getListForExcelByOrder(query);
      const [entities] = await orderRepository.getListForExcelByOrder(query);
      result = orderPresenter.toListForExcelResDto(entities);
    } else {
      const entities = await orderRepository.getListForExcel();
      result = orderPresenter.toListForExcelResDto(entities);
    }

    const workbook = new exceljs.Workbook();
    workbook.title = "Report - " + Date.now().toLocaleString();
    const sheet = workbook.addWorksheet("Report");

    sheet.columns = [
      { header: "Id", key: "id", width: 6 },
      { header: "Name", key: "name", width: 17 },
      { header: "Surname", key: "surname", width: 20 },
      { header: "Email", key: "email", width: 38 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "Age", key: "age", width: 6 },
      { header: "Course", key: "course", width: 7 },
      { header: "Course Format", key: "course_format", width: 13 },
      { header: "Course Type", key: "course_type", width: 12 },
      { header: "Status", key: "status", width: 10 },
      { header: "Sum", key: "sum", width: 10 },
      { header: "Already Paid", key: "already_paid", width: 12 },
      { header: "Group", key: "group", width: 15 },
      { header: "CreatedAt", key: "created_at", width: 22 },
      { header: "Manager", key: "manager", width: 14 },
    ];
    sheet.addRows(result.data);

    return workbook;
  }
}

export const excelService = new ExcelService();
