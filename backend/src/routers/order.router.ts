import { Router } from "express";

import { orderController } from "../controllers/order.controller";
import { accessMiddleware } from "../middlewares/access.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { orderMiddleware } from "../middlewares/order.middleware";
import { OrderValidator } from "../validators/order.validator";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  commonMiddleware.isQueryValid(OrderValidator.listQuery),
  orderController.getList,
);

router.get(
  "/statistic",
  authMiddleware.checkAccessToken,
  accessMiddleware.isAdmin,
  orderController.getStatusStatisticList,
);

router.get(
  "/excel_table",
  authMiddleware.checkAccessToken,
  orderController.getExcel,
);

router.put(
  "/:orderId",
  authMiddleware.checkAccessToken,
  orderMiddleware.isOrderThisManager,
  commonMiddleware.isBodyValid(OrderValidator.updateOrder),
  orderController.updateOrder,
);

export const orderRouter = router;
