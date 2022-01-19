import type { MongoClient } from 'mongodb';

declare namespace globalThis {
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}
