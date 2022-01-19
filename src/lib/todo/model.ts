// Database Schema
export interface Todo {
  _id: OurId;
  userId: string;
  text: string;
  done: boolean;
  created: OurDate;
  lastUpdated: OurDate;
  deleted?: OurDate;
}

// Scopes
export type TodoSimple = Omit<Todo, 'userId' | 'created' | 'deleted'>;

// Method Types
export type GetTodoCountResult = { count: { total: number; today: number } };

export type GetTodoResult = TodoSimple[];

export type PostTodo = Pick<Todo, 'text'>;
export type PostTodoResult = { todoId: OurId };

export type PatchTodo = Partial<Pick<Todo, 'text' | 'done'>>;
