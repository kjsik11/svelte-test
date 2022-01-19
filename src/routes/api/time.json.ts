import { wrapper } from '../_api-wrapper';

export const get = wrapper(async () => {
  const now = new Date();
  return { body: now };
});
