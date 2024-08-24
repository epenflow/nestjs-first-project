import { HttpException, Injectable } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class AthleteService {
	constructor(
		@InjectRepository(Athlete)
		private readonly athleteRepository: Repository<Athlete>,
	) {}
	private async findAthleteById(id: string): Promise<Athlete> {
		if (!isUUID(id)) {
			throw new HttpException('Invalid ID', 404);
		}
		return await this.athleteRepository.findOneBy({
			id,
		});
	}
	private isAthleteExist(athlete: Athlete) {
		if (!athlete) {
			throw new HttpException('Athlete not found', 404);
		}
	}
	async create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
		const { accountId, fullname, dob, nationality } = createAthleteDto;
		const athlete: Athlete = this.athleteRepository.create({
			account: {
				id: accountId,
			},
			fullname,
			nationality,
			dob,
		});
		return await this.athleteRepository.save(athlete);
	}

	async findAll(): Promise<Athlete[]> {
		return await this.athleteRepository.find();
	}

	async findOne(id: string): Promise<Athlete> {
		const athlete: Athlete = await this.findAthleteById(id);
		this.isAthleteExist(athlete);
		return athlete;
	}

	async update(
		id: string,
		updateAthleteDto: UpdateAthleteDto,
	): Promise<Athlete> {
		const athlete: Athlete = await this.findAthleteById(id);
		this.isAthleteExist(athlete);
		const athleteData: Athlete = this.athleteRepository.merge(
			athlete,
			updateAthleteDto,
		);
		return await this.athleteRepository.save(athleteData);
	}

	async remove(id: string): Promise<Athlete> {
		const athlete: Athlete = await this.findAthleteById(id);
		this.isAthleteExist(athlete);
		return await this.athleteRepository.remove(athlete);
	}
}
