import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { OwnerController } from "../controllers/owner.controller";
import { celebrate, Segments } from "celebrate";
import { deleteAccountSchema } from "../models/owner.model";

export const ownerRoutes = Router();

ownerRoutes.get("/", authMiddleware, OwnerController.getAll);
ownerRoutes.delete(
    "/delete-account",
    authMiddleware,
    celebrate({ [Segments.BODY]: deleteAccountSchema }),
    OwnerController.delete
);
