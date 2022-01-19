import Joi from 'joi';

import type { PatchTodo, PostTodo } from './model';

export async function validatePostTodo(body: unknown): Promise<PostTodo> {
  return (await Joi.object({
    text: Joi.string().max(100).required(),
  }).validateAsync(body)) as PostTodo;
}

export async function validatePatchTodo(body: unknown): Promise<PatchTodo> {
  return (
    (await Joi.object({ text: Joi.string().max(100), done: Joi.bool() })
      // Need at least one key
      .min(1)
      .validateAsync(body)) as PatchTodo
  );
}
