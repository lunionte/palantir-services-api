import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import { newOwnerLoginSchema, newOwnerSchema, updatePasswordSchema } from "../models/owner.model";
import { OwnerController } from "../controllers/owner.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const ownerAuthRoutes = Router();

ownerAuthRoutes.post(
    "/signUp",
    celebrate({ [Segments.BODY]: newOwnerSchema }),
    OwnerController.signUp
);
ownerAuthRoutes.post(
    "/signIn",
    celebrate({ [Segments.BODY]: newOwnerLoginSchema }),
    OwnerController.signIn
);

ownerAuthRoutes.patch(
    "/update-password",
    authMiddleware,
    celebrate({ [Segments.BODY]: updatePasswordSchema }),
    OwnerController.updatePassword
);
