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

    async save(professional: IProfessional) {
        const data = await prisma.professional.create({
            data: professional,
        });
        return data;
    }
}
