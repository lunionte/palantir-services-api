import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../errors/base.error";

import { InternalServerError } from "../errors/internal-server.error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationError } from "../errors/validation.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof ErrorBase) {
        err.json(res);
    } else if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
        const validationError = new ValidationError("Email já em uso");
        validationError.json(res);
    } else {
        throw new InternalServerError();
    }
};
