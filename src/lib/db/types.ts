import { ObjectId } from 'mongodb';

export interface DateIdea {
  _id?: ObjectId;
  title: string;
  description: string;
  estimatedCost: string;
  icon: string;
  city: string;
  likeCount: number;
  createdAt: Date;
}

export interface Like {
  _id?: ObjectId;
  userId: string;
  dateIdeaId: ObjectId;
  createdAt: Date;
}

export interface User {
  _id?: ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}