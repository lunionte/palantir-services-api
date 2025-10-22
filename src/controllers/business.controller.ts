import { Request, Response } from "express";
import { IBusiness } from "../models/business.model";
import { BusinessService } from "../services/business.service";

export class BusinessController {
    static async getAll(req: Request, res: Response) {
        const data = await new BusinessService().getAll();
        res.json({ data });
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await new BusinessService().getById(id);
        res.json({ data });
    }

    static async getAllMe(req: Request, res: Response) {
        const id = req.user.id;
        const data = await new BusinessService().getAllMe(id);
        res.json({ data });
    }

    static async create(req: Request, res: Response) {
        const business = req.body as IBusiness;
        const ownerId = req.user.id;
        const data = await new BusinessService().create(ownerId, business);
        res.status(201).json({ data });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const business = req.body as IBusiness;
        const data = await new BusinessService().update(id, business);
        res.json({ data });
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const ownerId = req.user.id;
        const data = await new BusinessService().delete(id, ownerId);
        res.json({ data });
    }
}
