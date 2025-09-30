import { DynamicModule, Module } from "@nestjs/common";
import { PasswordHashModuleOptions } from "src/password-hash/password-hash-options";
import { PasswordHashService } from "src/password-hash/password-hash.service";
import { BcryptHashServiceImpl } from "./bcrypt-hash.service";
import { BCRYPT_HASH_MODULE_OPTIONS } from "./bcrypt-hash-config";

@Module({})
export class BcryptHashModule {
	static register(options: PasswordHashModuleOptions): DynamicModule {
		return {
			module: BcryptHashModule,
			providers: [
				{ provide: BCRYPT_HASH_MODULE_OPTIONS, useValue: options },
				{ provide: PasswordHashService, useClass: BcryptHashServiceImpl },
			],
			exports: [PasswordHashService],
		};
	}
}