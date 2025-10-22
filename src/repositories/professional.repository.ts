import { PrismaClient } from "@prisma/client";
import { IProfessional } from "../models/professional.model";

const prisma = new PrismaClient();

export class ProfessionalRepository {
    async save(professional: IProfessional) {
        const data = await prisma.professional.create({
            data: professional,
        });
        return data;
    }
}
