import { fetcher } from '$lib/fetcher';

import type {
  GetTodoCountResult,
  GetTodoResult,
  PatchTodo,
  PostTodo,
  PostTodoResult,
} from './model';

export async function getTodoList(): Promise<GetTodoResult> {
  return await fetcher.get('/todo.json').json<GetTodoResult>();
}

export async function postTodo(todoInput: PostTodo): Promise<string> {
  const { todoId } = await fetcher.post('/todo.json', { json: todoInput }).json<PostTodoResult>();

  return String(todoId);
}

export async function getTodoCount(): Promise<{ total: number; today: number }> {
  const { count } = await fetcher.get('/todo/count.json').json<GetTodoCountResult>();

  return count;
}

export async function patchTodoById(todoId: OurId, { text, done }: PatchTodo): Promise<void> {
  await fetcher.patch(`/todo/${todoId}.json`, { json: { text, done } });
}

export async function deleteTodoById(todoId: OurId): Promise<void> {
  await fetcher.delete(`/todo/${todoId}.json`);
}
