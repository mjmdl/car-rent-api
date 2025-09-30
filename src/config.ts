import { INestApplication, Type, ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";

export function configCors(app: INestApplication): void {
    app.enableCors({
        origin: '*',
        methods: ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'],
    });
}

export function configValidator(app: INestApplication): void {
    app.useGlobalPipes(new ValidationPipe({
        always: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        transform: true,
        whitelist: true,
    }));
}

export function configTransformer(app: INestApplication, module: Type): void {
    useContainer(app.select(module), { fallbackOnErrors: true });
}