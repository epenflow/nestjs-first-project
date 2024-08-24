import { AccountRole } from '@src/libs/account-role';
import { Organization } from '@src/organization/entities/organization.entity';
import { Athlete } from 'src/athlete/entities/athlete.entity';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
} from 'typeorm';

@Entity()
export class Account {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Athlete, (athlete) => athlete.account)
	athlete: Athlete;
	@OneToOne(() => Organization, (organization) => organization.account)
	organization: Organization;

	@Column({
		type: 'varchar',
		length: 50,
		unique: true,
	})
	username: string;

	@Column({ unique: true })
	email: string;

	@Column('varchar')
	password: string;

	@Column({
		type: 'enum',
		enum: AccountRole,
		nullable: true,
	})
	role: AccountRole;

	@CreateDateColumn({
		type: 'timestamp',
	})
	createdAt: Date;
	@UpdateDateColumn({
		type: 'timestamp',
	})
	updatedAt: Date;
}
