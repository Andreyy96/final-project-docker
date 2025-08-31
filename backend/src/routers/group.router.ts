import { Router } from "express";

import { groupController } from "../controllers/group.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { groupMiddleware } from "../middlewares/group.middleware";
import { GroupValidator } from "../validators/group.validator";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, groupController.getList);

router.post(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(GroupValidator.createGroupDTO),
  groupMiddleware.isGroupExist,
  groupController.createGroup,
);

export const groupRouter = router;
