<script lang="ts">
  import { Transition } from '@rgossiaux/svelte-headlessui';
  import clsx from 'clsx';

  import { notiStore, closeNoti, NotificationProps } from '$lib/hooks/use-noti';

  import { CheckCircleIcon, XCircleIcon, XIcon } from '$components/icons';

  let props: NotificationProps;

  notiStore.subscribe((notiProps) => {
    props = notiProps;
  });
</script>

<Transition
  aria-live="assertive"
  show={props.show}
  class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
  enter="ease-out duration-300 transition"
  enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
  enterTo="translate-y-0 opacity-100 sm:translate-x-0"
  leave="transition ease-in duration-100"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div
    class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
  >
    <div class="p-4">
      <div class={clsx('flex', props.content ? 'items-start' : 'items-center')}>
        <div class="flex-shrink-0">
          {#if props.variant === 'default'}
            <CheckCircleIcon aria-hidden="true" class="w-6 h-6 text-green-400" />
          {:else if props.variant === 'alert'}
            <XCircleIcon aria-hidden="true" class="w-6 h-6 text-red-400" />
          {/if}
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="font-semibold text-gray-900">{props.title}</p>
          {#if props.content}
            <p class="mt-1 leading-5 font-medium text-gray-500">{props.content}</p>
          {/if}
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={closeNoti}
          >
            <span class="sr-only">Close</span>
            <XIcon aria-hidden="true" class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</Transition>
