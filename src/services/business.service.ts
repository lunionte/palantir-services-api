import { ForbidenError } from "../errors/forbiden.error";
import { NotFoundError } from "../errors/not-found.error";
import { IBusiness } from "../models/business.model";
import { BusinessRepository } from "../repositories/business.repository";
import { UploadFileService } from "./upload-file.service";

export class BusinessService {
    private businessRepository;
    private uploadFileService;
    constructor() {
        this.businessRepository = new BusinessRepository();
        this.uploadFileService = new UploadFileService("images/");
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
