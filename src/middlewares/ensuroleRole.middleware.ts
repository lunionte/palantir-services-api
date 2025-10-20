import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/validation.error";

export const ensureRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new ValidationError("Usuário não autenticado");
        }

        // se colocar ensureRole sem a role
        if (roles.length === 0) {
            return next();
        }

        // verifica se a role do req.user tem na array roles
        const hasPermission = roles.includes(req.user.role);

        if (!hasPermission) {
            throw new ValidationError("O usuário não tem permissão para entrar nessa rota");
        }

        next();
    };
};
