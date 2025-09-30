import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class EndpointLoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger('API');

	use(request: Request, response: Response, next: NextFunction): void {
		const self = this;
		const startTime = Date.now();
		response.on('finish', () => {
			const endTime = Date.now();
			const duration = endTime - startTime;

			const FG_WHITE = '\x1b[37m';
			const BG_RED = '\x1b[41m';
			const BG_YELLOW = '\x1b[43m';
			const BG_GREEN = '\x1b[42m';
			const STYLE_RESET = '\x1b[0m';

			let statusColor: string;
			if (response.statusCode >= 500) {
				statusColor = BG_RED + FG_WHITE;
			} else if (response.statusCode >= 400) {
				statusColor = BG_YELLOW + FG_WHITE;
			} else {
				statusColor = BG_GREEN + FG_WHITE;
			}

			const statusText = `${statusColor}#${response.statusCode.toString().padStart(3, '0')}${STYLE_RESET}`;
			const durationText = `${duration.toString().padStart(2, ' ')} ms`;
			const message = `${statusText} ${durationText} ${request.method}${request.originalUrl}`;
			self.logger.verbose(message);
		});

		next();
	}
}