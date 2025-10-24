import { ValidationError } from "../errors/validation.error";
import { IClient } from "../models/client.model";
import { ClientRepository } from "../repositories/client.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class ClientService {
    private clientRepository;
    constructor() {
        this.clientRepository = new ClientRepository();
    }
    async getAll() {
        const data = await this.clientRepository.getAll();
        return data;
    }

    async signUp(client: IClient) {
        const hashedPassword = await bcrypt.hash(client.password, 10);
        client.password = hashedPassword;

        const clientData = await this.clientRepository.save(client);

        const token = jwt.sign(
            { id: clientData.id, role: clientData.role },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            }
        );

        return { token, clientData };
    }

    async signIn(client: IClient) {
        const clientData = await this.clientRepository.getByEmail(client.email);
        if (!clientData) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const isValidPassword = await bcrypt.compare(client.password, clientData.password);
        if (!isValidPassword) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const token = jwt.sign(
            { id: clientData.id, role: clientData.role },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            }
        );

        return { token, clientData };
    }
}
