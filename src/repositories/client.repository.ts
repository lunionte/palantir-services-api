import { PrismaClient } from "@prisma/client";
import { IClient } from "../models/client.model";

const prisma = new PrismaClient();

export class ClientRepository {
    async getAll() {
        const data = await prisma.client.findMany();
        return data;
    }

    async getById(id: string) {
        const data = await prisma.client.findUnique({
            where: { id },
        });
        return data;
    }

    async getByEmail(email: string) {
        const data = await prisma.client.findFirst({
            where: { email },
        });
        return data;
    }

    async save(client: IClient) {
        const data = await prisma.client.create({
            data: client,
        });
        return data;
    }
}
