import {Entity, model, property} from '@loopback/repository';

@model()
export class Review extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  reviewId?: string;

  @property({
    type: 'string',
    required: true,
  })
  reviewerName: string;

  @property({
    type: 'string',
    required: true,
  })
  comments: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;


  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
