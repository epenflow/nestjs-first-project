import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AthleteModule } from './athlete/athlete.module';
import { OrganizationModule } from './organization/organization.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(process.env.POSTGRES_PORT),
			password: process.env.POSTGRES_PASSWORD,
			username: process.env.POSTGRES_USER,
			database: process.env.POSTGRES_DATABASE,
			synchronize: true,
			logging: true,
			autoLoadEntities: true,
		}),
		UserModule,
		AccountModule,
		AthleteModule,
		OrganizationModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
