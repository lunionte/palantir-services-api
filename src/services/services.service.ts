import { ForbidenError } from "../errors/forbiden.error";
import { NotFoundError } from "../errors/not-found.error";
import { IService } from "../models/services.model";
import { BusinessRepository } from "../repositories/business.repository";
import { ServicesRepository } from "../repositories/services.repository";

export class ServicesService {
    private servicesRepository;
    private businessRepository;
    constructor() {
        this.servicesRepository = new ServicesRepository();
        this.businessRepository = new BusinessRepository();
    }
    async getAll() {
        const data = await this.servicesRepository.getAll();
        return data;
    }

    async getByBusinessId(id: string) {
        const data = await this.servicesRepository.getByBusinessId(id);
        return data;
    }

    async create(service: IService) {
        const data = await this.servicesRepository.save(service);
        return data;
    }

    async update(id: string, ownerId: string, service: IService) {
        const serviceData = await this.servicesRepository.getById(id);
        if (!serviceData) {
            throw new NotFoundError("Serviço não encontrado");
        }

        const business = await this.businessRepository.getById(service.businessId);

        if (business?.ownerId !== ownerId) {
            throw new ForbidenError("Você não pode realizar essa ação");
        }

        const data = await this.servicesRepository.update(id, service);
        return data;
    }

    async delete(id: string, ownerId: string) {
        const serviceData = await this.servicesRepository.getById(id);
        if (!serviceData) {
            throw new NotFoundError("Serviço não encontrado");
        }

        const business = await this.businessRepository.getById((serviceData as any).businessId);
        if (business?.ownerId !== ownerId) {
            throw new ForbidenError("Você não pode realizar essa ação");
        }

        await this.servicesRepository.delete(id);
    }
}
