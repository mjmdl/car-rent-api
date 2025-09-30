import { Inject, Injectable } from "@nestjs/common";
import { compare, genSalt, hash } from "bcrypt";
import { PasswordHashModuleOptions } from "src/password-hash/password-hash-options";
import { PasswordHashService } from "src/password-hash/password-hash.service";
import { BCRYPT_HASH_MODULE_OPTIONS } from "./bcrypt-hash-config";

@Injectable()
export class BcryptHashServiceImpl implements PasswordHashService {
	constructor(
		@Inject(BCRYPT_HASH_MODULE_OPTIONS)
		private readonly options: PasswordHashModuleOptions,
	) {}

	async apply(password: string): Promise<string> {
		const salt = await genSalt(this.options.saltRounds);
		return hash(password, salt);
	}

	async compare(password: string, storedPassword: string): Promise<boolean> {
		return compare(password, storedPassword);
	}
}