import { Request, Response } from "express";
import { ProfessionalService } from "../services/professional.service";

export class ProfessionalController {
    static async create(req: Request, res: Response) {
        const professional = req.body;
        const id = req.user.id;

        const data = await new ProfessionalService().create(professional, id);
        res.json({ data });
    }
}
