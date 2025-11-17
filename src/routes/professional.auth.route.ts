import { Router } from "express";
import { ProfessionalController } from "../controllers/professional.controller";
import { celebrate, Segments } from "celebrate";
import { newProfessionalLoginSchema } from "../models/professional.model";

export const professionalRoutes = Router();
professionalRoutes.post(
    "/signIn",
    celebrate({ [Segments.BODY]: newProfessionalLoginSchema }),
    ProfessionalController.signIn
);
