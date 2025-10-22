import { PrismaClient } from "@prisma/client";
import { IBusiness } from "../models/business.model";

const prisma = new PrismaClient();

export class BusinessRepository {
    async getAll() {
        const data = await prisma.business.findMany();
        return data;
    }

    async getById(id: string) {
        const data = await prisma.business.findUnique({
            where: { id },
        });
        return data;
    }

    async getBusinessOwnerById(id: string) {
        const data = await prisma.business.findUnique({
            where: { id },
            select: { ownerId: true },
        });
        return data;
    }

    async getBusinessByOwnerId(id: string) {
        const data = await prisma.business.findMany({
            where: { ownerId: id },
        });
        return data;
    }

    async save(business: IBusiness) {
        const data = await prisma.business.create({
            data: business,
        });
        return data;
    }

    async update(id: string, business: IBusiness) {
        const data = await prisma.business.update({
            where: { id },
            data: business,
        });
        return data;
    }

    async delete(id: string) {
        await prisma.business.delete({
            where: { id },
        });
        return;
    }
}
