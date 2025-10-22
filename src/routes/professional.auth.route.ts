import { Router } from "express";
import { ProfessionalController } from "../controllers/professional.controller";

export const professionalRoutes = Router();
professionalRoutes.post("/signIn", ProfessionalController.signIn);
