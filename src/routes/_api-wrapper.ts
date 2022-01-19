/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import { dev } from '$app/env';

import { ApiError } from '$utils/errors';

import type { RequestHandler } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const wrapper =
  <Locals = Record<string, any>, Input = unknown, Output extends DefaultBody = DefaultBody>(
    handler: RequestHandler<Locals, Input, Output>,
  ) =>
  async (req: ServerRequest<Locals, Input>) => {
    try {
      const res = await handler(req);

      if (!res) throw new ApiError('METHOD_NOT_ALLOWED');

      return res;
    } catch (error) {
      if (Joi.isError(error)) {
        return {
          status: StatusCodes.BAD_REQUEST,
          body: new ApiError('VALIDATION_ERROR', error.message).toJson(dev),
        };
      }

      if (ApiError.isApiError(error)) {
        return error.toResponse(dev);
      }

      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: new ApiError('INTERNAL_SERVER_ERROR', error?.message || 'Unhandled Error').toJson(
          dev,
        ),
      };
    }
  };
