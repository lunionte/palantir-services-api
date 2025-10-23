import { Request, Response } from "express";
import { ProfessionalService } from "../services/professional.service";

export class ProfessionalController {
    static async getAll(req: Request, res: Response) {
        const data = await new ProfessionalService().getAll();
        res.json({ data });
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id;
        const data = await new ProfessionalService().getById(id);
        res.json({ data });
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
