import { HttpException, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from 'src/athlete/entities/athlete.entity';

@Injectable()
export class AthleteService {
	constructor(
		@InjectRepository(Athlete)
		private readonly athleteRepository: Repository<Athlete>,
	) {}
	async create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
		const { accountId, fullname } = createAthleteDto;
		const athlete: Athlete = this.athleteRepository.create({
			account: {
				id: accountId,
			},
			fullname,
			dob: new Date('1990-01-01'),
		});
		return await this.athleteRepository.save(athlete);
	}

	async findAll(): Promise<Athlete[]> {
		return await this.athleteRepository.find();
	}

	async findOne(id: string): Promise<Athlete> {
		const athlete: Athlete = await this.athleteRepository.findOneBy({ id });
		if (!athlete) {
			throw new HttpException('Athlete not found', 404);
		}
		return athlete;
	}

	async update(
		id: string,
		updateAthleteDto: UpdateAthleteDto,
	): Promise<Athlete> {
		const existingAthlete: Athlete = await this.athleteRepository.findOneBy(
			{ id },
		);
		if (!existingAthlete) {
			throw new HttpException('Athlete not found', 404);
		}
		const athleteData: Athlete = this.athleteRepository.merge(
			existingAthlete,
			updateAthleteDto,
		);
		return await this.athleteRepository.save(athleteData);
	}

	async remove(id: string): Promise<Athlete> {
		const existingAthlete: Athlete = await this.athleteRepository.findOneBy(
			{ id },
		);
		if (!existingAthlete) {
			throw new HttpException('Athlete not found', 404);
		}
		return await this.athleteRepository.remove(existingAthlete);
	}
}
