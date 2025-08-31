import { NextFunction, Request, Response } from "express";

import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";

class AccessMiddleware {
  public async isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      if (jwtPayload.role !== UserRoleEnum.ADMIN) {
        throw new ApiError("This action can do only admmin", 403);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}
export const accessMiddleware = new AccessMiddleware();
