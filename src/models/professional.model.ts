import { Joi } from "celebrate";

export interface IProfessional {
    name: string;
    email: string;
    password: string;
    phone?: string;
    businessId: string;
    image?: string;
    role?: string;
    createdAt?: Date;
}

export const newProfessionalSchema = Joi.object().keys({
    name: Joi.string().max(50).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(15).trim().required(),
    phone: Joi.string().length(11).trim().optional(),
    businessId: Joi.string().length(24).trim().required(),
});

export const newProfessionalLoginSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(15).trim().required(),
});
