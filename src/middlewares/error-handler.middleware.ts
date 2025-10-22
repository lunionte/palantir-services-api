import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../errors/base.error";

import { InternalServerError } from "../errors/internal-server.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ErrorBase) {
        err.json(res);
    } else {
        throw new InternalServerError();
    }
};
