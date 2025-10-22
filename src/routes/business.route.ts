import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BusinessController } from "../controllers/business.controller";
import { celebrate, Segments } from "celebrate";
import { newBusinessSchema, updateBusinessSchema } from "../models/business.model";
import { ensureRole } from "../middlewares/ensuroleRole.middleware";
import { newProfessionalSchema } from "../models/professional.model";

export const businessRoute = Router();

// DEPOIS TIRAR O ENSUREROLE, ESSA ROTA SERÁ DESTINADA PARA TODOS VEREM TODOS OS SERVIÇOS
businessRoute.get("/", authMiddleware, ensureRole("OWNER"), BusinessController.getAll);
businessRoute.get("/@me", authMiddleware, ensureRole("OWNER"), BusinessController.getAllMe);
businessRoute.get("/:id", authMiddleware, ensureRole("OWNER"), BusinessController.getById);
businessRoute.post(
    "/",
    authMiddleware,
    celebrate({ [Segments.BODY]: newBusinessSchema }),
    ensureRole("OWNER"),
    BusinessController.create
);
businessRoute.post(
    "/professional",
    authMiddleware,
    celebrate({ [Segments.BODY]: newProfessionalSchema }),
    ensureRole("OWNER"),
    BusinessController.createProfessional
);
businessRoute.patch(
    "/update/:id",
    authMiddleware,
    celebrate({ [Segments.BODY]: updateBusinessSchema }),
    ensureRole("OWNER"),
    BusinessController.update
);
businessRoute.delete("/delete/:id", authMiddleware, ensureRole("OWNER"), BusinessController.delete);
