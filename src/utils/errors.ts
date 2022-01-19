import { StatusCodes } from 'http-status-codes';

import type { EndpointOutput } from '@sveltejs/kit';

// Define defaults
export const ERRORS = {
  // Common Errors
  INTERNAL_SERVER_ERROR: {
    name: 'InternalServerError',
    code: 'CE000',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Unhandled error occured.',
  },
  METHOD_NOT_ALLOWED: {
    name: 'MethodNotAllowed',
    code: 'CE001',
    statusCode: StatusCodes.METHOD_NOT_ALLOWED,
    message: 'Method is not allowed.',
  },
  VALIDATION_ERROR: {
    name: 'ValidationError',
    code: 'CE002',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid data in query string or request body. Please check your request.',
  },
} as const;

type ErrorKey = keyof typeof ERRORS;
type ErrorName = typeof ERRORS[keyof typeof ERRORS]['name'];
type ErrorCode = typeof ERRORS[keyof typeof ERRORS]['code'];

export class ApiError {
  name: ErrorName;
  code: ErrorCode;
  message: string;
  statusCode: StatusCodes;

  constructor(key: ErrorKey, message?: string, statusCode?: StatusCodes) {
    this.name = ERRORS[key].name;
    this.code = ERRORS[key].code;
    this.message = message || ERRORS[key].message;
    this.statusCode = statusCode ?? ERRORS[key].statusCode;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isApiError(err: any): err is ApiError {
    return (
      err.code !== undefined &&
      err.statusCode !== undefined &&
      err.name !== undefined &&
      err.message !== undefined
    );
  }

  toJson(withDetails = false): ApiErrorJson {
    return withDetails
      ? {
          name: this.name,
          code: this.code,
          message: this.message,
        }
      : { name: this.name, code: this.code };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isApiErrorJson(err: any): err is ApiErrorJson {
    return err.code !== undefined && err.name !== undefined;
  }

  toResponse(withDetails = false): EndpointOutput<ApiErrorJson> {
    return {
      status: this.statusCode,
      body: this.toJson(withDetails),
    };
  }
}

export type ApiErrorJson = Pick<ApiError, 'name' | 'code'> & { message?: string };
