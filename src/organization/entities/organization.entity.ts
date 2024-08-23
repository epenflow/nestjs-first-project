import { Account } from '@src/account/entities/account.entity';
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
export class Organization {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@OneToOne(() => Account, (account) => account.organization, { eager: true })
	@JoinColumn({
		name: 'accountId',
	})
	account: Account;

	@Column({
		type: 'varchar',
		length: 100,
	})
	name: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
