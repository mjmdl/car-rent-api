import { DynamicModule, Module } from "@nestjs/common";
import { BcryptHashModule } from "./impls/bcrypt-hash/bcrypt-hash.module";
import { PasswordHashModuleOptions } from "./password-hash-options";

@Module({})
export class PasswordHashModule {
	static register(options: PasswordHashModuleOptions = { saltRounds: 12 }): DynamicModule {
		return BcryptHashModule.register(options);
	}
}