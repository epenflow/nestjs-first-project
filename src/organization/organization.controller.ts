import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ResultPromise } from '@src/libs/controllers-results';
import { Organization } from '@src/organization/entities/organization.entity';

@Controller('organization')
export class OrganizationController {
	constructor(private readonly organizationService: OrganizationService) {}

	@Post()
	async create(
		@Body() createOrganizationDto: CreateOrganizationDto,
	): Promise<ResultPromise<Organization>> {
		try {
			const data: Organization = await this.organizationService.create(
				createOrganizationDto,
			);
			return {
				success: true,
				data,
				message: 'Organization Created Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Get()
	async findAll(): Promise<ResultPromise<Organization[]>> {
		try {
			const data: Organization[] =
				await this.organizationService.findAll();
			return {
				success: true,
				data,
				message: 'Fetched All Organization',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Get(':id')
	async findOne(
		@Param('id') id: string,
	): Promise<ResultPromise<Organization>> {
		try {
			const data: Organization =
				await this.organizationService.findOne(id);
			return {
				success: true,
				data,
				message: 'Fetched Organization',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateOrganizationDto: UpdateOrganizationDto,
	): Promise<ResultPromise<Organization>> {
		try {
			const data: Organization = await this.organizationService.update(
				id,
				updateOrganizationDto,
			);
			return {
				success: true,
				data,
				message: 'Organization Update',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Delete(':id')
	async remove(
		@Param('id') id: string,
	): Promise<ResultPromise<Organization>> {
		try {
			const data: Organization =
				await this.organizationService.remove(id);
			return {
				success: true,
				data,
				message: 'Remove Organization Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}
}
