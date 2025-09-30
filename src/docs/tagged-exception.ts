type ExceptionConstructor = new (...args: any[]) => object;

export interface ExceptionWithTag {
	readonly TAG: string;
	readonly MESSAGE: string;

	toString(): string;
}

export function TaggedException<Base extends ExceptionConstructor>(BaseClass: Base, tag: string, message: string): Base & ExceptionWithTag {
	return class Exception extends BaseClass {
		static readonly TAG = tag;
		static readonly MESSAGE = message;

		constructor(...args: any[]) {
			if (args.length) {
				super(...args);
			} else {
				super({ tag: Exception.TAG, message: Exception.MESSAGE });
			}
		}

		static toString(): string {
			return `**${Exception.TAG}**: ${Exception.MESSAGE}`;
		}
	};
}
