import { NextFunction, Request, Response } from "express";

import { IDTOOrder } from "../interfaces/order.interface";
import { IQuery } from "../interfaces/query.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderService } from "../services/order.service";

class OrderController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IQuery;

      const result = await orderService.getList(query);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getStatusStatisticList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await orderService.getStatusStatisticList();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IDTOOrder;
      const orderId = req.params.orderId;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await orderService.updateOrderById(
        orderId,
        dto,
        jwtPayload,
      );
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getExcel(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query as unknown as IQuery;

      const workbook = await orderService.getExcel(query);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="orders.xlsx"`,
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
