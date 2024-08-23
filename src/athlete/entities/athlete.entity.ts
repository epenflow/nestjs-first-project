import { Account } from 'src/account/entities/account.entity';
import { CountryCodes } from 'src/libs/nationality';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Athlete {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Account, (account) => account.athlete, { eager: true })
	@JoinColumn({
		name: 'accountId',
	})
	account: Account;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: true,
	})
	fullname: string;

	@Column({
		type: 'date',
		nullable: true,
	})
	dob: Date;

	@Column({
		type: 'enum',
		enum: CountryCodes,
		default: CountryCodes.ID,
	})
	nationality: CountryCodes;

	@CreateDateColumn({
		type: 'timestamp',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
	})
	updatedAt: Date;
}
