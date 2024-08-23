import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from '@src/organization/entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
	constructor(
		@InjectRepository(Organization)
		private readonly organizationRepository: Repository<Organization>,
		private readonly entityManager: EntityManager,
	) {}
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

	findOne(id: number) {
		return `This action returns a #${id} organization`;
	}

	update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
		return `This action updates a #${id} organization`;
	}

	async remove(id: string) {
		const existingOrganization = await this.organizationRepository.findOne({
			where: {
				id: id,
			},
		});
		return this.organizationRepository.remove(existingOrganization);
	}
}
