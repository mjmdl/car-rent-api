import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configCors, configTransformer, configValidator } from './config';
import { ServerSettingsService } from './settings/server-settings.service';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const serverSettings = app.get(ServerSettingsService);

	configCors(app);
	configValidator(app);
	configTransformer(app, AppModule);

	await app.listen(serverSettings.getPort(), async () => {
		const url = await app.getUrl();
		Logger.log(`Server port: ${url}`, 'API');
	});
}
bootstrap();