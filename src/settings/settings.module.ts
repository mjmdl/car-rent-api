import { Global, Module } from "@nestjs/common";
import { EnvSettingsModule } from "./impls/env-settings.module";

const IMPLEMENTATION = EnvSettingsModule;

@Global()
@Module({
	imports: [IMPLEMENTATION],
	exports: [IMPLEMENTATION],
})
export class SettingsModule {}