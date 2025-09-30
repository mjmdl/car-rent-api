import { INestApplication } from "@nestjs/common";

export function configCors(app: INestApplication): void {
    app.enableCors({
        origin: '*',
        methods: ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'],
    });
}