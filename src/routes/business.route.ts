import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BusinessController } from "../controllers/business.controller";
import { celebrate, Segments } from "celebrate";
import { newBusinessSchema, updateBusinessSchema } from "../models/business.model";
import { ensureRole } from "../middlewares/ensuroleRole.middleware";

export const businessRoute = Router();

businessRoute.get("/", authMiddleware, ensureRole("OWNER"), BusinessController.getAll);
businessRoute.get("/:id", authMiddleware, ensureRole("OWNER"), BusinessController.getById);
businessRoute.post(
    "/",
    authMiddleware,
    celebrate({ [Segments.BODY]: newBusinessSchema }),
    ensureRole("OWNER"),
    BusinessController.create
);
businessRoute.patch(
    "/update/:id",
    authMiddleware,
    celebrate({ [Segments.BODY]: updateBusinessSchema }),
    ensureRole("OWNER"),
    BusinessController.update
);
businessRoute.delete("/delete/:id", authMiddleware, ensureRole("OWNER"), BusinessController.delete);
