import { Request, Response } from "express";
import { ServicesService } from "../services/services.service";

export class ServicesController {
    static async getAll(req: Request, res: Response) {
        const data = await new ServicesService().getAll();
        res.json({ data });
    }

    static async getByBusinessId(req: Request, res: Response) {
        const { id } = req.body;
        const data = await new ServicesService().getByBusinessId(id);
        res.json({ data });
    }

    static async create(req: Request, res: Response) {
        const service = req.body;
        const data = await new ServicesService().create(service);
        res.status(201).json({ data });
    }

    static async update(req: Request, res: Response) {
        const service = req.body;
        const ownerId = req.user.id;
        const id = req.params.id;
        const data = await new ServicesService().update(id, ownerId, service);
        res.json({ data });
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;
        const ownerId = req.user.id;
        await new ServicesService().delete(id, ownerId);
        res.status(204).send();
    }
}
