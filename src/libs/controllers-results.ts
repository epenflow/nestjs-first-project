export interface ResultPromise<T> {
	success: boolean;
	data: T | undefined;
	message: any;
}
