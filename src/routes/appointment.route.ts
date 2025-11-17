import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AppointmentController } from "../controllers/appointment.controller";
import { celebrate, Segments } from "celebrate";
import { newAppointmentSchema } from "../models/appointment.model";

export const appointmentRoutes = Router();

appointmentRoutes.post(
    "/",
    authMiddleware,
    celebrate({ [Segments.BODY]: newAppointmentSchema }),
    AppointmentController.create
);
appointmentRoutes.get("/@me", authMiddleware, AppointmentController.getMyAppointments);
appointmentRoutes.get("/:id", authMiddleware, AppointmentController.getById);
appointmentRoutes.delete("/:id", authMiddleware, AppointmentController.cancel);
