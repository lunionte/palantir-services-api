import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";
import { IProfessional } from "../models/professional.model";
import bcrypt from "bcrypt";
import { BusinessRepository } from "../repositories/business.repository";
import { ProfessionalRepository } from "../repositories/professional.repository";
import jwt from "jsonwebtoken";

export class ProfessionalService {
    private businessRepository;
    private professionalRepository;
    constructor() {
        this.businessRepository = new BusinessRepository();
        this.professionalRepository = new ProfessionalRepository();
    }
    async getById(id: string) {
        const data = await this.professionalRepository.getById(id);
        return data;
    }

    async create(professional: IProfessional, id: string) {
        const business = await this.businessRepository.getById(professional.businessId);
        if (!business) {
            throw new NotFoundError("Business não encontrado");
        }

        if (business.ownerId !== id) {
            throw new ValidationError(
                "Você não tem permisão para adicionar funcionários neste business"
            );
        }

        const hashedPassword = await bcrypt.hash(professional.password, 10);
        professional.password = hashedPassword;

        const data = await this.professionalRepository.save(professional);
        return data;
    }

    async signIn(email: string, password: string) {
        const professional = await this.professionalRepository.getByEmail(email);
        if (!professional) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const isValidPassword = await bcrypt.compare(password, professional.password);

        if (!isValidPassword) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const token = jwt.sign(
            { id: professional.id, role: professional.role },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );
        return token;
    }
}
