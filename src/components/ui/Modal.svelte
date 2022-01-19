<script lang="ts">
  import { Transition, TransitionChild, Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
  import clsx from 'clsx';

  import { closeModal, ModalProps, modalStore } from '$lib/hooks/use-modal';

  import { CheckIcon, ExclamationIcon } from '$components/icons';

  let props: ModalProps;

  let cancelButtonRef: HTMLButtonElement;

  modalStore.subscribe((modalProps) => {
    props = modalProps;
  });
</script>

<Transition show={props.show}>
  <Dialog
    as="div"
    class="fixed z-50 inset-0 overflow-y-auto"
    initialFocus={cancelButtonRef}
    open={props.show}
  >
    <div class="flex items-center justify-center min-h-f pt-32 px-6 text-center sm:block sm:p-0">
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-75"
        leave="ease-in duration-200"
        leaveFrom="opacity-75"
        leaveTo="opacity-0"
        entered="opacity-75"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <TransitionChild
        enter="ease-out transform duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in transform duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div
            class={clsx({
              'sm:flex sm:items-start': props.variant === 'alert',
            })}
          >
            <div
              class={clsx('mx-auto flex items-center justify-center h-12 w-12 rounded-full', {
                'bg-green-100': props.variant === 'default',
                'flex-shrink-0 bg-red-100 sm:mx-0 sm:h-10 sm:w-10': props.variant === 'alert',
              })}
            >
              {#if props.variant === 'default'}
                <CheckIcon class="h-6 w-6 text-green-600" />
              {:else if props.variant === 'alert'}
                <ExclamationIcon class="h-6 w-6 text-red-600" />
              {/if}
            </div>
            <div
              class={clsx('mt-3 text-center', {
                'sm:mt-5': props.variant === 'default',
                'sm:mt-0 sm:ml-4 sm:text-left': props.variant === 'alert',
              })}
            >
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                {props.title}
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">{props.content}</p>
              </div>
            </div>
          </div>
          <div
            class={clsx('mt-5', {
              'sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense':
                props.variant === 'default',
              'sm:mt-4 sm:flex sm:flex-row-reverse': props.variant === 'alert',
            })}
          >
            <button
              type="button"
              class={clsx(
                'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm',
                {
                  'bg-blue-400 hover:bg-lightBlue-500 sm:col-start-2': props.variant === 'default',
                  'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 sm:ml-3 sm:w-auto':
                    props.variant === 'alert',
                },
              )}
              on:click={async () => {
                closeModal();
                if (props.actionButton.onClick) await props.actionButton.onClick();
              }}
            >
              {props.actionButton.label}
            </button>
            {#if props.cancelButton}
              <button
                bind:this={cancelButtonRef}
                type="button"
                class={clsx(
                  'mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:text-sm',
                  {
                    'sm:col-start-1': props.variant === 'default',
                    'sm:w-auto': props.variant === 'alert',
                  },
                )}
                on:click={async () => {
                  closeModal();
                  if (props.cancelButton?.onClick) await props.cancelButton.onClick();
                }}
              >
                {props.cancelButton.label}
              </button>
            {/if}
          </div>
        </div>
      </TransitionChild>
    </div>
  </Dialog>
</Transition>
