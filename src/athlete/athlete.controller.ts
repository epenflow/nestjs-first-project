import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { ResultPromise } from 'src/libs/controllers-results';
import { Athlete } from 'src/athlete/entities/athlete.entity';

@Controller('athlete')
export class AthleteController {
	constructor(private readonly athleteService: AthleteService) {}

	@Post()
	async create(
		@Body() createAthleteDto: CreateAthleteDto,
	): Promise<ResultPromise<Athlete>> {
		try {
			const data: Athlete =
				await this.athleteService.create(createAthleteDto);
			return {
				success: true,
				data,
				message: 'Athlete Created Successfully',
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
	async findAll(): Promise<ResultPromise<Athlete[]>> {
		try {
			const data: Athlete[] = await this.athleteService.findAll();
			return {
				success: true,
				data,
				message: 'Fetched All Athlete',
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
	async findOne(@Param('id') id: string): Promise<ResultPromise<Athlete>> {
		try {
			const data: Athlete = await this.athleteService.findOne(id);
			return {
				success: true,
				data,
				message: 'Fetched Athlete Successfully',
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
		@Body() updateAthleteDto: UpdateAthleteDto,
	): Promise<ResultPromise<Athlete>> {
		try {
			const data: Athlete = await this.athleteService.update(
				id,
				updateAthleteDto,
			);
			return {
				success: true,
				data,
				message: 'Athlete Updated',
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
	async remove(@Param('id') id: string): Promise<ResultPromise<Athlete>> {
		try {
			const data: Athlete = await this.athleteService.remove(id);
			return {
				success: true,
				data,
				message: 'Athlete Deleted Successfully',
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
