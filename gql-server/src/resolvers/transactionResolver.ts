import { Arg, Query, Mutation, Resolver } from "type-graphql";
import { TransactionData, transactions } from "../data";
import Transaction from "../schemas/Transaction";
import { TransactionInput } from "./transactionInput";

@Resolver(of => Transaction)
export class TransactionResolver {
  @Query(returns => [Transaction], { nullable: true })
  transactionSuspicious(): TransactionData[] | undefined {
    return transactions.filter(
      transaction => transaction.status === "Suspicious"
    );
  }

  @Mutation(returns => Transaction)
  markTransactionSuspicious(@Arg("transactionData")
  {
    id,
    status
  }: TransactionInput): TransactionData {
    const foundTransaction = transactions.find(t => t.id === id);
    if (!foundTransaction) {
      throw new Error(`Couldn't find transaction with id ${id}`);
    }

    foundTransaction.status = status;
    return foundTransaction;
  }
}
