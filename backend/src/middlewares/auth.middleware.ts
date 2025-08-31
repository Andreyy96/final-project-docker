import { NextFunction, Request, Response } from "express";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { TokenTypeEnum } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { accessTokenRepository } from "../repositories/access-token.repository";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { refreshTokenRepository } from "../repositories/refresh-token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;

      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }

      const accessToken = header.split("Bearer ")[1];

      const payload = tokenService.verifyToken(
        accessToken,
        TokenTypeEnum.ACCESS,
      );

      const token = await accessTokenRepository.findByParams({ accessToken });

      if (!token) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals.jwtPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;

      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }
      const refreshToken = header.split("Bearer ")[1];

      const payload = tokenService.verifyToken(
        refreshToken,
        TokenTypeEnum.REFRESH,
      );

      const pair = await refreshTokenRepository.findByParams({ refreshToken });

      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }

      req.res.locals.jwtPayload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public checkActionToken(type: ActionTokenTypeEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.params.actionToken as string;

        if (!token) {
          throw new ApiError("Token is not provided", 401);
        }

        const tokenEntity = await actionTokenRepository.getByToken(token);

        if (!tokenEntity) {
          throw new ApiError("Token is not valid", 401);
        }

        let payload: ITokenPayload;

        switch (type) {
          case ActionTokenTypeEnum.ACTIVATE:
            payload = tokenService.verifyActionToken(
              token,
              ActionTokenTypeEnum.ACTIVATE,
            );
            break;
          case ActionTokenTypeEnum.RECOVERY_PASSWORD:
            payload = tokenService.verifyActionToken(
              token,
              ActionTokenTypeEnum.RECOVERY_PASSWORD,
            );
            break;
        }

        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const authMiddleware = new AuthMiddleware();
