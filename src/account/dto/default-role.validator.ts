import { AccountRole } from '@src/libs/account-role';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function DefaultRole(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'defaultRole',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					if (value !== undefined && value !== null) {
						return AccountRole.ATHLETE;
					}
					return value;
				},
				defaultMessage() {
					return `Role should not be empty`;
				},
			},
		});
	};
}
