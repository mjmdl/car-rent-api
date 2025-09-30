import { Inject, Injectable } from "@nestjs/common";
import { StatefulTokenService } from "src/stateful-token/stateful-token.service";
import { JWT_TOKEN_MODULE_OPTIONS } from "./jwt-token-config";
import { StatefulTokenModuleOptions } from "src/stateful-token/stateful-token-options";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenServiceImpl implements StatefulTokenService {
	constructor(
		@Inject(JWT_TOKEN_MODULE_OPTIONS)
		private readonly options: StatefulTokenModuleOptions,
		private readonly jwtService: JwtService,
	) {}

	async sign(payload: object): Promise<string> {
		return this.jwtService.signAsync(payload, { secret: this.options.secret });
	}

	async verify<T extends object>(token: string): Promise<T> {
		return this.jwtService.verifyAsync(token, { secret: this.options.secret });
	}

	async decode<T>(token: string): Promise<T> {
		return this.jwtService.decode(token);
	}
}