import { ENV } from '$utils/env';

import clientPromise from '.';

import type { Db, MongoClient } from 'mongodb';

const dbName = ENV('VITE_MONGODB_NAME');

export async function connectMongo(): Promise<MongoDB> {
  const client = await clientPromise;

  const db = client.db(dbName);

  return new MongoDB(client, db);
}

export class MongoDB {
  client: MongoClient;
  db: Db;

  constructor(client: MongoClient, db: Db) {
    this.client = client;
    this.db = db;
  }
}
