export abstract class StatefulTokenService {
	abstract sign(payload: object): Promise<string>;
	abstract decode<T>(token: string): Promise<T>;
	abstract verify<T extends object>(token: string): Promise<T>;
}