import { PrismaClient } from "@prisma/client";
import { IAppointment } from "../models/appointment.model";

const prisma = new PrismaClient();

export class AppointmentRepository {
    async getAll() {
        return await prisma.appointment.findMany();
    }

    async getById(id: string) {
        return await prisma.appointment.findUnique({ where: { id } });
    }

    async getByClientId(clientId: string) {
        return await prisma.appointment.findMany({ where: { clientId } });
    }

    async getByProfessionalId(professionalId: string) {
        return await prisma.appointment.findMany({ where: { professionalId } });
    }

    async getByBusinessId(businessId: string) {
        return await prisma.appointment.findMany({ where: { businessId } });
    }

    async save(appointment: IAppointment) {
        const data = await prisma.appointment.create({ data: appointment as any });
        return data;
    }

    async update(id: string, dataToUpdate: Partial<IAppointment>) {
        const data = await prisma.appointment.update({ where: { id }, data: dataToUpdate as any });
        return data;
    }

    async delete(id: string) {
        await prisma.appointment.delete({ where: { id } });
    }
}
