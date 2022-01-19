import { todoCollection } from '$lib/database';
import type { GetTodoCountResult } from '$lib/todo/model';

import { wrapper } from '../_api-wrapper';

import type { Locals } from '$types';

export const get = wrapper<Locals, never, GetTodoCountResult>(async (req) => {
  const { mongo } = req.locals;

  const col = todoCollection(mongo);

  const todayStartDate = new Date(new Date().toISOString().split('T')[0]);

  // FIXME: Can we achieve this result w/o making multi-request to database? 🤔
  const [total, today] = await Promise.all([
    col.countDocuments(),
    col.countDocuments({ created: { $gte: todayStartDate } }),
  ]);

  return { body: { count: { total, today } } };
});
