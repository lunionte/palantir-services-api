import { Joi } from "celebrate";

export interface IBusiness {
    name: string;
    type: BusinessType;
    address: string;
    phone: string;
    logo?: string;
    ownerId?: string;
}

enum BusinessType {
    BARBEARIA = "BARBEARIA",
    SALAO = "SALAO",
    CLINICA = "CLINICA",
    ESTUDIO = "ESTUDIO",
    OUTRO = "OUTRO",
}

export const newBusinessSchema = Joi.object().keys({
    name: Joi.string().trim().max(150).uppercase().required(),
    type: Joi.string()
        .valid(...Object.values(BusinessType))
        .uppercase()
        .required(),
    address: Joi.string().max(200).trim().uppercase().required(),
    phone: Joi.string().length(11).trim().required(),
    logo: Joi.string().base64().optional(),
});

export const updateBusinessSchema = Joi.object()
    .keys({
        name: Joi.string().trim().max(150).uppercase().optional(),
        type: Joi.string()
            .valid(...Object.values(BusinessType))
            .uppercase()
            .optional(),
        address: Joi.string().max(200).trim().uppercase().optional(),
        phone: Joi.string().length(11).trim().optional(),
        logo: Joi.string().base64().optional(),
    })
    .required();
