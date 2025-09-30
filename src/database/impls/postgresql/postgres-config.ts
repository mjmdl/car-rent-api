import { DynamicModule, InjectionToken, Type } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseSettingsService } from "src/settings/database-settings.service";
import { POSTGRESQL_MIGRATIONS } from "./migrations";
import { POSTGRESQL_ENTITIES } from "./entities";

export const POSTGRESQL_CONNECTION = "PostgreSQL";

export const POSTGRESQL_REPOSITORIES = new Map<InjectionToken, Type>([]);

export function configPostgres(): DynamicModule {
	return TypeOrmModule.forRootAsync({
		name: POSTGRESQL_CONNECTION,
		inject: [DatabaseSettingsService],
		useFactory: (databaseSettings: DatabaseSettingsService): TypeOrmModuleOptions => {
			return ({
			type: "postgres",
			host: databaseSettings.getHost(),
			port: databaseSettings.getPort(),
			username: databaseSettings.getUsername(),
			password: databaseSettings.getPassword(),
			database: databaseSettings.getDatabase(),
			schema: databaseSettings.getSchema(),
			migrationsRun: databaseSettings.isMigrated(),
			migrations: POSTGRESQL_MIGRATIONS,
			entities: POSTGRESQL_ENTITIES,
		})},
	});
}