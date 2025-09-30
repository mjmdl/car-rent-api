import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SettingsModule } from './settings/settings.module';
import { ApiModule } from './api/api.module';

@Module({
	imports: [
		ApiModule,
		DatabaseModule.forRoot(),
		SettingsModule,
	],
})
export class AppModule {}