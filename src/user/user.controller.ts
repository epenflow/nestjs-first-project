import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

interface ResultPromise<T> {
	success: boolean;
	data: T | undefined;
	message: string;
}

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
	): Promise<ResultPromise<any>> {
		try {
			const data: User = await this.userService.create(createUserDto);
			return {
				success: true,
				data,
				message: `User Created Successfully`,
			};
		} catch (error) {
			return {
				success: false,
				data: undefined,
				message: error,
			};
		}
	}

	@Get()
	async findAll(): Promise<ResultPromise<User[]>> {
		try {
			const data: User[] = await this.userService.findAll();
			return {
				success: true,
				data,
				message: 'User Fetched Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: undefined,
				message: error,
			};
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<ResultPromise<User>> {
		try {
			const data = await this.userService.findOne(+id);
			return {
				success: true,
				data,
				message: 'User Fetched Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: undefined,
				message: error,
			};
		}
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<ResultPromise<User>> {
		try {
			const data: User = await this.userService.update(
				+id,
				updateUserDto,
			);
			return {
				success: true,
				data,
				message: 'User Updated Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: undefined,
				message: error,
			};
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<ResultPromise<User>> {
		try {
			const data = await this.userService.remove(+id);
			return {
				success: true,
				data,
				message: 'User Deleted Successfully',
			};
		} catch (error) {
			return {
				success: false,
				data: undefined,
				message: error,
			};
		}
	}
}
