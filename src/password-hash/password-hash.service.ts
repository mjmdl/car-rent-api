export abstract class PasswordHashService {
	abstract apply(password: string): Promise<string>;
	abstract compare(password: string, storedPassword: string): Promise<boolean>;
}