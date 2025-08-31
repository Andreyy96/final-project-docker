import { Router } from "express";

import { commentController } from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { orderMiddleware } from "../middlewares/order.middleware";
import { CommentValidator } from "../validators/comment.validator";

const router = Router();

router.post(
  "/:orderId",
  authMiddleware.checkAccessToken,
  orderMiddleware.isOrderThisManager,
  commonMiddleware.isBodyValid(CommentValidator.schemaForCreateComment),
  commentController.createComment,
);

export const commentRouter = router;
