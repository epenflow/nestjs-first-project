import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import { Account } from '@src/account/entities/account.entity';
import { AccountExistValidator } from '@src/athlete/dto/account-exist.validator';

@Module({
	imports: [TypeOrmModule.forFeature([Athlete, Account])],
	controllers: [AthleteController],
	providers: [AthleteService, AccountExistValidator],
})
export class AthleteModule {}
