import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@src/account/entities/account.entity';
import {
	isUUID,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
@ValidatorConstraint({ async: true })
@Injectable()
export class AccountExistValidator implements ValidatorConstraintInterface {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}
	async validate(accountId: string): Promise<boolean> {
		if (!isUUID(accountId)) {
			return false;
		}
		const account = await this.accountRepository.findOne({
			where: {
				id: accountId,
			},
		});
		console.log(account);
		console.log(account);
		return !!account;
	}
	defaultMessage?(): string {
		return `Account doesn't exists`;
	}
}
