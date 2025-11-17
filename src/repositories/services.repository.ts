import { PrismaClient } from "@prisma/client";
import { IService } from "../models/services.model";

const prisma = new PrismaClient();

export class ServicesRepository {
    async getAll() {
        return await prisma.service.findMany();
    }

    async getById(id: string) {
        return await prisma.service.findUnique({
            where: { id },
        });
    }

    async getByBusinessId(id: string) {
        return await prisma.service.findMany({
            where: { businessId: id },
        });
    }

    async save(service: IService) {
        const data = await prisma.service.create({
            data: service,
        });
        return data;
    }

    async update(id: string, service: Partial<IService>) {
        const data = await prisma.service.update({
            where: { id: id },
            data: service,
        });
        return data;
    }

    async delete(id: string) {
        await prisma.service.delete({ where: { id } });
    }
}
