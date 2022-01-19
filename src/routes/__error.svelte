<script lang="ts" context="module">
  export const load: ErrorLoad = ({ error, status }) => {
    return { props: { error, status } };
  };
</script>

<script lang="ts">
  import type { ErrorLoad } from '@sveltejs/kit';

  export let error: Error;
  export let status: number;
</script>

<div class="absolute w-full h-full grid place-items-center">
  <section class="p-8 border-gray-500 rounded">
    <h1 class="text-center text-4xl font-mono-mt-4">{status}</h1>
    <p class="text-center">{error.message}</p>
  </section>
</div>
