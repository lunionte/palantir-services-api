import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { IAppointment } from "../models/appointment.model";

export class AppointmentController {
    static async create(req: Request, res: Response) {
        const appointment = req.body as IAppointment;
        const clientId = req.user.id;
        const data = await new AppointmentService().create(clientId, appointment);
        res.status(201).json({ data });
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await new AppointmentService().getById(id);
        res.json({ data });
    }

    static async getMyAppointments(req: Request, res: Response) {
        const userId = req.user.id;
        const role = req.user.role;
        const service = new AppointmentService();

        if (role === "CLIENT") {
            const data = await service.getByClientId(userId);
            res.json({ data });
            return;
        }

        if (role === "EMPLOYEE") {
            const data = await service.getByProfessionalId(userId);
            res.json({ data });
            return;
        }

        // OWNER - return empty array or could filter by businessId
        res.json({ data: [] });
    }

    static async cancel(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user.id;
        const role = req.user.role;
        const data = await new AppointmentService().cancel(id, userId, role);
        res.json({ data });
    }
}
