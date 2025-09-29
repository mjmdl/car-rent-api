import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configCors, configDocs, configTransformer, configValidator } from './config';
import { ServerSettingsService } from './settings/server-settings.service';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const serverSettings = app.get(ServerSettingsService);

	configCors(app);
	configValidator(app);
	configTransformer(app, AppModule);

	const docsPath = 'docs';
	if (serverSettings.isDevelopment()) configDocs(app, docsPath);

	await app.listen(serverSettings.getPort(), async () => {
		const url = await app.getUrl();
		Logger.log(`Server port: ${url}`, 'API');

		if (serverSettings.isDevelopment()) Logger.log(`Documentation: ${url}/${docsPath}`, 'API');
	});
}
bootstrap();