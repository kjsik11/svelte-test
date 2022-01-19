<script context="module" lang="ts">
  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/todo/count.json');

    if (res.ok) {
      const { count } = (await res.json()) as GetTodoCountResult;

      return { props: { count } };
    }

    const { message } = await res.json();

    return { error: new Error(message) };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import type { ApiErrorJson } from '$utils/errors';

  import { getTodoCount, getTodoList } from '$lib/todo/client';
  import type { GetTodoCountResult, TodoSimple } from '$lib/todo/model';

  import { TodoInput, TodoItem } from '$components/todo';
  import { Alert } from '$components/ui';

  import type { Load } from '@sveltejs/kit';

  // Props from `load` function
  export let count: GetTodoCountResult['count'];

  let todos: TodoSimple[] = [];
  let error: ApiErrorJson | undefined;

  onMount(async () => {
    try {
      todos = await getTodoList();
    } catch (err) {
      error = err;
    }
  });

  const onSubmit = (e: CustomEvent<TodoSimple>) => {
    todos = [...todos, e.detail];

    getTodoCount().then((newCount) => {
      count = newCount;
    });
  };

  const onUpdateTodo = (e: CustomEvent<TodoSimple>) => {
    todos = todos.map((todo) => (String(todo._id) !== String(e.detail._id) ? todo : e.detail));
  };

  const onDeleteTodo = (e: CustomEvent<OurId>) => {
    todos = todos.filter(({ _id }) => String(_id) !== String(e.detail));
  };
</script>

<svelte:head>
  <title>Todo App</title>
</svelte:head>

<div class="p-4 max-w-screen-md mx-auto">
  <h1 class="text-2xl font-bold">Todo App by <b>Coxwave</b></h1>

  <div class="mt-4 text-lg text-gray-600">
    <p>Created total: {count.total}</p>
    <p>Created today: {count.today}</p>
  </div>

  {#if error}
    <Alert class="my-4" {error} />
  {/if}

  <TodoInput class="mt-6" on:submit={onSubmit} />

  <div class="mt-6 space-y-4">
    {#each todos as todo (todo._id)}
      <TodoItem {todo} on:update={onUpdateTodo} on:delete={onDeleteTodo} />
    {/each}
  </div>
</div>
