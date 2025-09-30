import { Injectable } from "@nestjs/common";
import { ServerSettingsService } from "../server-settings.service";
import { EnvSettingsCoreService } from "./env-settings-core.service";
import { ServerMode } from "./environment";

@Injectable()
export class ServerSettingsServiceImpl implements ServerSettingsService {
	constructor(private readonly settingsService: EnvSettingsCoreService) {}

	getPort(): number {
		return this.settingsService.getNumberOrThrow('SERVER_PORT');
	}

	isDevelopment(): boolean {
		return this.getMode() === ServerMode.DEVELOPMENT;
	}

	isProduction(): boolean {
		return this.getMode() === ServerMode.PRODUCTION;
	}

	private getMode(): ServerMode {
		return this.settingsService.getOrThrow('SERVER_MODE') as ServerMode;
	}
}