import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderRepository } from "../repositories/order.repository";

class OrderMiddleware {
  public async isOrderThisManager(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const orderId = req.params.orderId;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const order = await orderRepository.getById(orderId);

      if (order._userId && jwtPayload.userId !== order._userId.toString()) {
        throw new ApiError("This user cannot do this action", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const orderMiddleware = new OrderMiddleware();
