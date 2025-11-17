import { PrismaClient } from "@prisma/client";
import { IProfessional } from "../models/professional.model";

const prisma = new PrismaClient();

export class ProfessionalRepository {
    async getAll() {
        const data = await prisma.professional.findMany();
        return data;
    }

    async getById(id: string) {
        const data = await prisma.professional.findUnique({
            where: { id },
        });
        return data;
    }

    async getByEmail(email: string) {
        const data = await prisma.professional.findFirst({
            where: { email },
        });
        return data;
    }

    async save(professional: IProfessional) {
        const data = await prisma.professional.create({
            data: professional,
        });
        return data;
    }

    async update(id: string, dataToUpdate: Partial<IProfessional>) {
        const data = await prisma.professional.update({
            where: { id },
            data: dataToUpdate,
        });
        return data;
    }

    async delete(id: string) {
        await prisma.professional.delete({ where: { id } });
    }
}
