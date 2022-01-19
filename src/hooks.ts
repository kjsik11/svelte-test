import { v4 as uuid } from '@lukeed/uuid';
import cookie from 'cookie';

import { connectMongo } from '$utils/mongodb/connect';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
  const cookies = cookie.parse(request.headers.cookie || '');
  request.locals.userId = cookies.userId || uuid();
  request.locals.mongo = await connectMongo();

  const response = await resolve(request);

  if (!cookies.userId) {
    // if this is the first time the user has visited this app,
    // set a cookie so that we recognise them when they return
    response.headers['set-cookie'] = cookie.serialize('userId', request.locals.userId, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // Expires in 30days.
    });
  }

  return response;
};
