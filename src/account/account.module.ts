import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import { UniqueUsernameValidator } from '@src/account/dto/unique-username.validator';
import { Organization } from '@src/organization/entities/organization.entity';
import { UniqueEmailValidator } from '@src/account/dto/unique-email.validator';

@Module({
	imports: [TypeOrmModule.forFeature([Account, Athlete, Organization])],
	controllers: [AccountController],
	providers: [UniqueUsernameValidator, UniqueEmailValidator, AccountService],
})
export class AccountModule {}
