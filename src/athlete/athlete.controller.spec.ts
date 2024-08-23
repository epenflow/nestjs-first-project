import { Test, TestingModule } from '@nestjs/testing';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { CountryCodes } from 'src/libs/nationality';

describe('AthleteController', () => {
	let controller: AthleteController;
	let service: AthleteService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AthleteController],
			providers: [
				{
					provide: AthleteService,
					useValue: {
						create: jest.fn().mockResolvedValue({}),
						findAll: jest.fn().mockResolvedValue([]),
						findOne: jest.fn().mockResolvedValue({}),
						update: jest.fn().mockResolvedValue({}),
						remove: jest.fn().mockResolvedValue({}),
					},
				},
			],
		}).compile();

		controller = module.get<AthleteController>(AthleteController);
		service = module.get<AthleteService>(AthleteService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create an athlete', async () => {
			const createAthleteDto: CreateAthleteDto = {
				fullname: 'Test Athlete',
				dob: new Date('1990-01-01'),
				nationality: 'ID',
			};
			const result = await controller.create(createAthleteDto);
			expect(result).toEqual({
				success: true,
				data: {},
				message: 'Athlete Created Successfully',
			});
			expect(service.create).toHaveBeenCalledWith(createAthleteDto);
		});
	});

	describe('findAll', () => {
		it('should return an array of athletes', async () => {
			const result = await controller.findAll();
			expect(result).toEqual({
				success: true,
				data: [],
				message: 'Fetched All Athlete',
			});
			expect(service.findAll).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should return a single athlete', async () => {
			const id = '1';
			const result = await controller.findOne(id);
			expect(result).toEqual({
				success: true,
				data: {},
				message: 'Fetched Athlete Successfully',
			});
			expect(service.findOne).toHaveBeenCalledWith(id);
		});
	});

	describe('update', () => {
		it('should update an athlete', async () => {
			const id = '1';
			const updateAthleteDto: UpdateAthleteDto = {
				fullname: 'Updated Athlete',
				nationality: CountryCodes.US,
			};
			const result = await controller.update(id, updateAthleteDto);
			expect(result).toEqual({
				success: true,
				data: {},
				message: 'Athlete Updated',
			});
			expect(service.update).toHaveBeenCalledWith(id, updateAthleteDto);
		});
	});

	describe('remove', () => {
		it('should remove an athlete', async () => {
			const id = '1';
			const result = await controller.remove(id);
			expect(result).toEqual({
				success: true,
				data: {},
				message: 'Athlete Deleted Successfully',
			});
			expect(service.remove).toHaveBeenCalledWith(id);
		});
	});
});
