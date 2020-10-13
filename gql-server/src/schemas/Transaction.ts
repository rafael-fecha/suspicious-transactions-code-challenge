import { Field, Int, ObjectType } from "type-graphql";
import { TransactionStatus } from "../interfaces/transaction.interface";
@ObjectType()
export default class Transaction {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  recipient?: string;

  @Field(type => String)
  sender?: string;

  @Field(type => Int)
  amount?: number;

  @Field(type => String)
  currency: string;

  @Field(type => String)
  locale: string;

  @Field(type => Number)
  createdDateTimestamp?: number;

  @Field(type => String)
  status: TransactionStatus;
}
