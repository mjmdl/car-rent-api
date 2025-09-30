import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SettingsModule } from './settings/settings.module';
import { PasswordHashModule } from './password-hash/password-hash.module';

@Module({
	imports: [
		DatabaseModule.forRoot(),
		SettingsModule,
	],
})
export class AppModule {}