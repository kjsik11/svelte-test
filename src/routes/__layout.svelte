<script lang="ts">
  import '../app.css';
  import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';

  import { Notification, Modal } from '$components/ui';

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <main class="relative h-screen">
    <slot />
  </main>

  <!-- Assertives -->
  <Notification />
  <Modal />
</QueryClientProvider>
