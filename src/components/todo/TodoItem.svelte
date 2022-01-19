<script lang="ts">
  import clsx from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';

  import { showError } from '$lib/hooks/use-noti';
  import { deleteTodoById, patchTodoById } from '$lib/todo/client';
  import type { TodoSimple } from '$lib/todo/model';

  import { CheckIcon, PencilAltIcon, TrashIcon } from '$components/icons';

  // Props
  export let todo: TodoSimple;

  let value = todo.text;
  let loading = false;
  let editing = false;

  const dispatch = createEventDispatcher<{ update: TodoSimple; delete: OurId }>();

  const handleToggleDone = async () => {
    loading = true;
    try {
      await patchTodoById(todo._id, { done: !todo.done });

      dispatch('update', { ...todo, done: !todo.done });
    } catch (err) {
      showError(err);
    } finally {
      loading = false;
    }
  };

  const handleUpdateText = async () => {
    loading = true;
    try {
      await patchTodoById(todo._id, { text: value });

      dispatch('update', { ...todo, text: value });
    } catch (err) {
      showError(err);
    } finally {
      loading = false;
    }
  };

  const handleDelete = async () => {
    loading = true;
    try {
      await deleteTodoById(todo._id);

      dispatch('delete', todo._id);
    } catch (err) {
      showError(err);
    } finally {
      loading = false;
    }
  };
</script>

<div
  class={clsx($$props.class, 'todo')}
  class:done={todo.done}
  transition:scale|local={{ start: 0.7 }}
>
  <button class="toggle" aria-label="Toggle todo" disabled={loading} on:click={handleToggleDone}>
    {#if todo.done}
      <CheckIcon class="w-5 h-5" />
    {/if}
  </button>

  <form class="group" on:submit|preventDefault={handleUpdateText}>
    <input
      aria-label="Edit todo"
      type="text"
      name="text"
      bind:value
      required
      maxlength={50}
      on:focus={() => (editing = true)}
      on:blur={() => (editing = false)}
    />
    <button class:invisible={!editing} aria-label="Save todo" type="submit">
      <PencilAltIcon class="w-5 h-5" />
    </button>
  </form>

  <button class="delete" aria-label="Delete todo" disabled={loading} on:click={handleDelete}>
    <TrashIcon class="w-5 h-5" />
  </button>
</div>

<style>
  .todo {
    @apply py-2 px-3 rounded-md shadow-md flex items-center bg-white space-x-4 transition-colors;
  }

  .todo.done {
    @apply bg-gray-100;
  }

  button {
    @apply rounded-md;
  }

  button.toggle {
    @apply rounded-full border border-gray-300 w-6 h-6 transition-colors;
  }

  .done button.toggle {
    @apply border-gray-500;
  }

  button.delete {
    @apply text-gray-400 hover:text-gray-500 p-1 rounded-full;
  }

  form {
    @apply flex-1 flex items-center space-x-4;
  }

  form input {
    @apply flex-1 border-none focus:shadow-sm focus:ring-blue-500 focus:border-blue-500 block rounded-md bg-transparent transition-colors;
  }

  .done input {
    @apply text-gray-500;
  }
</style>
