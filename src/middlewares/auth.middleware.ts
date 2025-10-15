import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OwnerService } from "../services/owner.service";
import { ValidationError } from "../errors/validation.error";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ValidationError("Token não fornecido");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        console.log(payload);

        // por enquanto, só valida se for um owner
        // futuramente adicionar um service que gerencia userData por id e role
        const userData = await new OwnerService().getById(payload.id);
        req.user = {
            id: userData.id,
            email: userData.email,
            role: userData.role,
        };

        next();
    } catch (error) {
        console.log(error);
        throw new ValidationError("Token inválido");
    }
};
