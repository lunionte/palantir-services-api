import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OwnerService } from "../services/owner.service";
import { ValidationError } from "../errors/validation.error";
import { ProfessionalService } from "../services/professional.service";
import { ClientRepository } from "../repositories/client.repository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ValidationError("Token não fornecido");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log(payload);

        let userData;
        if (payload.role === "OWNER") {
            userData = await new OwnerService().getById(payload.id);
        } else if (payload.role === "EMPLOYEE") {
            userData = await new ProfessionalService().getById(payload.id);
        } else if (payload.role === "CLIENT") {
            userData = await new ClientRepository().getById(payload.id);
        } else {
            throw new ValidationError("Role inválida");
        }

        req.user = {
            id: userData!.id,
            email: userData!.email,
            role: payload.role,
        };

        next();
    } catch (error) {
        console.log(error);
        throw new ValidationError("Token inválido");
    }
};
