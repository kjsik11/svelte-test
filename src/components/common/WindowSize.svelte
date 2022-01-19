<script lang="ts">
  import { windowSizeStore, widthToBreakpoint } from '$lib/hooks/use-window-size';

  let innerWidth: number;
  let innerHeight: number;

  $: windowSizeStore.set({
    innerWidth,
    innerHeight,
    breakpoint: widthToBreakpoint(innerWidth),
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />
