import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account, AccountRole } from 'src/account/entities/account.entity';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';

describe('AccountService', () => {
	let service: AccountService;
	let accountRepository: Repository<Account>;
	let athleteRepository: Repository<Athlete>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccountService,
				{
					provide: getRepositoryToken(Account),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(Athlete),
					useClass: Repository,
				},
			],
		}).compile();

		service = module.get<AccountService>(AccountService);
		accountRepository = module.get<Repository<Account>>(
			getRepositoryToken(Account),
		);
		athleteRepository = module.get<Repository<Athlete>>(
			getRepositoryToken(Athlete),
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create an account and an athlete if role is ATHLETE', async () => {
			const createAccountDto = {
				email: 'test@example.com',
				name: 'Test User',
				password: 'password',
			};
			const hashedPassword = await bcrypt.hash(
				createAccountDto.password,
				12,
			);
			const account = {
				...createAccountDto,
				password: hashedPassword,
				role: AccountRole.ATHLETE,
			};

			jest.spyOn(accountRepository, 'save').mockResolvedValue(
				account as Account,
			);
			jest.spyOn(athleteRepository, 'create').mockReturnValue(
				{} as Athlete,
			);
			jest.spyOn(athleteRepository, 'save').mockResolvedValue(
				{} as Athlete,
			);

			const result = await service.create(createAccountDto);

			expect(result).toEqual(account);
			expect(accountRepository.save).toHaveBeenCalledWith({
				name: createAccountDto.name,
				email: createAccountDto.email,
				password: hashedPassword,
			});
			expect(athleteRepository.create).toHaveBeenCalledWith({
				fullname: createAccountDto.name,
				dob: new Date('1990-01-01'),
				account,
			});
			expect(athleteRepository.save).toHaveBeenCalled();
		});
	});

	describe('findAll', () => {
		it('should return an array of accounts', async () => {
			const accounts = [{}, {}] as Account[];
			jest.spyOn(accountRepository, 'find').mockResolvedValue(accounts);

			const result = await service.findAll();

			expect(result).toEqual(accounts);
			expect(accountRepository.find).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should return an account if found', async () => {
			const account = {} as Account;
			jest.spyOn(accountRepository, 'findOneBy').mockResolvedValue(
				account,
			);

			const result = await service.findOne('1');

			expect(result).toEqual(account);
			expect(accountRepository.findOneBy).toHaveBeenCalledWith({
				id: '1',
			});
		});

		it('should throw an exception if account not found', async () => {
			jest.spyOn(accountRepository, 'findOneBy').mockResolvedValue(null);

			await expect(service.findOne('1')).rejects.toThrow(HttpException);
		});
	});

	describe('update', () => {
		it('should update an account', async () => {
			const updateAccountDto = { name: 'Updated Name' };
			const existingAccount = {
				id: '1',
				name: 'Old Name',
				athlete: {},
			} as Account;
			const updatedAccount = { ...existingAccount, ...updateAccountDto };

			jest.spyOn(accountRepository, 'findOne').mockResolvedValue(
				existingAccount,
			);
			jest.spyOn(accountRepository, 'save').mockResolvedValue(
				updatedAccount,
			);

			const result = await service.update('1', updateAccountDto);

			expect(result).toEqual(updatedAccount);
			expect(accountRepository.findOne).toHaveBeenCalledWith({
				where: { id: '1' },
				relations: ['athlete'],
			});
			expect(accountRepository.save).toHaveBeenCalledWith(updatedAccount);
		});

		it('should throw an exception if account not found', async () => {
			jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);

			await expect(service.update('1', {})).rejects.toThrow(
				HttpException,
			);
		});
	});

	describe('remove', () => {
		it('should remove an account', async () => {
			const account = {} as Account;
			jest.spyOn(accountRepository, 'findOneBy').mockResolvedValue(
				account,
			);
			jest.spyOn(accountRepository, 'remove').mockResolvedValue(account);

			const result = await service.remove('1');

			expect(result).toEqual(account);
			expect(accountRepository.findOneBy).toHaveBeenCalledWith({
				id: '1',
			});
			expect(accountRepository.remove).toHaveBeenCalledWith(account);
		});
	});
});
