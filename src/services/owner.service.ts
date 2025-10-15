import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";
import { IOwner, IUpdateOwner } from "../models/owner.model";
import { OwnerRepository } from "../repositories/owner.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class OwnerService {
    private ownerRepository;
    constructor() {
        this.ownerRepository = new OwnerRepository();
    }

    async getAll() {
        const data = await this.ownerRepository.getAll();
        return data;
    }

    async getById(id: string) {
        const data = await this.ownerRepository.getById(id);
        if (!data) {
            throw new NotFoundError("Usuário não encotrado");
        }
        return data;
    }

    async signUp(owner: IOwner) {
        // realizar validação de barbershopId depois (NÃO FEITO)
        const hashedPassword = await bcrypt.hash(owner.password, 10);
        owner.password = hashedPassword;

        const data = this.ownerRepository.save(owner);
        return data;
    }

    async signIn(owner: IOwner) {
        const ownerData = await this.ownerRepository.getByEmail(owner.email);
        if (!ownerData) {
            throw new NotFoundError("Usuário não encontrado");
        }
        if (!ownerData) {
            throw new ValidationError("Email ou senha inválidos");
        }
        const isValidPassword = await bcrypt.compare(owner.password, ownerData.password);
        if (!isValidPassword) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const token = jwt.sign(
            { id: ownerData.id, role: ownerData.role },
            process.env.JWT_SECRET!,
            {
                expiresIn: "3d",
            }
        );
        return token;
    }

    async update(id: string, dataToUpdate: IUpdateOwner) {
        const ownerData = await this.ownerRepository.getById(id);
        if (!ownerData) {
            throw new NotFoundError("Usuário não encotrado");
        }
        if (dataToUpdate.name && dataToUpdate.name === ownerData.name) {
            throw new ValidationError("O nome não pode ser o igual ao anterior");
        }

        if (dataToUpdate.email && dataToUpdate.email === ownerData.email) {
            throw new ValidationError("O email não pode ser igual ao anterior");
        }

        const data = await this.ownerRepository.update(id, dataToUpdate);
        return data;
    }

    async updatePassword(id: string, oldPassword: string, newPassword: string) {
        const ownerData = await this.ownerRepository.getById(id);
        if (!ownerData) {
            throw new NotFoundError("Usuário não encontrado");
        }
        if (newPassword === oldPassword) {
            throw new ValidationError("A nova senha não pode ser a mesma que a antiga");
        }

        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, ownerData.password);

        if (!isOldPasswordCorrect) {
            throw new ValidationError("A senha antiga está incorreta");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        const data = await this.ownerRepository.updatePassword(id, hashedNewPassword);

        return data;
    }

    async deleteAccount(id: string, password: string) {
        const ownerData = await this.ownerRepository.getById(id);
        console.log(ownerData);
        if (!ownerData) {
            throw new NotFoundError("Usuário não encontrado");
        }

        const isValidPassword = await bcrypt.compare(password, ownerData.password);

        if (!isValidPassword) {
            throw new ValidationError("Senha incorreta");
        }

        await this.ownerRepository.delete(id);
        return "";
    }
}
