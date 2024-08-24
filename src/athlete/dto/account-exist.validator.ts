import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@src/account/entities/account.entity';
import { Athlete } from '@src/athlete/entities/athlete.entity';
import {
	isUUID,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
@ValidatorConstraint({ async: true })
@Injectable()
export class AccountExistValidator implements ValidatorConstraintInterface {
	private message: string;
	constructor(
		@InjectRepository(Athlete)
		private readonly athleteRepository: Repository<Athlete>,
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async validate(accountId: string): Promise<boolean> {
		if (!isUUID(accountId)) {
			this.message = 'Invalid UUID format';
			return false;
		}
		console.log('validate', accountId);
		const existingAthleteByAccountId = await this.athleteRepository.findOne(
			{
				where: {
					account: {
						id: accountId,
					},
				},
			},
		);
		if (existingAthleteByAccountId) {
			this.message = 'Account already exist in the athlete';
			return false;
		}
		const account = await this.accountRepository.findOne({
			where: {
				id: accountId,
			},
		});
		if (!account) {
			this.message = `Account doesn't exist`;
			return false;
		} else if (account.role !== 'ATHLETE') {
			this.message = `Account doesn't support`;
			return false;
		}
		return true;
	}
	defaultMessage(): string {
		return this.message;
	}
}
