import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	await app.listen(3000, async () => {
		const url = await app.getUrl();
		Logger.log(`Server port: ${url}`, 'API');
	});
}
bootstrap();