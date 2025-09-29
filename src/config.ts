import { INestApplication, Type, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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

export function configDocs(app: INestApplication, docsPath: string): void {
    const title = process.env.npm_package_name ?? "car-rent-api";
    const version = process.env.npm_package_version ?? "1.0.0";
    const description = process.env.npm_package_description ?? "Car Rent API";

    const config = new DocumentBuilder()
        .setTitle(title)
        .setVersion(version)
        .setDescription(description)
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(docsPath, app, document, {
        customSiteTitle: title,
    });
}