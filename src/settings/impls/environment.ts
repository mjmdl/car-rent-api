import { IsNotEmpty, IsPort } from "class-validator";

export class Environment {
    @IsNotEmpty()
    @IsPort()
    SERVER_PORT!: number;
}