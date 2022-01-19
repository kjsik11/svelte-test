<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import { showError, showNoti } from '$lib/hooks/use-noti';
  import { postTodo } from '$lib/todo/client';
  import type { TodoSimple } from '$lib/todo/model';

  let todoText = '';
  let loading = false;

  const dispatch = createEventDispatcher<{ submit: TodoSimple }>();

  const handleSubmit = () => {
    loading = true;
    postTodo({ text: todoText })
      .then((todoId) => {
        dispatch('submit', { _id: todoId, text: todoText, done: false, lastUpdated: new Date() });
        showNoti({ title: 'Success', content: 'A todo item has been saved.' });
        todoText = '';
      })
      .catch(showError)
      .finally(() => {
        loading = false;
      });
  };
</script>

<form class={$$props.class} name="todo" id="todo" on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    bind:value={todoText}
    placeholder="What needs to be done?"
    maxlength={50}
    required
  />
  <button type="submit" hidden disabled={loading}>submit</button>
</form>

<style>
  input {
    @apply shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md;
  }
</style>
