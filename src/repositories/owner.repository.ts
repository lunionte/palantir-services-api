import { PrismaClient } from "@prisma/client";
import { IOwner } from "../models/owner.model";

const prisma = new PrismaClient();

export class OwnerRepository {
    async getAll() {
        const data = await prisma.owner.findMany();
        return data;
    }

    async getByEmail(email: string) {
        const data = await prisma.owner.findFirst({
            where: {
                email,
            },
        });
        return data;
    }

    async getById(id: string) {
        const data = await prisma.owner.findUnique({
            where: {
                id,
            },
        });
        return data;
    }

    async save(owner: IOwner) {
        const data = await prisma.owner.create({
            data: {
                name: owner.name,
                email: owner.email,
                password: owner.password,
            },
        });
        return data;
    }

    async updatePassword(id: string, newPassword: string) {
        const data = await prisma.owner.update({
            where: { id },
            data: { password: newPassword },
        });
        return data;
    }

    async delete(id: string) {
        await prisma.owner.delete({
            where: { id },
        });
    }
}
