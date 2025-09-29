import { IsEnum, IsNotEmpty, IsPort } from "class-validator";

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
}