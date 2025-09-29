import { DynamicModule, InjectionToken, Module, Type } from "@nestjs/common";
import { PostgresqlModule } from "./impls/postgresql/postgresql.module";

@Module({})
export class DatabaseModule {
	static forRoot(): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [PostgresqlModule],
		};
	}

	static forFeature(repositories: InjectionToken[] = []): DynamicModule {
		const featureProviders = PostgresqlModule.getFeatures(repositories);

		return {
			module: DatabaseModule,
			providers: featureProviders,
			exports: featureProviders,
		};
	}
}