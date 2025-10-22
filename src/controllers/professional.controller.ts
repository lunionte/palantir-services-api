import { Request, Response } from "express";
import { ProfessionalService } from "../services/professional.service";

export class ProfessionalController {
    async getAll(req: Request, res: Response) {
        const data = await new ProfessionalService();
    }

    static async create(req: Request, res: Response) {
        const professional = req.body;
        const id = req.user.id;

        const data = await new ProfessionalService().create(professional, id);
        res.json({ data });
    }

    static async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
        const data = await new ProfessionalService().signIn(email, password);
        res.json({ data });
    }
}
