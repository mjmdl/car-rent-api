import { ClassProvider, DynamicModule, InjectionToken, Logger, Module, OnModuleInit, Type } from "@nestjs/common";
import { configPostgres, POSTGRESQL_CONNECTION, POSTGRESQL_REPOSITORIES } from "./postgres-config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSTGRESQL_ENTITIES } from "./entities";

@Module({})
export class PostgresqlModule implements OnModuleInit {
	static forRoot(): DynamicModule {
		const providers: ClassProvider[] = Array
			.from(POSTGRESQL_REPOSITORIES.entries())
			.map(([provide, useClass]): ClassProvider => ({ provide, useClass }));

		return {
			module: PostgresqlModule,
			imports: [
				configPostgres(),
				TypeOrmModule.forFeature(POSTGRESQL_ENTITIES, POSTGRESQL_CONNECTION),
			],
			providers,
		};
	}

	static getFeatures(repositories: InjectionToken[]): ClassProvider[] {
		const repositoriesSet = new Set(repositories);
		const featureProviders: ClassProvider[] = [];
		for (const repository of repositoriesSet) {
			const provider = POSTGRESQL_REPOSITORIES.get(repository);
			if (provider === undefined) throw new Error(`Could not find the provider for ${repository.toString()}.`);
			featureProviders.push({ provide: repository, useClass: provider });
		}
		return featureProviders;
	}

	onModuleInit() {
		Logger.log(`Database connection "${POSTGRESQL_CONNECTION}" stablished.`, PostgresqlModule.name);
	}
}