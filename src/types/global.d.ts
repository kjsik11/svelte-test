import type { ObjectId } from 'mongodb';

declare global {
  type OurId = ObjectId | string;
  type OurDate = Date | string;
}
