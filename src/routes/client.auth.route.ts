import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { newClientLoginSchema, newClientSchema } from "../models/client.model";
import { ClientController } from "../controllers/client.controller";

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
