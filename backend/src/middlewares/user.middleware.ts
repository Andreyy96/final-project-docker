import { NextFunction, Request, Response } from "express";

import { UserRoleEnum } from "../enums/user-role.enum";
import { ApiError } from "../errors/api-error";
import { ISignIn } from "../interfaces/auth.interface";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "../services/password.service";

class UserMiddleware {
  public async checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const user = await userRepository.getByEmail(dto.email);

      if (!user) {
        throw new ApiError("Wrong email or password", 401);
      }

      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ISignIn;
      const user = req.res.locals.user;

      const isPasswordCorrect = await passwordService.comparePassword(
        dto.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new ApiError("Wrong email or password", 401);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isAccountActive(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.res.locals.user;

      if (!user.is_active) {
        throw new ApiError("Manager must activate his profile", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkActionIsNotForAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.params.userId;
      const user = await userRepository.getById(userId);

      if (user.role === UserRoleEnum.ADMIN) {
        throw new ApiError("Admin cannot ban himself", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isAccountBanned(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = req.res.locals.user;

      if (user.is_banned) {
        throw new ApiError("Admin banned your account", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
