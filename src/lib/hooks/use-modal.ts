import { writable } from 'svelte/store';

import type { MaybePromise } from '@sveltejs/kit/types/helper';

export type ModalProps = {
  variant?: 'default' | 'alert';
  show: boolean;
  title: string;
  content: string;
  actionButton: {
    label: string;
    onClick?: () => MaybePromise<void>;
  };
  cancelButton?: {
    label: string;
    onClick?: () => MaybePromise<void>;
  };
};

export const modalStore = writable<ModalProps>({
  variant: 'default',
  show: false,
  title: '',
  content: '',
  actionButton: {
    label: '',
  },
  cancelButton: {
    label: 'Cancel',
  },
});

export const closeModal = () => {
  modalStore.update((prev) => ({
    ...prev,
    show: false,
  }));
};

export const showModal = ({
  variant = 'default',
  cancelButton = { label: 'cancel' },
  ...modalProps
}: Omit<ModalProps, 'show'>) => {
  modalStore.set({
    variant,
    cancelButton,
    ...modalProps,
    show: true,
  });
};
