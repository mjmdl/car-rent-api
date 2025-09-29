import { IsBooleanString, IsEnum, IsNotEmpty, IsPort, IsString, IsUrl } from "class-validator";

export enum ServerMode {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
}

export class Environment {
    @IsNotEmpty()
    @IsPort()
    SERVER_PORT!: string;

    @IsNotEmpty()
    @IsEnum(ServerMode)
    SERVER_MODE!: string;

    @IsNotEmpty()
    @IsUrl()
    POSTGRES_HOST!: string;

    @IsNotEmpty()
    @IsPort()
    POSTGRES_PORT!: string;

    @IsNotEmpty()
    @IsString()
    POSTGRES_USERNAME!: string;

    @IsNotEmpty()
    @IsString()
    POSTGRES_PASSWORD!: string;

    @IsNotEmpty()
    @IsString()
    POSTGRES_DATABASE!: string;

    @IsNotEmpty()
    @IsString()
    POSTGRES_SCHEMA!: string;

    @IsNotEmpty()
    @IsBooleanString()
    POSTGRES_MIGRATE!: string;
}