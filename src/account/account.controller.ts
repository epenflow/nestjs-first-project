import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from 'src/account/entities/account.entity';
interface ResultPromise<T> {
	success: boolean;
	data: T | undefined;
	message: any;
}
@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post()
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@Body() createAccountDto: CreateAccountDto,
	): Promise<ResultPromise<Account>> {
		try {
			const data: Account =
				await this.accountService.create(createAccountDto);

			return {
				success: true,
				data,
				message: 'Account Created Successfully',
			};
		} catch (error) {
			console.error('error create an account', error);
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Get()
	async findAll(): Promise<ResultPromise<Account[]>> {
		try {
			const data: Account[] = await this.accountService.findAll();
			return {
				success: true,
				data,
				message: 'Fetched all account',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ResultPromise<Account>> {
		try {
			const data: Account = await this.accountService.findOne(id);
			return {
				success: true,
				data,
				message: 'Account Fetched Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateAccountDto: UpdateAccountDto,
	): Promise<ResultPromise<Account>> {
		try {
			const data = await this.accountService.update(id, updateAccountDto);
			return {
				success: true,
				data,
				message: 'Account Updated Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<ResultPromise<Account>> {
		try {
			const data = await this.accountService.remove(id);
			return {
				success: true,
				data,
				message: 'Account Deleted Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				message: error,
			};
		}
	}
}
