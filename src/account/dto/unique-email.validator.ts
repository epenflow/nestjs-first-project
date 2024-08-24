import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@src/account/entities/account.entity';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async validate(email: string): Promise<boolean> {
		const account = await this.accountRepository.findOne({
			where: {
				email,
			},
		});
		return !account;
	}
	defaultMessage(): string {
		return 'Email ($value) already exist. Choose another email.';
	}
}
