import { Joi } from "celebrate";

export interface IService {
    name: string;
    description?: string;
    price: string;
    durationMin: number;
    businessId: string;
}

export const newServiceSchema = Joi.object().keys({
    name: Joi.string().max(100).trim().required(),
    description: Joi.string().max(500).trim().optional(),
    price: Joi.string().required(),
    durationMin: Joi.number().positive().integer().required(),
    businessId: Joi.string().length(24).hex().required(),
});

export const updateServiceSchema = Joi.object().keys({
    name: Joi.string().max(100).trim().optional(),
    description: Joi.string().max(500).trim().optional(),
    price: Joi.string().optional(),
    durationMin: Joi.number().positive().integer().optional(),
});
