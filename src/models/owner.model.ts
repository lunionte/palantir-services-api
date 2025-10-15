import { Joi } from "celebrate";

export interface IOwner {
    name: string;
    email: string;
    password: string;
    barberShopId?: string;
    createdAt?: Date;
}

export interface User {
    id: string;
    email: string;
    role: string;
}

export interface IUpdateOwner {
    name?: string;
    email?: string;
}

export const newOwnerSchema = Joi.object().keys({
    name: Joi.string().max(40).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(15).trim().required(),
    barbershopId: Joi.string().length(24).hex().optional(),
});

export const newOwnerLoginSchema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).max(15).trim().required(),
});

export const updatePasswordSchema = Joi.object().keys({
    oldPassword: Joi.string().min(6).max(15).trim().required(),
    newPassword: Joi.string().min(6).max(15).trim().required(),
});

export const deleteAccountSchema = Joi.object().keys({
    password: Joi.string().min(6).max(15).trim().required(),
});

export const updateOwnerSchema = Joi.object()
    .keys({
        name: Joi.string().max(40).trim().optional(),
        email: Joi.string().email().trim().optional(),
    })
    .required();
