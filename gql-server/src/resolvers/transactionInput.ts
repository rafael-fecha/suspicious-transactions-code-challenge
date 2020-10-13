import { Field, InputType } from "type-graphql";

import { TransactionStatus } from "../interfaces/transaction.interface";

@InputType()
export class TransactionInput {
  @Field()
  id: number;

  @Field()
  status: TransactionStatus;
}
