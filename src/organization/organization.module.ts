import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from '@src/organization/entities/organization.entity';
import { AccountExistValidator } from '@src/organization/dto/account-exist.validator';
import { Account } from '@src/account/entities/account.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Organization, Account])],
	controllers: [OrganizationController],
	providers: [OrganizationService, AccountExistValidator],
})
export class OrganizationModule {}
