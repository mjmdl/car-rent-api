import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Environment } from "./environment";

@Injectable()
export class EnvSettingsCoreService {
	constructor(private readonly configService: ConfigService) {}

	get<T>(name: keyof Environment): T | undefined {
		return this.configService.get(name);
	}

	getOrThrow<T>(name: keyof Environment): T {
		return this.configService.getOrThrow(name);
	}

	getNumber(name: keyof Environment): number | undefined {
		const value = this.get(name);
		if (value == undefined) return undefined;
		return Number(value);
	}

	getNumberOrThrow(name: keyof Environment): number {
		const value = this.getOrThrow(name);
		return Number(value);
	}

	getBoolean(name: keyof Environment): boolean | undefined {
		const value = this.get(name);
		if (value == undefined) return undefined;
		return this.unknownToBoolean(value);
	}

	getBooleanOrThrow(name: keyof Environment): boolean {
		const value = this.getOrThrow(name);
		return this.unknownToBoolean(value);
	}

	private unknownToBoolean(value: unknown): boolean {
		if (typeof value === 'boolean') return value;
		if (typeof value !== 'string') return false;
		return value === 'true';
	}
}