import type { MongoDB } from '$utils/mongodb/connect';

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export interface Locals {
  userId: string;
  mongo: MongoDB;
}
