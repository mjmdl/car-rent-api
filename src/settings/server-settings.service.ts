export abstract class ServerSettingsService {
    abstract getPort(): number;
    abstract isDevelopment(): boolean;
    abstract isProduction(): boolean;
}