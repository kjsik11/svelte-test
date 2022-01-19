import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { ApiError } from '$utils/errors';

import { todoCollection } from '$lib/database';
import type { GetTodoResult, PostTodo, PostTodoResult } from '$lib/todo/model';
import type { TodoSimple } from '$lib/todo/model';
import { validatePostTodo } from '$lib/todo/validator';

import { wrapper } from '../_api-wrapper';

import type { Locals } from '$types';

export const get = wrapper<Locals, never, GetTodoResult>(async (req) => {
  const { userId, mongo } = req.locals;

  const todos = await todoCollection(mongo)
    .find({ userId, deleted: { $exists: false } })
    .project<TodoSimple>({ userId: 0, created: 0, deleted: 0 })
    .sort({ _id: 1 })
    .toArray();

  return { body: todos };
});

export const post = wrapper<Locals, PostTodo, PostTodoResult>(async (req) => {
  const { userId, mongo } = req.locals;
  const { text } = await validatePostTodo(req.body);

  const now = new Date();
  const todoId = new ObjectId();

  const result = await todoCollection(mongo).insertOne({
    _id: todoId,
    userId,
    text,
    done: false,
    created: now,
    lastUpdated: now,
  });

  if (!result.acknowledged) throw new ApiError('MONGO_ACK_FAILED');

  return {
    status: StatusCodes.CREATED,
    body: { todoId },
  };
});
