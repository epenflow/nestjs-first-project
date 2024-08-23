import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import { UniqueUsernameValidator } from '@src/account/dto/unique-username.validator';

@Module({
	imports: [TypeOrmModule.forFeature([Account, Athlete])],
	controllers: [AccountController],
	providers: [UniqueUsernameValidator, AccountService],
})
export class AccountModule {}
