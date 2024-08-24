import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@src/account/entities/account.entity';
import { Organization } from '@src/organization/entities/organization.entity';
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
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		@InjectRepository(Organization)
		private readonly organizationRepository: Repository<Organization>,
	) {}
	async validate(accountId: string): Promise<boolean> {
		if (!isUUID(accountId)) {
			this.message = 'Invalid UUID format';
			return false;
		}
		const existingOrganizationByAccountId =
			await this.organizationRepository.findOne({
				where: {
					account: { id: accountId },
				},
			});
		if (existingOrganizationByAccountId) {
			this.message = 'Account already exists in the organization';
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
		} else if (account.role !== 'Organization') {
			this.message = `Account doesn't support`;
			return false;
		}
		return true;
	}
	defaultMessage?(): string {
		return this.message;
	}
}
