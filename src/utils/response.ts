import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

type SuccessResponse<T = unknown> = {
	success: true;
	message: string;
	data?: T;
};

type ErrorResponse = {
	success: false;
	error: string;
	message?: string;
};

type ResponseData<T = unknown> = SuccessResponse<T> | ErrorResponse;

/**
 * Send a success response
 */
export function success<T>(
	c: Context,
	data: T,
	message: string = "Success",
	status: ContentfulStatusCode = 200,
) {
	return c.json<SuccessResponse<T>>(
		{
			success: true,
			message,
			data,
		},
		status,
	);
}

/**
 * Send an error response
 */
export function error(
	c: Context,
	errorMessage: string,
	status: ContentfulStatusCode = 400,
	message?: string,
) {
	return c.json<ErrorResponse>(
		{
			success: false,
			error: errorMessage,
			...(message && { message }),
		},
		status,
	);
}

/**
 * Handle async operations with automatic error handling
 */
export async function handleAsync<T>(
	c: Context,
	fn: () => Promise<T>,
	successMessage: string = "Operation successful",
	errorMessage: string = "Operation failed",
	successStatus: ContentfulStatusCode = 200,
	errorStatus: ContentfulStatusCode = 400,
) {
	try {
		const data = await fn();
		return success(c, data, successMessage, successStatus);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : errorMessage;
		return error(c, message, errorStatus);
	}
}

/**
 * Send a created response (201)
 */
export function created<T>(
	c: Context,
	data: T,
	message: string = "Resource created successfully",
) {
	return success(c, data, message, 201);
}

/**
 * Send a no content response (204)
 */
export function noContent(c: Context) {
	return c.body(null, 204);
}

/**
 * Send a not found response (404)
 */
export function notFound(c: Context, message: string = "Resource not found") {
	return error(c, message, 404);
}

/**
 * Send an unauthorized response (401)
 */
export function unauthorized(
	c: Context,
	message: string = "Unauthorized",
) {
	return error(c, message, 401);
}

/**
 * Send a forbidden response (403)
 */
export function forbidden(c: Context, message: string = "Forbidden") {
	return error(c, message, 403);
}

/**
 * Send an internal server error response (500)
 */
export function internalError(
	c: Context,
	message: string = "Internal server error",
) {
	return error(c, message, 500);
}

