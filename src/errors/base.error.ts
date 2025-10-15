import { Response } from "express";

export class ErrorBase extends Error {
    private status;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    json(res: Response) {
        res.status(this.status).json({
            message: this.message,
        });
    }
}
