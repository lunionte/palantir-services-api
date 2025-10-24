import { Joi } from "celebrate";

export interface IClient {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

export const newClientSchema = Joi.object().keys({
    name: Joi.string().max(40).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(15).trim().required(),
    phone: Joi.string().length(11).trim().optional(),
});

export const newClientLoginSchema = Joi.object().keys({
    email: Joi.string().max(40).trim().required(),
    password: Joi.string().min(6).max(15).trim().required(),
});
