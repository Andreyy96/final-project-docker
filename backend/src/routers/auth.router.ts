import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { accessMiddleware } from "../middlewares/access.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { AuthValidator } from "../validators/auth.validator";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.post("/sign-up", authController.signUp);

router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(AuthValidator.schemaForLogin),
    userMiddleware.checkEmail,
    userMiddleware.isAccountActive,
    userMiddleware.isAccountBanned,
    userMiddleware.checkPassword,
    authController.signIn,
);

router.get("/me", authMiddleware.checkAccessToken, authController.me);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh,
);

router.delete(
    "/sign-out",
    authMiddleware.checkAccessToken,
    authController.signOut,
);

router.post(
    "/activate",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    authController.activateAccountGetURL,
);

router.post(
    "/recovery-password",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    authController.recoveryPasswordGetURL,
);

router.post(
    "/sign-up/manager",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(UserValidator.schemaForCreateUser),
    accessMiddleware.isAdmin,
    authController.createManager,
);

router.patch(
    "/recovery-password/:actionToken",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.RECOVERY_PASSWORD),
    commonMiddleware.isBodyValid(AuthValidator.schemaForSetPassword),
    commonMiddleware.isPasswordsEqual(),
    authController.recoveryPasswordSet,
);

router.patch(
    "/activate/:actionToken",
    authMiddleware.checkActionToken(ActionTokenTypeEnum.ACTIVATE),
    commonMiddleware.isBodyValid(AuthValidator.schemaForSetPassword),
    commonMiddleware.isPasswordsEqual(),
    authController.activateAccount,
);

export const authRouter = router;
