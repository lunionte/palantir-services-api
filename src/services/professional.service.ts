import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";
import { IProfessional } from "../models/professional.model";
import bcrypt from "bcrypt";
import { BusinessRepository } from "../repositories/business.repository";
import { ProfessionalRepository } from "../repositories/professional.repository";

export class ProfessionalService {
    private businessRepository;
    private professionalRepository;
    constructor() {
        this.businessRepository = new BusinessRepository();
        this.professionalRepository = new ProfessionalRepository();
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
}
