import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ApiExceptionFilter } from "./api-exception.filter";
import { ServerSettingsService } from "src/settings/server-settings.service";
import { EndpointLoggerMiddleware } from "./endpoint-logger.middleware";

@Module({
	providers: [
		{ provide: APP_FILTER, useClass: ApiExceptionFilter },
	],
})
export class ApiModule implements NestModule {
	constructor(private readonly serverSettingsService: ServerSettingsService) {}

	configure(consumer: MiddlewareConsumer) {
		if (this.serverSettingsService.isDevelopment()) {
			consumer.apply(EndpointLoggerMiddleware).forRoutes('*');
		}
	}
}