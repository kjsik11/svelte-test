import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { ApiError } from '$utils/errors';

import { todoCollection } from '$lib/database';
import type { PatchTodo } from '$lib/todo/model';
import { validatePatchTodo } from '$lib/todo/validator';

import { wrapper } from '../_api-wrapper';

import type { Locals } from '$types';

export const patch = wrapper<Locals, PatchTodo, never>(async (req) => {
  const { userId, mongo } = req.locals;
  const { todoId } = req.params;
  const { text, done } = await validatePatchTodo(req.body);

  const now = new Date();

  const result = await todoCollection(mongo).updateOne(
    {
      _id: new ObjectId(todoId),
      userId,
      deleted: { $exists: false },
    },
    {
      $set: { text, done, lastUpdated: now },
    },
  );

  if (!result.acknowledged) throw new ApiError('MONGO_ACK_FAILED');
  if (!result.matchedCount) throw new ApiError('NO_SUCH_TODO');
  if (!result.modifiedCount) return { status: StatusCodes.NOT_MODIFIED };

  return { status: StatusCodes.NO_CONTENT };
});

export const del = wrapper<Locals, never, never>(async (req) => {
  const { userId, mongo } = req.locals;
  const { todoId } = req.params;

  const col = todoCollection(mongo);

  const now = new Date();

  const result = await col.updateOne(
    {
      _id: new ObjectId(todoId),
      userId,
      deleted: { $exists: false },
    },
    {
      $set: { deleted: now },
    },
  );

  if (!result.acknowledged) throw new ApiError('MONGO_ACK_FAILED');
  if (!result.matchedCount) throw new ApiError('NO_SUCH_TODO');
  if (!result.modifiedCount) return { status: StatusCodes.NOT_MODIFIED };

  return { status: StatusCodes.NO_CONTENT };
});
