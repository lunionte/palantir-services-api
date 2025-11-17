import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";
import { ForbidenError } from "../errors/forbiden.error";
import { IAppointment } from "../models/appointment.model";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { ClientRepository } from "../repositories/client.repository";
import { ProfessionalRepository } from "../repositories/professional.repository";
import { ServicesRepository } from "../repositories/services.repository";
import { BusinessRepository } from "../repositories/business.repository";

export class AppointmentService {
    private appointmentRepository;
    private clientRepository;
    private professionalRepository;
    private servicesRepository;
    private businessRepository;

    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.clientRepository = new ClientRepository();
        this.professionalRepository = new ProfessionalRepository();
        this.servicesRepository = new ServicesRepository();
        this.businessRepository = new BusinessRepository();
    }

    async getAll() {
        return await this.appointmentRepository.getAll();
    }

    async getById(id: string) {
        const data = await this.appointmentRepository.getById(id);
        if (!data) throw new NotFoundError("Agendamento não encontrado");
        return data;
    }

    async getByClientId(clientId: string) {
        const client = await this.clientRepository.getById(clientId);
        if (!client) throw new NotFoundError("Cliente não encontrado");
        return await this.appointmentRepository.getByClientId(clientId);
    }

    async getByProfessionalId(professionalId: string) {
        const professional = await this.professionalRepository.getById(professionalId);
        if (!professional) throw new NotFoundError("Profissional não encontrado");
        return await this.appointmentRepository.getByProfessionalId(professionalId);
    }

    async create(clientId: string, appointment: IAppointment) {
        const client = await this.clientRepository.getById(clientId);
        if (!client) throw new NotFoundError("Cliente não encontrado");

        const professional = await this.professionalRepository.getById(appointment.professionalId);
        if (!professional) throw new NotFoundError("Profissional não encontrado");

        const service = await this.servicesRepository.getById(appointment.serviceId);
        if (!service) throw new NotFoundError("Serviço não encontrado");

        const business = await this.businessRepository.getById(appointment.businessId);
        if (!business) throw new NotFoundError("Business não encontrado");

        if ((service as any).businessId !== appointment.businessId) {
            throw new ForbidenError("Serviço não pertence ao business informado");
        }

        if ((professional as any).businessId !== appointment.businessId) {
            throw new ForbidenError("Profissional não pertence ao business informado");
        }

        const date = new Date(appointment.dateTime as string);
        if (isNaN(date.getTime())) {
            throw new ValidationError("Data inválida");
        }
        if (date <= new Date()) {
            throw new ValidationError("A data do agendamento deve ser no futuro");
        }

        const professionalAppointments = await this.appointmentRepository.getByProfessionalId(
            appointment.professionalId
        );
        const conflict = professionalAppointments.find(
            (a: any) => new Date(a.dateTime).getTime() === date.getTime()
        );
        if (conflict) {
            throw new ValidationError("Profissional já possui um agendamento nesse horário");
        }

        const toSave: IAppointment = {
            clientId: clientId,
            professionalId: appointment.professionalId,
            serviceId: appointment.serviceId,
            businessId: appointment.businessId,
            dateTime: date,
            paymentMethod: appointment.paymentMethod,
        };

        const data = await this.appointmentRepository.save(toSave);
        return data;
    }

    async cancel(appointmentId: string, userId: string, role: string) {
        const appointment = await this.appointmentRepository.getById(appointmentId);
        if (!appointment) throw new NotFoundError("Agendamento não encontrado");

        if (role === "CLIENT" && appointment.clientId !== userId) {
            throw new ForbidenError("Você não pode cancelar esse agendamento");
        }

        if (role === "EMPLOYEE" && appointment.professionalId !== userId) {
            throw new ForbidenError("Você não pode cancelar esse agendamento");
        }

        if (role === "OWNER") {
            const business = await this.businessRepository.getBusinessOwnerId(
                appointment.businessId
            );
            if (!business || (business as any).ownerId !== userId) {
                throw new ForbidenError("Você não pode cancelar esse agendamento");
            }
        }

        const data = await this.appointmentRepository.update(appointmentId, {
            status: "CANCELADO" as any,
        });
        return data;
    }
}
