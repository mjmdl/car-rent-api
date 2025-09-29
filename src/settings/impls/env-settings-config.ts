import { DynamicModule, Logger } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { plainToInstance } from "class-transformer";
import { Environment } from "./environment";
import { validateSync } from "class-validator";

export function configSettings(): Promise<DynamicModule> {
	return ConfigModule.forRoot({ validate: validateEnvironment });
}

function validateEnvironment(config: Record<string, any>): typeof config {
	const env = plainToInstance(Environment, config);
	const errors = validateSync(env);

	if (errors.length > 0) {
		const constraints = errors.flatMap(
			error => error.constraints === undefined ? [] : Object.values(error.constraints),
		);
		for (const constraint of constraints) Logger.fatal(constraint, 'Environment');
		throw new Error(`${errors.length} environment variables with ${constraints.length} validation errors.`);
	}

	return config;
}