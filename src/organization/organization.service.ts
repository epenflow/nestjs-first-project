import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from '@src/organization/entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class OrganizationService {
	constructor(
		@InjectRepository(Organization)
		private readonly organizationRepository: Repository<Organization>,
	) {}
	private async findOrganizationById(id: string): Promise<Organization> {
		if (!isUUID(id)) {
			throw new HttpException('Invalid ID', 404);
		}
		return await this.organizationRepository.findOneBy({
			id,
		});
	}
	private isOrganizationExist(organization: Organization) {
		if (!organization) {
			throw new HttpException('Organization not found', 404);
		}
	}
	async create(
		createOrganizationDto: CreateOrganizationDto,
	): Promise<Organization> {
		const organization = this.organizationRepository.create({
			name: createOrganizationDto.name,
			account: { id: createOrganizationDto.accountId },
		});
		return await this.organizationRepository.save(organization);
	}

	async findAll(): Promise<Organization[]> {
		return await this.organizationRepository.find();
	}

	async findOne(id: string): Promise<Organization> {
		const organization: Organization = await this.findOrganizationById(id);
		this.isOrganizationExist(organization);
		return organization;
	}

	async update(
		id: string,
		updateOrganizationDto: UpdateOrganizationDto,
	): Promise<Organization> {
		const organization = await this.findOrganizationById(id);
		this.isOrganizationExist(organization);
		const organizationData: Organization =
			this.organizationRepository.create(updateOrganizationDto);
		return this.organizationRepository.save(organizationData);
	}

	async remove(id: string): Promise<Organization> {
		const organization: Organization = await this.findOrganizationById(id);
		this.isOrganizationExist(organization);
		return this.organizationRepository.remove(organization);
	}
}
