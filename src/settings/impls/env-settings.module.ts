import { ClassProvider, Module } from "@nestjs/common";
import { ServerSettingsService } from "../server-settings.service";
import { configSettings } from "./env-settings-config";
import { ServerSettingsServiceImpl } from "./server-settings.service";
import { EnvSettingsCoreService } from "./env-settings-core.service";

const PUBLIC_PROVIDERS: ClassProvider[] = [
    { provide: ServerSettingsService, useClass: ServerSettingsServiceImpl }
];

@Module({
    imports: [configSettings()],
    providers: [EnvSettingsCoreService, ...PUBLIC_PROVIDERS],
    exports: PUBLIC_PROVIDERS.map(({ provide }) => provide),
})
export class EnvSettingsModule {}