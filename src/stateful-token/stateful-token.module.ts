import { DynamicModule, Module } from "@nestjs/common";
import { StatefulTokenModuleOptions } from "./stateful-token-options";
import { JwtTokenModule } from "./impls/jwt-token/jwt-token.module";

@Module({})
export class StatefulTokenModule {
	static register(options: StatefulTokenModuleOptions): DynamicModule {
		return JwtTokenModule.register(options);
	}
}