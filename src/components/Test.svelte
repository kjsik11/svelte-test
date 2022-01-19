<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';

  import { fetcher } from '$lib/fetcher';

  const data = useQuery('time', async () => await fetcher('/api/time.json').json());
</script>

<div class="p-4 max-w-screen-md mx-auto">
  <h1 class="text-2xl text-center mt-12 font-bold">Jongsik prac</h1>
  {JSON.stringify(data)}
</div>
