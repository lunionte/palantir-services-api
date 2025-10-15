import { Request, Response } from "express";
import { OwnerService } from "../services/owner.service";

export class OwnerController {
    static async getAll(req: Request, res: Response) {
        const data = await new OwnerService().getAll();
        res.json(data);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.body;
        const data = await new OwnerService().getById(id);
        res.json(data);
    }

    static async signUp(req: Request, res: Response) {
        const owner = req.body;
        const data = await new OwnerService().signUp(owner);
        res.status(201).json({ data });
    }

    static async signIn(req: Request, res: Response) {
        const owner = req.body;
        const data = await new OwnerService().signIn(owner);
        res.status(201).json({ data });
    }

    static async update(req: Request, res: Response) {
        const dataToUpdate = req.body;
        const id = req.user.id;
        const data = await new OwnerService().update(id, dataToUpdate);
        res.json({ data });
    }

    static async updatePassword(req: Request, res: Response) {
        const { oldPassword, newPassword } = req.body;
        const id = req.user.id;
        const data = await new OwnerService().updatePassword(id, oldPassword, newPassword);
        res.json({ data });
    }

    static async delete(req: Request, res: Response) {
        const { password } = req.body;
        const id = req.user.id;
        const data = await new OwnerService().deleteAccount(id, password);
        res.json({ data });
    }
}
