import ky from 'ky';

export const fetcher = ky.extend({
  hooks: {
    afterResponse: [
      async (_req, _opt, res) => {
        if (!res.ok && res.status !== 204 && res.status !== 304) {
          const contentType = res.headers.get('Content-Type');
          if (!contentType || contentType.indexOf('application/json') === -1)
            throw await res.text();

          const error = await res.json();
          if (process.env.NODE_ENV === 'development') {
            console.log(error);
          }

          throw error;
        }
      },
    ],
  },
});
