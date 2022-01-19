import type { MongoDB } from '$utils/mongodb/connect';

import type { Todo } from '$lib/todo/model';

export const todoCollection = (mongo: MongoDB) => mongo.db.collection<Todo>('todo');
