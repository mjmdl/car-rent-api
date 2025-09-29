import { Injectable } from "@nestjs/common";
import { DatabaseSettingsService } from "../database-settings.service";
import { EnvSettingsCoreService } from "./env-settings-core.service";

@Injectable()
export class DatabaseSettingsServiceImpl implements DatabaseSettingsService {
	constructor(private readonly settingsService: EnvSettingsCoreService) {}

	getHost(): string {
		return this.settingsService.getOrThrow('POSTGRES_HOST');
	}

	getPort(): number {
		return this.settingsService.getNumberOrThrow('POSTGRES_PORT');
	}

	getUsername(): string {
		return this.settingsService.getOrThrow('POSTGRES_USERNAME');
	}

	getPassword(): string {
		return this.settingsService.getOrThrow('POSTGRES_PASSWORD');
	}

	getDatabase(): string {
		return this.settingsService.getOrThrow('POSTGRES_DATABASE');
	}

	getSchema(): string {
		return this.settingsService.getOrThrow('POSTGRES_SCHEMA');
	}

	isMigrated(): boolean {
		return this.settingsService.getBooleanOrThrow('POSTGRES_MIGRATE');
	}
}