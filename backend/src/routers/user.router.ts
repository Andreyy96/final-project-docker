import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { accessMiddleware } from "../middlewares/access.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  accessMiddleware.isAdmin,
  userController.getList,
);

router.patch(
  "/banned/:userId",
  authMiddleware.checkAccessToken,
  accessMiddleware.isAdmin,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.checkActionIsNotForAdmin,
  userController.bannedManagerById,
);

router.patch(
  "/unbanned/:userId",
  authMiddleware.checkAccessToken,
  accessMiddleware.isAdmin,
  commonMiddleware.isIdValid("userId"),

  userController.unbannedManagerById,
);

export const userRouter = router;
