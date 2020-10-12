import { Field, InputType } from 'type-graphql';

@InputType()
export class TransactionInput {
  @Field()
  id: number;

  @Field()
  status: 'Suspicious' | 'Allowed' | 'Blocked';
}