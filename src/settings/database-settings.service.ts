export abstract class DatabaseSettingsService {
	abstract getHost(): string;
	abstract getPort(): number;
	abstract getUsername(): string;
	abstract getPassword(): string;
	abstract getDatabase(): string;
	abstract getSchema(): string;
	abstract isMigrated(): boolean;
}