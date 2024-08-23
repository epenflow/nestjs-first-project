import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from 'src/athlete/entities/athlete.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Athlete])],
	controllers: [AthleteController],
	providers: [AthleteService],
})
export class AthleteModule {}
