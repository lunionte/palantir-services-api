import { ForbidenError } from "../errors/forbiden.error";
import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";
import { IBusiness } from "../models/business.model";
import { IProfessional } from "../models/professional.model";
import { BusinessRepository } from "../repositories/business.repository";
import { ProfessionalRepository } from "../repositories/professional.repository";
import { UploadFileService } from "./upload-file.service";
import bcrypt from "bcrypt";

export class BusinessService {
    private businessRepository;
    private professionalRepository;
    private uploadFileService;
    constructor() {
        this.businessRepository = new BusinessRepository();
        this.uploadFileService = new UploadFileService("images/");
        this.professionalRepository = new ProfessionalRepository();
    }
    async getAll() {
        const data = await this.businessRepository.getAll();
        return data;
    }

    async getAllMe(id: string) {
        const data = await this.businessRepository.getBusinessByOwnerId(id);
        if (!data) {
            throw new NotFoundError("O usuário não possui nenhum projeto");
        }
        return data;
    }

    async getById(businessId: string) {
        const data = await this.businessRepository.getById(businessId);
        return data;
    }

    async create(ownerId: string, business: IBusiness) {
        if (business.logo) {
            const logo = await this.uploadFileService.upload(business.logo);
            business.logo = logo;
        }

        business.ownerId = ownerId;
        const data = await this.businessRepository.save(business);
        return data;
    }

    async createProfessional(professional: IProfessional, id: string) {
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

    async update(businessId: string, business: IBusiness) {
        if (business.logo) {
            const logo = await this.uploadFileService.upload(business.logo);
            business.logo = logo;
        }
        const data = await this.businessRepository.update(businessId, business);
        return data;
    }

    async delete(businessId: string, ownerId: string) {
        const business = await this.businessRepository.getBusinessOwnerById(businessId);

        if (!business) {
            throw new NotFoundError("Business não encontrado");
        }

        if (business?.ownerId !== ownerId) {
            throw new ForbidenError();
        }

        const data = await this.businessRepository.delete(businessId);
        return data;
    }
}
