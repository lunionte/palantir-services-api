import { Router } from "express";
import { ClientController } from "../controllers/client.controller.ts";
import { celebrate, Segments } from "celebrate";
import { newClientLoginSchema, newClientSchema } from "../models/client.model";

export const clientRoutes = Router();
clientRoutes.get("/", ClientController.getAll);
clientRoutes.post(
    "/signUp",
    celebrate({ [Segments.BODY]: newClientSchema }),
    ClientController.signUp
);
clientRoutes.post(
    "/signIn",
    celebrate({ [Segments.BODY]: newClientLoginSchema }),
    ClientController.signIn
);
