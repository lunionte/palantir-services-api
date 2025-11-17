import { Joi } from "celebrate";

export interface IAppointment {
    clientId: string;
    professionalId: string;
    serviceId: string;
    businessId: string;
    dateTime: Date | string;
    paymentMethod: "DINHEIRO" | "PIX" | "CARTAO";
    status?: "AGENDADO" | "CONCLUIDO" | "CANCELADO";
    createdAt?: Date;
}

export const newAppointmentSchema = Joi.object().keys({
    professionalId: Joi.string().length(24).hex().required(),
    serviceId: Joi.string().length(24).hex().required(),
    businessId: Joi.string().length(24).hex().required(),
    dateTime: Joi.string().isoDate().required(),
    paymentMethod: Joi.string().valid("DINHEIRO", "PIX", "CARTAO").required(),
});

export const appointmentIdSchema = Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
});
