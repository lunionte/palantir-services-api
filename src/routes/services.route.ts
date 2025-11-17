import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ServicesController } from "../controllers/services.controller";
import { celebrate, Segments } from "celebrate";
import { ensureRole } from "../middlewares/ensuroleRole.middleware";
import { newServiceSchema, updateServiceSchema } from "../models/services.model";

export const servicesRoutes = Router();

servicesRoutes.get("/", authMiddleware, ServicesController.getAll);
servicesRoutes.post("/by-business", authMiddleware, ServicesController.getByBusinessId);
servicesRoutes.post(
    "/",
    authMiddleware,
    celebrate({ [Segments.BODY]: newServiceSchema }),
    ensureRole("OWNER"),
    ServicesController.create
);
servicesRoutes.patch(
    "/:id",
    authMiddleware,
    celebrate({ [Segments.BODY]: updateServiceSchema }),
    ensureRole("OWNER"),
    ServicesController.update
);
servicesRoutes.delete("/:id", authMiddleware, ensureRole("OWNER"), ServicesController.delete);
