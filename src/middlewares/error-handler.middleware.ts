import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../errors/base.error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationError } from "../errors/validation.error";
import { InternalServerError } from "../errors/internal-server.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ErrorBase) {
        err.json(res);
    } else if (err instanceof PrismaClientKnownRequestError) {
        throw new ValidationError("O Email já existe");
    } else {
        throw new InternalServerError();
    }
};
