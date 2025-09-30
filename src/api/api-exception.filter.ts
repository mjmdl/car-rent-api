import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotImplementedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(ApiExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost): void {
		const httpHost = host.switchToHttp();
		const request: Request = httpHost.getRequest();
		const response: Response = httpHost.getResponse();

		if (exception instanceof NotImplementedException || exception.message === 'Method not implemented.') {
			this.logger.warn(`${request.method}${request.url}: Not implemented: ${exception.stack}`);
			response.status(HttpStatus.NOT_IMPLEMENTED).send();
			return;
		}

		if (exception instanceof HttpException) {
			response
				.status(exception.getStatus())
				.json(exception.getResponse());
			return;
		}

		this.logger.error(`${request.method}${request.url}: ${exception.stack}`);
		response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
	}
}
