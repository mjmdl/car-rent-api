import { DynamicModule, Module } from "@nestjs/common";
import { StatefulTokenModuleOptions } from "src/stateful-token/stateful-token-options";
import { JWT_TOKEN_MODULE_OPTIONS } from "./jwt-token-config";
import { StatefulTokenService } from "src/stateful-token/stateful-token.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenServiceImpl } from "./jwt-token.service";

@Module({})
export class JwtTokenModule {
	static register(options: StatefulTokenModuleOptions): DynamicModule {
		return {
			module: JwtTokenModule,
			imports: [
				JwtModule.register({
					global: false,
					secret: options.secret,
					signOptions: { expiresIn: options.durationSeconds },
				}),
			],
			providers: [
				{ provide: JWT_TOKEN_MODULE_OPTIONS, useValue: options },
				{ provide: StatefulTokenService, useClass: JwtTokenServiceImpl },
			],
			exports: [StatefulTokenService],
		}
	}
}