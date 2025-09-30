import { Type } from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { ExceptionWithTag } from './tagged-exception';

type SwaggerResponseDecorator = (options?: swagger.ApiResponseNoStatusOptions) => MethodDecorator & ClassDecorator;
type SwaggerRenderableType = Type<unknown> | Function | [Function] | string;
type CustomSuccessDecoratorOptions = { isArray?: boolean };
type CustomSuccessDecorator = (description?: string, type?: SwaggerRenderableType, options?: CustomSuccessDecoratorOptions) => MethodDecorator & ClassDecorator;
type CustomFailureDecorator = (...errors: ExceptionWithTag[]) => MethodDecorator & ClassDecorator;

function stringifyExceptions(list: ExceptionWithTag[]): string {
	let result = '';
	for (const error of list) result += `\n - ${error}`
	return result;
}

function defineApiSuccessResponse(OriginalDecorator: SwaggerResponseDecorator, descriptionTitle: string): CustomSuccessDecorator {
	return  (description?: string, type?: SwaggerRenderableType): MethodDecorator & ClassDecorator => {
		const Decorator = OriginalDecorator({ description: `**${descriptionTitle}**: ${description}`, type });

		return ((object, propertyKey, descriptor): void => {
			Decorator(object, propertyKey, descriptor);
		}) as (MethodDecorator & ClassDecorator);
	};
}

function defineApiFailureResponse(OriginalDecorator: SwaggerResponseDecorator, descriptionTitle: string): CustomFailureDecorator {
	return (...errors: ExceptionWithTag[]): MethodDecorator & ClassDecorator => {
		const Decorator = OriginalDecorator({ description: `**${descriptionTitle}**: ${stringifyExceptions(errors)}` });

		return ((object, propertyKey, descriptor): void => {
			Decorator(object, propertyKey, descriptor);
		}) as (MethodDecorator & ClassDecorator);
	};
}

export const ApiOkResponse = defineApiSuccessResponse(swagger.ApiOkResponse, 'OK');
export const ApiCreatedResponse = defineApiSuccessResponse(swagger.ApiCreatedResponse, 'Created');
export const ApiAcceptedResponse = defineApiSuccessResponse(swagger.ApiAcceptedResponse, 'Accepted');
export const ApiNoContentResponse = defineApiSuccessResponse(swagger.ApiNoContentResponse, 'No Content');
export const ApiResetContentResponse = defineApiSuccessResponse(swagger.ApiResetContentResponse, 'Reset Content');
export const ApiBadRequestResponse = defineApiFailureResponse(swagger.ApiBadRequestResponse, 'Bad Request');
export const ApiUnauthorizedResponse = defineApiFailureResponse(swagger.ApiUnauthorizedResponse, 'Unauthorized');
export const ApiForbiddenResponse = defineApiFailureResponse(swagger.ApiForbiddenResponse, 'Forbidden');
export const ApiNotFoundResponse = defineApiFailureResponse(swagger.ApiNotFoundResponse, 'Not Found');
export const ApiMethodNotAllowedResponse = defineApiFailureResponse(swagger.ApiMethodNotAllowedResponse, 'Method Not Allowed');
export const ApiNotAcceptableResponse = defineApiFailureResponse(swagger.ApiNotAcceptableResponse, 'Not Acceptable');
export const ApiRequestTimeoutResponse = defineApiFailureResponse(swagger.ApiRequestTimeoutResponse, 'Request Timeout');
export const ApiConflictResponse = defineApiFailureResponse(swagger.ApiConflictResponse, 'Conflict');
export const ApiGoneResponse = defineApiFailureResponse(swagger.ApiGoneResponse, 'Gone');
export const ApiPayloadTooLargeResponse = defineApiFailureResponse(swagger.ApiPayloadTooLargeResponse, 'Payload Too Large');
export const ApiUnsupportedMediaTypeResponse = defineApiFailureResponse(swagger.ApiUnsupportedMediaTypeResponse, 'Unsupported Media Type');
export const ApiUnprocessableEntityResponse = defineApiFailureResponse(swagger.ApiUnprocessableEntityResponse, 'Unprocessable Entity');
export const ApiInternalServerErrorResponse = defineApiFailureResponse(swagger.ApiInternalServerErrorResponse, 'Internal Server Error');
export const ApiNotImplementedResponse = defineApiFailureResponse(swagger.ApiNotImplementedResponse, 'Not Implemented');
export const ApiBadGatewayResponse = defineApiFailureResponse(swagger.ApiBadGatewayResponse, 'Bad Gateway');
export const ApiServiceUnavailableResponse = defineApiFailureResponse(swagger.ApiServiceUnavailableResponse, 'Service Unavailable');
export const ApiGatewayTimeoutResponse = defineApiFailureResponse(swagger.ApiGatewayTimeoutResponse, 'Gateway Timeout');
export const ApiDefaultResponse = defineApiFailureResponse(swagger.ApiDefaultResponse, 'Default');