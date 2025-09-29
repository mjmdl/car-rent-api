import { Injectable } from "@nestjs/common";
import { ServerSettingsService } from "../server-settings.service";
import { EnvSettingsCoreService } from "./env-settings-core.service";

@Injectable()
export class ServerSettingsServiceImpl implements ServerSettingsService {
    constructor(private readonly settingsService: EnvSettingsCoreService) {}

    getPort(): number {
        return this.settingsService.getNumberOrThrow('SERVER_PORT');
    }
}