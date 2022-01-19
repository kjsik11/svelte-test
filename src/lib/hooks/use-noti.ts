import { writable } from 'svelte/store';

import { ApiError } from '$utils/errors';

export type NotificationProps = {
  variant?: 'default' | 'alert';
  show: boolean;
  title: string;
  content?: string;
};

export const notiStore = writable<NotificationProps>({
  variant: 'default',
  show: false,
  title: '',
});

let notificationTimer: NodeJS.Timeout | null = null;

export const closeNoti = () => {
  if (notificationTimer) clearTimeout(notificationTimer);

  notiStore.update((prev) => ({
    ...prev,
    show: false,
  }));
};

export const showNoti = (
  { variant = 'default', ...notiProps }: Omit<NotificationProps, 'show'>,
  autoCloseDurationMS: number | false = 3000,
) => {
  notiStore.set({
    variant,
    ...notiProps,
    show: true,
  });

  if (notificationTimer) clearTimeout(notificationTimer);
  if (autoCloseDurationMS) notificationTimer = setTimeout(closeNoti, autoCloseDurationMS);
};

export const showError = (error: unknown, autoCloseDurationMS: number | false = 3000): void => {
  if (ApiError.isApiErrorJson(error))
    return showNoti(
      { variant: 'alert', title: `[${error.code}] ${error.name}`, content: error.message },
      autoCloseDurationMS,
    );

  if (error instanceof Error)
    return showNoti({ variant: 'alert', title: error.name, content: error.message });

  showNoti({
    variant: 'alert',
    title: 'Handling unknown error type',
    content: JSON.stringify(error),
  });
  console.error(error);
};
