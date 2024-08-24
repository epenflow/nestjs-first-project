import { HttpException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, AccountRole } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import { Organization } from '@src/organization/entities/organization.entity';
@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		@InjectRepository(Athlete)
		private readonly athleteRepository: Repository<Athlete>,
		@InjectRepository(Organization)
		private readonly organizationRepository: Repository<Organization>,
	) {}
	async create(createAccountDto: CreateAccountDto): Promise<Account> {
		const { email, username, password, role } = createAccountDto;
		const saltOrRounds = 12;
		const hashedPassword = await bcrypt.hash(password, saltOrRounds);
		const account: Account = await this.accountRepository.save({
			username,
			email,
			password: hashedPassword,
			role,
		});
		if (account.role === AccountRole.ATHLETE) {
			const athlete = this.athleteRepository.create({
				fullname: account.username,
				dob: new Date('1990-01-01'),
				account,
			});
			await this.athleteRepository.save(athlete);
			console.log(this.athleteRepository);
		}

		return account;
	}

	async findAll(): Promise<Account[]> {
		return await this.accountRepository.find();
	}

	async findOne(id: string): Promise<Account> {
		const account: Account = await this.accountRepository.findOneBy({ id });
		if (!account) {
			throw new HttpException('Account not found', 404);
		}
		return account;
	}

	async update(
		id: string,
		updateAccountDto: UpdateAccountDto,
	): Promise<Account> {
		const existingAccount: Account = await this.accountRepository.findOne({
			where: { id },
			relations: ['athlete'],
		});
		if (!existingAccount) {
			throw new HttpException('Account not found', 404);
		}
		const accountData: Account = this.accountRepository.merge(
			existingAccount,
			updateAccountDto,
		);
		return await this.accountRepository.save(accountData);
	}

	async remove(id: string): Promise<Account> {
		const existingAccount: Account = await this.accountRepository.findOneBy(
			{ id },
		);
		if (existingAccount.role === AccountRole.ATHLETE) {
			const relatedAthlete = await this.athleteRepository.findOne({
				where: {
					account: {
						id: existingAccount.id,
					},
				},
			});
			if (relatedAthlete) {
				await this.athleteRepository.remove(relatedAthlete);
			}
		}
		if (existingAccount.role === AccountRole.ORGANIZATION) {
			const relatedOrganization =
				await this.organizationRepository.findOne({
					where: {
						account: {
							id: existingAccount.id,
						},
					},
				});

			if (relatedOrganization) {
				await this.organizationRepository.remove(relatedOrganization);
			}
		}
		return await this.accountRepository.remove(existingAccount);
	}
}
