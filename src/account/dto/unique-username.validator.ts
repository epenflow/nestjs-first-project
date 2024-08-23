// unique-username.validator.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}

	async validate(username: string): Promise<boolean> {
		console.log('validator', {
			username,
		});
		const account = await this.accountRepository.findOne({
			where: { username },
		});
		return !account; // Return true if username does not exist
	}

	defaultMessage() {
		return 'Username ($value) already exists. Choose another username.';
	}
}
