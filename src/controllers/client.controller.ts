import { Request, Response } from "express";
import { ClientService } from "../services/client.service";

export class ClientController {
    static async getAll(req: Request, res: Response) {
        const data = await new ClientService().getAll();
        res.json({ data });
    }

    static async signUp(req: Request, res: Response) {
        const client = req.body;
        const data = await new ClientService().signUp(client);
        res.status(201).json({ data: { token: data.token, user: data.clientData } });
    }

    static async signIn(req: Request, res: Response) {
        const client = req.body;
        const data = await new ClientService().signIn(client);
        res.json({ data: { token: data.token, user: data.clientData } });
    }
}
